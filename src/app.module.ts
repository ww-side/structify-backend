import { Module } from '@nestjs/common';

import { AppConfigModule } from '~/config/config.module';

import { DatabaseModule } from '~/database/database.module';

@Module({
  imports: [AppConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
