export interface SeedCoverage {
  name: string;
  is_mandatory: boolean;
  price_per_day: number;
}

export const initialCoverages: SeedCoverage[] = [
  {
    name: 'Basic Coverage',
    is_mandatory: true,
    price_per_day: 25,
  },
  {
    name: 'Full Coverage',
    is_mandatory: false,
    price_per_day: 50,
  },
  {
    name: 'Theft Protection',
    is_mandatory: false,
    price_per_day: 30,
  },
  {
    name: 'Personal Accident Insurance',
    is_mandatory: false,
    price_per_day: 20,
  },
  {
    name: 'Roadside Assistance',
    is_mandatory: false,
    price_per_day: 15,
  },
];
