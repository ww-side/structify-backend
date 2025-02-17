import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { View } from '~/modules/view/view.entity';

@Entity('rows')
export class Row {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => View, view => view.rows, { onDelete: 'CASCADE' })
  view: View;

  @Column()
  viewId: string;
}
