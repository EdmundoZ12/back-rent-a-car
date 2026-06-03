import { initialFuelTypes } from './data/fuel-type.seed';
import { Person } from './../person/entities/person.entity';
import { Coverage } from './../coverage/entities/coverage.entity';
import { Rate } from './../rate/entities/rate.entity';
import { Vehicle } from './../vehicle/entities/vehicle.entity';
import { VehicleType } from './../vehicle-type/entities/vehicle-type.entity';
import { FuelType } from './../fuel-type/entities/fuel-type.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialVehicleTypes, SeedVehicleType } from './data/vehicle-type.seed';
import { initialVehicles } from './data/vehicle.seed';
import { initialRates } from './data/rate.seed';
import { initialCoverages } from './data/coverage.seed';
import { initialPersons } from './data/person.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(FuelType)
    private readonly fuelTypeRepository: Repository<FuelType>,

    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,

    @InjectRepository(Coverage)
    private readonly coverageRepository: Repository<Coverage>,

    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async runSeeds(): Promise<string> {
    await this.seedFuelTypes();
    await this.seedVehicleTypes();
    await this.seedVehicles();
    await this.seedRates();
    await this.seedCoverages();
    await this.seedPersons();
    return 'Seeds executed successfully';
  }

  // ─── Fuel Types ───────────────────────────────────────────────────────────
  private async seedFuelTypes(): Promise<void> {
    for (const ft of initialFuelTypes) {
      const exists = await this.fuelTypeRepository.findOne({
        where: { name: ft.name },
      });
      if (!exists) {
        await this.fuelTypeRepository.save(this.fuelTypeRepository.create(ft));
      }
    }
  }

  // ─── Vehicle Types (recursive) ────────────────────────────────────────────
  private async seedVehicleTypes(): Promise<void> {
    for (const vt of initialVehicleTypes) {
      await this.saveVehicleTypeRecursive(vt, null);
    }
  }

  private async saveVehicleTypeRecursive(
    data: SeedVehicleType,
    parent: VehicleType | null,
  ): Promise<void> {
    const exists = await this.vehicleTypeRepository.findOne({
      where: { name: data.name },
    });

    let vehicleType: VehicleType;

    if (!exists) {
      vehicleType = this.vehicleTypeRepository.create({
        name: data.name,
        price: data.price,
        parent: parent ?? undefined,
      });
      vehicleType = await this.vehicleTypeRepository.save(vehicleType);
    } else {
      vehicleType = exists;
    }

    if (data.children && data.children.length > 0) {
      for (const child of data.children) {
        await this.saveVehicleTypeRecursive(child, vehicleType);
      }
    }
  }

  // ─── Vehicles ─────────────────────────────────────────────────────────────
  private async seedVehicles(): Promise<void> {
    for (const v of initialVehicles) {
      const exists = await this.vehicleRepository.findOne({
        where: { plate: v.plate },
      });
      if (!exists) {
        const vehicleType = await this.vehicleTypeRepository.findOne({
          where: { name: v.vehicleTypeName },
        });
        const fuelType = await this.fuelTypeRepository.findOne({
          where: { name: v.fuelTypeName },
        });

        if (!vehicleType || !fuelType) continue;

        await this.vehicleRepository.save(
          this.vehicleRepository.create({
            brand: v.brand,
            color: v.color,
            plate: v.plate,
            code: v.code,
            tank_capacity: v.tank_capacity,
            vehicleType,
            fuelType,
          }),
        );
      }
    }
  }

  // ─── Rates ────────────────────────────────────────────────────────────────
  private async seedRates(): Promise<void> {
    for (const r of initialRates) {
      const exists = await this.rateRepository.findOne({
        where: { type: r.type },
      });
      if (!exists) {
        await this.rateRepository.save(this.rateRepository.create(r));
      }
    }
  }

  // ─── Coverages ────────────────────────────────────────────────────────────
  private async seedCoverages(): Promise<void> {
    for (const c of initialCoverages) {
      const exists = await this.coverageRepository.findOne({
        where: { name: c.name },
      });
      if (!exists) {
        await this.coverageRepository.save(this.coverageRepository.create(c));
      }
    }
  }

  // ─── Persons ──────────────────────────────────────────────────────────────
  private async seedPersons(): Promise<void> {
    for (const p of initialPersons) {
      const exists = await this.personRepository.findOne({
        where: { full_name: p.full_name },
      });
      if (!exists) {
        await this.personRepository.save(this.personRepository.create(p));
      }
    }
  }
}
