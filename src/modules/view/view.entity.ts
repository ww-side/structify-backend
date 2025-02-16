import {
  Column as Col,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { Column } from '~/modules/column/column.entity';
import { User } from '~/modules/user/user.entity';
import { ViewFormat } from '~/modules/view/types/view-format';

@Entity('views')
@ObjectType()
export class View {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Col()
  @Field()
  name: string;

  @Col('simple-array')
  @Field(() => [String])
  formats: ViewFormat[];

  @Col({ nullable: true })
  @Field({ nullable: true })
  icon: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => User, user => user.views, { onDelete: 'CASCADE' })
  user: User;

  @RelationId((view: View) => view.user)
  @Col()
  @Field()
  userId: string;

  @OneToMany(() => Column, column => column.view)
  columns: Column[];
}
