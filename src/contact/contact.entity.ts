//Create entity persona like user.entity.ts, begin with import
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contact' })
export class Contact {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 100, nullable: true })
  issue: string;

  @Column({ length: 250, nullable: true })
  message: string;

  @Column({ length: 50, nullable: true })
  frontend: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  //Create column update_at
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
