import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { RowValue } from '~/modules/row-value/row-value.entity';
import { View } from '~/modules/view/view.entity';

@Entity('rows')
export class Row {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => View, view => view.rows, { onDelete: 'CASCADE' })
  view: View;

  @RelationId((row: Row) => row.view)
  @Column()
  viewId: string;

  @OneToMany(() => RowValue, rowValue => rowValue.row)
  values: RowValue[];
}
