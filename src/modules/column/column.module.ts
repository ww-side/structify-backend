import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeaderManagerService } from '~/modules/headers-manager/header-manager.service';

import { ColumnController } from './column.controller';
import { Column } from './column.entity';
import { ColumnService } from './column.service';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  exports: [TypeOrmModule],
  controllers: [ColumnController],
  providers: [ColumnService, JwtService, HeaderManagerService],
})
export class ColumnModule {}
