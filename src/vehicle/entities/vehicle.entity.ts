import { Contract } from './../../contract/entities/contract.entity';
import { FuelType } from './../../fuel-type/entities/fuel-type.entity';
import { VehicleType } from './../../vehicle-type/entities/vehicle-type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VehicleType, (type) => type.children, { eager: true })
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicleType: VehicleType;

  @ManyToOne(() => FuelType, (fuel) => fuel.vehicles, { eager: true })
  @JoinColumn({ name: 'fuel_type_id' })
  fuelType: FuelType;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 50 })
  color: string;

  @Column({ length: 20, unique: true })
  plate: string;

  @Column({ length: 50 })
  code: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  tank_capacity: number;

  @OneToMany(() => Contract, (contract) => contract.vehicle)
  contracts: Contract[];
}
