import {
  Column as Col,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '~/modules/user/user.entity';
import { View } from '~/modules/view/view.entity';

import { DataType } from './types/data-type';

@Entity('columns')
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Col()
  name: string;

  @Col()
  dataType: DataType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => View, view => view.columns, { onDelete: 'CASCADE' })
  view: View;

  @RelationId((column: Column) => column.view)
  @Col()
  viewId: string;

  @ManyToOne(() => User, user => user.columns, { onDelete: 'CASCADE' })
  user: User;

  @RelationId((column: Column) => column.user)
  @Col()
  userId: string;
}
