import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeaderManagerService } from '~/modules/headers-manager/header-manager.service';

import { CalendarController } from './calendar.controller';
import { Calendar } from './calendar.entity';
import { CalendarService } from './calendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Calendar])],
  exports: [TypeOrmModule],
  controllers: [CalendarController],
  providers: [CalendarService, JwtService, HeaderManagerService],
})
export class CalendarModule {}
