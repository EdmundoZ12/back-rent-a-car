import { Contract } from '../../contract/entities/contract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('settlements')
export class Settlement {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Contract, (contract) => contract.settlement)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal_rates: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal_fuel: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  advance_payment1: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  advance_payment2: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  voucher: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  expense_refund: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  vat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  stamp_tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_deductions: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grand_total: number;

  @Column({ type: 'timestamp', nullable: true })
  closed_at: Date;
}
