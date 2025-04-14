import {
  Column as TColumn,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Calendar } from '~/modules/calendar/calendar.entity';
import { Column } from '~/modules/column/column.entity';
import { View } from '~/modules/view/view.entity';

@Entity('users')
@Index('IDX_USERNAME', ['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn({ unique: true })
  username: string;

  @TColumn({ unique: true })
  email: string;

  @TColumn({ nullable: true })
  firstName: string;

  @TColumn({ nullable: true })
  lastName: string;

  @TColumn()
  password: string;

  @TColumn({ nullable: true })
  refreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => View, view => view.user)
  views: View[];

  @OneToMany(() => Column, column => column.user)
  columns: Column[];

  @OneToMany(() => Calendar, calendar => calendar.user)
  calendarEvents: Calendar[];
}
