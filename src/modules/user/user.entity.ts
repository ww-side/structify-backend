import {
  Column as TColumn,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Column } from '~/modules/column/column.entity';
import { View } from '~/modules/view/view.entity';

@Entity('users')
@Index('IDX_USERNAME', ['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn({ unique: true })
  username: string;

  @TColumn({ nullable: true })
  firstName: string;

  @TColumn({ nullable: true })
  lastName: string;

  @TColumn()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => View, view => view.user)
  views: View[];

  @OneToMany(() => Column, column => column.user)
  columns: Column[];
}
