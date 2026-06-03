import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('vehicle_type')
export class VehicleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => VehicleType, (type) => type.children, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'parent_id' })
  parent: VehicleType;

  @OneToMany(() => VehicleType, (type) => type.parent)
  children: VehicleType[];
}
