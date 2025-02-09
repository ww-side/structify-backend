import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from './orm';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
