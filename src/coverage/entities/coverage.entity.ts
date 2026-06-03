import { ContractCoverage } from './../../contract-coverage/entities/contract-coverage.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('coverages')
export class Coverage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'boolean', default: false })
  is_mandatory: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_day: number;

  @OneToMany(() => ContractCoverage, (cc) => cc.coverage)
  contractCoverages: ContractCoverage[];
}
