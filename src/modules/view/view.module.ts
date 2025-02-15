import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeaderManagerService } from '~/modules/headers-manager/header-manager.service';

import { View } from './view.entity';
import { ViewResolver } from './view.resolver';
import { ViewService } from './view.service';

@Module({
  imports: [TypeOrmModule.forFeature([View])],
  exports: [TypeOrmModule],
  providers: [ViewResolver, ViewService, HeaderManagerService, JwtService],
})
export class ViewModule {}
