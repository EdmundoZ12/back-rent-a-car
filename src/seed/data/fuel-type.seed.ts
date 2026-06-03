export interface SeedFuelType {
  name: string;
  price_per_liter: number;
}

export const initialFuelTypes: SeedFuelType[] = [
  {
    name: 'Regular',
    price_per_liter: 3.74,
  },
  {
    name: 'Premium',
    price_per_liter: 5.74,
  },
  {
    name: 'Diesel',
    price_per_liter: 3.72,
  },
];
