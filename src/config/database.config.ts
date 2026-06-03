import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Contract } from '../contract/entities/contract.entity';
import { ContractCoverage } from '../contract-coverage/entities/contract-coverage.entity';
import { Coverage } from '../coverage/entities/coverage.entity';
import { Delivery } from '../delivery/entities/delivery.entity';
import { FuelType } from '../fuel-type/entities/fuel-type.entity';
import { Guarantee } from '../guarantee/entities/guarantee.entity';
import { Person } from '../person/entities/person.entity';
import { Rate } from '../rate/entities/rate.entity';
import { Requester } from '../requester/entities/requester.entity';
import { Settlement } from '../settlement/entities/settlement.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { VehicleType } from '../vehicle-type/entities/vehicle-type.entity';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5435', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'OrderDB',
  entities: [
    Contract,
    ContractCoverage,
    Coverage,
    Delivery,
    FuelType,
    Guarantee,
    Person,
    Rate,
    Requester,
    Settlement,
    Vehicle,
    VehicleType,
  ],
  synchronize: true, // TEMPORAL: crear tablas en producción
  logging: process.env.NODE_ENV === 'development',
  dropSchema: false,
  migrationsRun: false, // Deshabilitado temporalmente
});
