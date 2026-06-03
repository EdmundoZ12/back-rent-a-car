import { Contract } from './../../contract/entities/contract.entity';
import { Requester } from './../../requester/entities/requester.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  full_name: string;

  @Column({ length: 20, nullable: true })
  id_card: string;

  @Column({ length: 100, nullable: true })
  id_card_city: string;

  @Column({ type: 'date', nullable: true })
  id_card_expiry: Date;

  @Column({ length: 30, nullable: true })
  license_number: string;

  @Column({ length: 100, nullable: true })
  license_city: string;

  @Column({ type: 'date', nullable: true })
  license_expiry: Date;

  @Column({ length: 30, nullable: true })
  passport_number: string;

  @Column({ length: 100, nullable: true })
  passport_country: string;

  @Column({ type: 'date', nullable: true })
  passport_expiry: Date;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ length: 200, nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 20, nullable: true })
  cell_phone: string;

  @Column({ length: 200, nullable: true })
  work_address: string;

  @Column({ length: 20, nullable: true })
  work_phone: string;

  @Column({ type: 'boolean', default: false })
  is_foreign: boolean;

  @OneToOne(() => Requester, (requester) => requester.person)
  requester: Requester;

  @OneToMany(() => Contract, (contract) => contract.client1)
  contractsAsClient1: Contract[];

  @OneToMany(() => Contract, (contract) => contract.client2)
  contractsAsClient2: Contract[];
}
