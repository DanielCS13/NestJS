import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async register(userDto: RegisterDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = {
      ...userDto,
      password: hashedPassword,
    };
    // Guardar el usuario en la base de datos
    return this.userService.createUser(newUser);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { name, password } = loginDto;
    console.log(name, password);
    const user = await this.validateUser(name, password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = { name: user.name, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(name: string, password: string): Promise<any> {
    // Aquí buscarías el usuario en la base de datos
    const user = await this.userService.findOne(name);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
