import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('approved_content')
export class ApprovedContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  keyword: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'text' })
  response_template: string;

  @Column({ type: 'bigint' })
  approved_by: number;

  @Column({ type: 'datetime' })
  approved_at: Date;
}
