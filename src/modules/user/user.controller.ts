import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UpdateUserDTO } from '~/modules/user/dto/update-user.dto';

import { AuthGuard } from '~/shared/guards/auth-guard';
import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';
import { getTokenFromAuthHeader, type TokenMeta } from '~/shared/lib/token';

import { UserService } from './user.service';

@UseInterceptors(ResponseFormatInterceptor)
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return { message: 'User deleted successfully' };
  }

  @Get()
  async me(@Headers('Authorization') authHeader: string) {
    const token = getTokenFromAuthHeader(authHeader);
    return this.userService.me(token);
  }

  @Patch()
  async update(
    @Body() updateData: UpdateUserDTO,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = getTokenFromAuthHeader(authHeader);
    const id = this.jwtService.decode<TokenMeta>(token).id;

    return this.userService.update({ id, updateData });
  }
}
