import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rejected_content')
export class RejectedContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  keyword: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'bigint' })
  rejected_by: number;

  @Column({ type: 'datetime' })
  rejected_at: Date;
}
