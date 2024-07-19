import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userFound = await this.userRepository.findOne({
        where: {
          name: user.name,
          // username: user.username,
        },
      });

      if (userFound) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const newUser = this.userRepository.create(user);
      await queryRunner.manager.save(newUser);

      await queryRunner.commitTransaction();
      return newUser;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  getUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findOne(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { name } });
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  //Update user
  updateUser(id: number, user: UpdateUserDto) {
    return this.userRepository.update({ id }, user);
  }
}
