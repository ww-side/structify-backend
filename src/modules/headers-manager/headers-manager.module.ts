import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HeaderManagerService } from './header-manager.service';

@Module({
  providers: [HeaderManagerService, JwtService],
})
export class HeadersManagerModule {}
