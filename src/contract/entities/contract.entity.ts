import { Settlement } from '../../settlement/entities/settlement.entity';
import { Guarantee } from './../../guarantee/entities/guarantee.entity';
import { Delivery } from './../../delivery/entities/delivery.entity';
import { ContractCoverage } from './../../contract-coverage/entities/contract-coverage.entity';
import { Rate } from './../../rate/entities/rate.entity';
import { Vehicle } from './../../vehicle/entities/vehicle.entity';
import { Requester } from './../../requester/entities/requester.entity';
import { Person } from './../../person/entities/person.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

export enum ContractStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum CirculationArea {
  LOCAL = 'local',
  INTERPROVINCIAL = 'interprovincial',
  EXTRAREGIONAL = 'extraregional',
}

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.contractsAsClient1)
  @JoinColumn({ name: 'client1_id' })
  client1: Person;

  @ManyToOne(() => Person, (person) => person.contractsAsClient2, {
    nullable: true,
  })
  @JoinColumn({ name: 'client2_id' })
  client2: Person;

  @ManyToOne(() => Requester, (requester) => requester.contracts, {
    nullable: true,
  })
  @JoinColumn({ name: 'requester_id' })
  requester: Requester;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.contracts)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Rate, (rate) => rate.contracts)
  @JoinColumn({ name: 'rate_id' })
  rate: Rate;

  @Column({ type: 'enum', enum: ContractStatus, default: ContractStatus.OPEN })
  status: ContractStatus;

  @Column({ length: 200, nullable: true })
  pickup_location: string;

  @Column({ length: 200, nullable: true })
  return_location: string;

  @Column({ type: 'enum', enum: CirculationArea, nullable: true })
  circulation_area: CirculationArea;

  @CreateDateColumn()
  opened_at: Date;

  @Column({ type: 'timestamp' })
  expected_return: Date;

  @Column({ type: 'timestamp', nullable: true })
  extension_date: Date;

  @Column({ length: 150, nullable: true })
  extension_authorized_by: string;

  @OneToMany(() => ContractCoverage, (cc) => cc.contract)
  contractCoverages: ContractCoverage[];

  @OneToOne(() => Delivery, (delivery) => delivery.contract)
  delivery: Delivery;

  @OneToOne(() => Guarantee, (guarantee) => guarantee.contract)
  guarantee: Guarantee;

  @OneToOne(() => Settlement, (settlement) => settlement.contract, {
    eager: true,
  })
  settlement: Settlement;
}
