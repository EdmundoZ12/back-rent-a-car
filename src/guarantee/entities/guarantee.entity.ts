import { Contract } from './../../contract/entities/contract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('guarantees')
export class Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Contract, (contract) => contract.guarantee)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @Column({ length: 20 })
  card_number: string;

  @Column({ length: 100 })
  bank_name: string;

  @Column({ length: 100, nullable: true })
  location: string;

  @Column({ type: 'date' })
  valid_until: Date;

  @Column({ length: 20, nullable: true })
  pa_code: string;

  @Column({ length: 10, nullable: true })
  security_code: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value_bs: number;

  @Column({ length: 50 })
  card_type: string;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
