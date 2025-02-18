import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ViewModule } from '~/modules/view/view.module';
import { ViewService } from '~/modules/view/view.service';

import { RowValueController } from './row-value.controller';
import { RowValue } from './row-value.entity';
import { RowValueService } from './row-value.service';

@Module({
  imports: [TypeOrmModule.forFeature([RowValue]), ViewModule],
  exports: [TypeOrmModule],
  controllers: [RowValueController],
  providers: [RowValueService, JwtService, ViewService],
})
export class RowValueModule {}
