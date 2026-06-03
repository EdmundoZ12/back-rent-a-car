import { Coverage } from './../../coverage/entities/coverage.entity';
import { Contract } from './../../contract/entities/contract.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('contract_coverages')
export class ContractCoverage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, (contract) => contract.contractCoverages)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @ManyToOne(() => Coverage, (coverage) => coverage.contractCoverages)
  @JoinColumn({ name: 'coverage_id' })
  coverage: Coverage;
}
