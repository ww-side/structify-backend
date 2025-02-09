import { Repository } from 'typeorm';

import {
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '~/modules/user/user.entity';

import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';
import { bcrypt } from '~/shared/lib/bcrypt';

import { LoginDTO, RegisterDTO } from './dto';

@Injectable()
@UseInterceptors(ResponseFormatInterceptor)
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDTO): Promise<User> {
    const { username, firstName, lastName, password } = registerDto;

    if (!username || !password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;

    if (!username || !password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
