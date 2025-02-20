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

import { RefreshTokenDTO, SignInDTO, SignUpDTO } from './dto';

@Injectable()
@UseInterceptors(ResponseFormatInterceptor)
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: SignUpDTO) {
    const { username, firstName, lastName, password } = signUpDTO;

    if (!username || !password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.userRepo.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async signIn(signInDTO: SignInDTO) {
    const { username, password } = signInDTO;
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.generateTokens({
      userId: user.id,
      username: user.username,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userRepo.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshTokenDTO: RefreshTokenDTO) {
    const { refreshToken } = refreshTokenDTO;
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const user = await this.userRepo.findOne({
      where: { id: payload.id },
    });

    if (!user || !user.refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isTokenValid) {
      throw new Error('Invalid refresh token');
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      this.generateTokens({ userId: user.id, username: user.username });

    const newHashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    await this.userRepo.update(user.id, {
      refreshToken: newHashedRefreshToken,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  private generateTokens({
    userId,
    username,
  }: {
    userId: string;
    username: string;
  }) {
    const payload = { username, id: userId };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }
}
