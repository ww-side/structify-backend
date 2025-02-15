import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '~/modules/user/user.entity';
import { ViewFormat } from '~/modules/view/types/view-format';

@Entity('views')
@ObjectType()
export class View {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column('simple-array')
  @Field(() => [String])
  formats: ViewFormat[];

  @Column({ nullable: true })
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
  @Column()
  @Field()
  userId: string;
}
