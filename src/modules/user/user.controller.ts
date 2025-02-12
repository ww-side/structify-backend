import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthGuard } from '~/shared/guards/auth-guard';
import { getTokenFromAuthHeader } from '~/shared/lib/token';

import { User } from './user.entity';
import { UserService } from './user.service';

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
    @Body() updateData: Partial<User>,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = getTokenFromAuthHeader(authHeader);
    const id = this.jwtService.decode(token).id;

    return this.userService.update({ id, updateData });
  }
}
