//Create entity persona like user.entity.ts, begin with import
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'persona' })
export class Persona {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  nPerCodigo: number;

  @Column({ length: 50, nullable:true })
  cPerApellido: string;

  @Column({ length: 50, nullable:true })
  cPerNombre: string;

  @Column({ length: 100, nullable:true })
  cPerDireccion: string;

  @Column({ type: 'date', nullable:false })
  cPerFecNac: Date;

  @Column({ type: 'int', nullable:false })
  nPerEdad: number;

  @Column({ length: 15, default: 'Masculino', nullable:true })
  cPerSexo: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable:false })
  nPerSueldo: number;

  @Column({ length: 50, nullable:false })
  cPerRnd: string;

  @Column({ length: 1, nullable:false, default: '1' })
  cPerEstado: string;

  @Column({ length: 100, nullable:true })
  remember_token: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable:true })
  createdAt: Date;

  //Create column update_at
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable:true, onUpdate: 'CURRENT_TIMESTAMP'})
  
  updatedAt: Date;
}
