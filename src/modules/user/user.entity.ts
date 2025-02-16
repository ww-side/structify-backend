import {
  Column as Col,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Column } from '~/modules/column/column.entity';
import { View } from '~/modules/view/view.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Col({ unique: true })
  username: string;

  @Col({ nullable: true })
  firstName: string;

  @Col({ nullable: true })
  lastName: string;

  @Col()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => View, view => view.user)
  views: View[];

  @OneToMany(() => Column, column => column.user)
  columns: Column[];
}
