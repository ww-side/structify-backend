import { Response } from 'express';

import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';

import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';

import { AuthService } from './auth.service';
import { RefreshTokenDTO, SignInDTO, SignUpDTO } from './dto';

@UseInterceptors(ResponseFormatInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDTO: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signIn(signInDTO);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true, // Доступен только на сервере
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDTO: RefreshTokenDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshToken(refreshTokenDTO);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }
}
