import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ColumnModule } from '~/modules/column/column.module';
import { ColumnService } from '~/modules/column/column.service';
import { RowModule } from '~/modules/row/row.module';
import { RowService } from '~/modules/row/row.service';
import { RowValueModule } from '~/modules/row-value/row-value.module';
import { RowValueService } from '~/modules/row-value/row-value.service';
import { ViewModule } from '~/modules/view/view.module';
import { ViewService } from '~/modules/view/view.service';

import { ViewDataController } from './view-data.controller';
import { ViewDataService } from './view-data.service';

@Module({
  imports: [ColumnModule, RowModule, RowValueModule, ViewModule],
  providers: [
    ViewDataService,
    ViewService,
    ColumnService,
    RowService,
    RowValueService,
    JwtService,
  ],
  controllers: [ViewDataController],
})
export class ViewDataModule {}
