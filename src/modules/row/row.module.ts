import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RowController } from './row.controller';
import { Row } from './row.entity';
import { RowService } from './row.service';

@Module({
  imports: [TypeOrmModule.forFeature([Row])],
  exports: [TypeOrmModule],
  controllers: [RowController],
  providers: [RowService, JwtService],
})
export class RowModule {}
