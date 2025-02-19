import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RowValueModule } from '~/modules/row-value/row-value.module';
import { RowValueService } from '~/modules/row-value/row-value.service';
import { ViewModule } from '~/modules/view/view.module';
import { ViewService } from '~/modules/view/view.service';

import { RowController } from './row.controller';
import { Row } from './row.entity';
import { RowService } from './row.service';

@Module({
  imports: [TypeOrmModule.forFeature([Row]), RowValueModule, ViewModule],
  exports: [TypeOrmModule],
  controllers: [RowController],
  providers: [RowService, JwtService, RowValueService, ViewService],
})
export class RowModule {}
