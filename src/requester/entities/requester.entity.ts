import { Contract } from './../../contract/entities/contract.entity';
import { Person } from './../../person/entities/person.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('requesters')
export class Requester {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Person, (person) => person.requester)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ length: 50, nullable: true })
  code: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 20, nullable: true })
  cell_phone: string;

  @OneToMany(() => Contract, (contract) => contract.requester)
  contracts: Contract[];
}
