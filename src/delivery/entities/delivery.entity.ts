import { Contract } from './../../contract/entities/contract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum FuelLevel {
  EMPTY = 'V',
  ONE_EIGHTH = '1/8',
  ONE_QUARTER = '1/4',
  THREE_EIGHTHS = '3/8',
  HALF = '1/2',
  FIVE_EIGHTHS = '5/8',
  THREE_QUARTERS = '3/4',
  SEVEN_EIGHTHS = '7/8',
  FULL = 'F',
}

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Contract, (contract) => contract.delivery)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @Column({ type: 'timestamp' })
  departure_datetime: Date;

  @Column({ type: 'int' })
  departure_km: number;

  @Column({ type: 'enum', enum: FuelLevel })
  departure_fuel: FuelLevel;

  @Column({ type: 'timestamp', nullable: true })
  return_datetime: Date;

  @Column({ type: 'int', nullable: true })
  return_km: number;

  @Column({ type: 'enum', enum: FuelLevel, nullable: true })
  return_fuel: FuelLevel;
}
