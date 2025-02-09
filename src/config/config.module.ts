import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configPath } from './path';

@Module({
  imports: [ConfigModule.forRoot(configPath)],
  exports: [ConfigModule],
})
export class AppConfigModule {}
