import { Module } from '@nestjs/common';

import { AuthModule } from '~/modules/auth/auth.module';
import { HeadersManagerModule } from '~/modules/headers-manager/headers-manager.module';
import { UserModule } from '~/modules/user/user.module';

import { CalendarModule } from './modules/calendar/calendar.module';
import { ColumnModule } from './modules/column/column.module';
import { AppConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { GqlModule } from './modules/gql/gql.module';
import { RowModule } from './modules/row/row.module';
import { RowValueModule } from './modules/row-value/row-value.module';
import { ViewModule } from './modules/view/view.module';
import { ViewDataModule } from './modules/view-data/view-data.module';

@Module({
  imports: [
    ViewModule,
    AppConfigModule,
    DatabaseModule,
    GqlModule,
    AuthModule,
    UserModule,
    HeadersManagerModule,
    ColumnModule,
    RowModule,
    RowValueModule,
    ViewDataModule,
    CalendarModule,
  ],
})
export class AppModule {}
