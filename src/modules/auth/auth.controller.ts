import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';

import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto';

@UseInterceptors(ResponseFormatInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @Post('sign-in')
  async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }
}
