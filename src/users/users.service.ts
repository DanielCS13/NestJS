import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    createUser(user: CreateUserDto) {
        const userFound = this.userRepository.findOne({
            where: {
                username: user.username,
            }
        })
        
        if (userFound) {
            return new HttpException('User already exists', HttpStatus.CONFLICT)
        }
        
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    getUsers() {
        return this.userRepository.find();
    }

    getUser(id: number) {
        return this.userRepository.findOne({
            where: { id }
        });
    }

    deleteUser(id: number) {
        return this.userRepository.delete(id);
    }

    //Update user
    updateUser(id: number, user: UpdateUserDto) {
        return this.userRepository.update({id}, user);
    }
}
