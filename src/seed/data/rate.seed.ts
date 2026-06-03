import { RateType } from './../../rate/entities/rate.entity';

export interface SeedRate {
  type: RateType;
  price: number;
  tolerance_minutes: number;
}

export const initialRates: SeedRate[] = [
  {
    type: RateType.HOUR,
    price: 25,
    tolerance_minutes: 15,
  },
  {
    type: RateType.DAY,
    price: 150,
    tolerance_minutes: 60,
  },
  {
    type: RateType.WEEK,
    price: 800,
    tolerance_minutes: 180,
  },
  {
    type: RateType.MONTH,
    price: 2500,
    tolerance_minutes: 1440,
  },
];
