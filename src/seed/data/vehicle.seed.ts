export interface SeedVehicle {
  vehicleTypeName: string; // nombre del nodo hoja (modelo)
  fuelTypeName: string;
  brand: string;
  color: string;
  plate: string;
  code: string;
  tank_capacity: number;
}

export const initialVehicles: SeedVehicle[] = [
  // ─── Small ───────────────────────────────────────────────
  {
    vehicleTypeName: 'Suzuki Swift',
    fuelTypeName: 'Regular',
    brand: 'Suzuki',
    color: 'White',
    plate: 'SCZ-1234',
    code: 'VH-001',
    tank_capacity: 37,
  },
  {
    vehicleTypeName: 'Toyota Yaris',
    fuelTypeName: 'Regular',
    brand: 'Toyota',
    color: 'Silver',
    plate: 'SCZ-2345',
    code: 'VH-002',
    tank_capacity: 42,
  },
  {
    vehicleTypeName: 'Chevrolet Spark',
    fuelTypeName: 'Regular',
    brand: 'Chevrolet',
    color: 'Red',
    plate: 'SCZ-3456',
    code: 'VH-003',
    tank_capacity: 35,
  },

  // ─── Medium ──────────────────────────────────────────────
  {
    vehicleTypeName: 'Toyota Corolla',
    fuelTypeName: 'Regular',
    brand: 'Toyota',
    color: 'Black',
    plate: 'SCZ-4567',
    code: 'VH-004',
    tank_capacity: 50,
  },
  {
    vehicleTypeName: 'Hyundai Tucson',
    fuelTypeName: 'Premium',
    brand: 'Hyundai',
    color: 'Blue',
    plate: 'SCZ-5678',
    code: 'VH-005',
    tank_capacity: 62,
  },
  {
    vehicleTypeName: 'Nissan Kicks',
    fuelTypeName: 'Regular',
    brand: 'Nissan',
    color: 'Gray',
    plate: 'SCZ-6789',
    code: 'VH-006',
    tank_capacity: 41,
  },

  // ─── Large ───────────────────────────────────────────────
  {
    vehicleTypeName: 'Toyota Land Cruiser',
    fuelTypeName: 'Diesel',
    brand: 'Toyota',
    color: 'White',
    plate: 'SCZ-7890',
    code: 'VH-007',
    tank_capacity: 87,
  },
  {
    vehicleTypeName: 'Toyota Hiace',
    fuelTypeName: 'Diesel',
    brand: 'Toyota',
    color: 'White',
    plate: 'SCZ-8901',
    code: 'VH-008',
    tank_capacity: 70,
  },

  // ─── Luxury ──────────────────────────────────────────────
  {
    vehicleTypeName: 'BMW Serie 5',
    fuelTypeName: 'Premium',
    brand: 'BMW',
    color: 'Black',
    plate: 'SCZ-9012',
    code: 'VH-009',
    tank_capacity: 68,
  },
  {
    vehicleTypeName: 'Mercedes Benz GLE',
    fuelTypeName: 'Premium',
    brand: 'Mercedes Benz',
    color: 'Silver',
    plate: 'SCZ-0123',
    code: 'VH-010',
    tank_capacity: 80,
  },
];
