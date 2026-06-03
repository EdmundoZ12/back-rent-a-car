import { Contract } from './../../contract/entities/contract.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum RateType {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

@Entity('rates')
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RateType })
  type: RateType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  tolerance_minutes: number;

  @OneToMany(() => Contract, (contract) => contract.rate)
  contracts: Contract[];
}
