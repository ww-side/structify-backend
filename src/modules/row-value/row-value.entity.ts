import {
  Column as TColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Column } from '~/modules/column/column.entity';
import { Row } from '~/modules/row/row.entity';
import { View } from '~/modules/view/view.entity';

@Entity('row_values')
export class RowValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn()
  value: string;

  @ManyToOne(() => Row, row => row.values, { onDelete: 'CASCADE' })
  row: Row;

  @RelationId((rowValue: RowValue) => rowValue.row)
  @TColumn()
  rowId: string;

  @ManyToOne(() => Column, column => column.values, { onDelete: 'CASCADE' })
  column: Column;

  @RelationId((rowValue: RowValue) => rowValue.column)
  @TColumn()
  columnId: string;

  @ManyToOne(() => View, view => view.rows, { onDelete: 'CASCADE' })
  view: View;

  @RelationId((rowValue: RowValue) => rowValue.view)
  @TColumn()
  viewId: string;
}
