import { Vehicle } from './../../vehicle/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('fuel_types')
export class FuelType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_liter: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.fuelType)
  vehicles: Vehicle[];
}
