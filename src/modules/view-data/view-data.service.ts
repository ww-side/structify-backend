import { Injectable } from '@nestjs/common';

import { ColumnService } from '~/modules/column/column.service';
import { RowService } from '~/modules/row/row.service';
import { RowValueService } from '~/modules/row-value/row-value.service';

@Injectable()
export class ViewDataService {
  constructor(
    private readonly columnService: ColumnService,
    private readonly rowService: RowService,
    private readonly rowValueService: RowValueService,
  ) {}

  async getViewData({
    viewId,
    userId,
    page,
    pageSize,
  }: {
    viewId: string;
    userId: string;
    page: number;
    pageSize: number;
  }) {
    const { columns } = await this.columnService.findAll({
      userId,
      viewId,
    });
    const { rows, total } = await this.rowService.findAll({
      viewId,
      page,
      pageSize,
    });

    const rowIds = rows.map(row => row.id);

    const { rowValues } = await this.rowValueService.findViewRowValues({
      viewId,
      rowIds,
    });

    const { prev, next } = this.calcPagination({
      viewId,
      total,
      page,
      pageSize,
    });

    return { columns, rows, rowValues, count: total, next, prev };
  }

  private calcPagination({
    page,
    pageSize,
    total,
    viewId,
  }: {
    page: number;
    pageSize: number;
    total: number;
    viewId: string;
  }) {
    const totalPages = Math.ceil(total / pageSize);
    const baseUrl = 'http://localhost:8000/view-data';

    const next =
      page < totalPages
        ? `${baseUrl}/?viewId=${viewId}&page=${page + 1}&page_size=${pageSize}`
        : null;
    const prev =
      page > 1
        ? `${baseUrl}/?viewId=${viewId}&page=${page - 1}&page_size=${pageSize}`
        : null;

    return { next, prev };
  }
}
