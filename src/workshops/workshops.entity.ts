import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'workshops' })
export class Workshop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
}
