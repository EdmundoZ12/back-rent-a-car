export interface SeedVehicleType {
  name: string;
  price: number;
  children?: SeedVehicleType[];
}

export const initialVehicleTypes: SeedVehicleType[] = [
  {
    name: 'Small',
    price: 50,
    children: [
      {
        name: 'Sedan',
        price: 20,
        children: [
          { name: 'Suzuki Swift', price: 10 },
          { name: 'Toyota Yaris', price: 15 },
          { name: 'Hyundai i10', price: 12 },
        ],
      },
      {
        name: 'Hatchback',
        price: 18,
        children: [
          { name: 'Volkswagen Gol', price: 10 },
          { name: 'Chevrolet Spark', price: 8 },
        ],
      },
    ],
  },
  {
    name: 'Medium',
    price: 80,
    children: [
      {
        name: 'Sedan',
        price: 30,
        children: [
          { name: 'Toyota Corolla', price: 20 },
          { name: 'Hyundai Elantra', price: 22 },
          { name: 'Nissan Sentra', price: 18 },
        ],
      },
      {
        name: 'SUV',
        price: 40,
        children: [
          { name: 'Toyota RAV4', price: 30 },
          { name: 'Hyundai Tucson', price: 28 },
          { name: 'Nissan Kicks', price: 25 },
        ],
      },
    ],
  },
  {
    name: 'Large',
    price: 120,
    children: [
      {
        name: 'SUV',
        price: 50,
        children: [
          { name: 'Toyota Land Cruiser', price: 40 },
          { name: 'Ford Explorer', price: 38 },
          { name: 'Chevrolet Tahoe', price: 42 },
        ],
      },
      {
        name: 'Van',
        price: 45,
        children: [
          { name: 'Toyota Hiace', price: 35 },
          { name: 'Hyundai H1', price: 32 },
        ],
      },
    ],
  },
  {
    name: 'Luxury',
    price: 200,
    children: [
      {
        name: 'Sedan',
        price: 80,
        children: [
          { name: 'BMW Serie 5', price: 60 },
          { name: 'Mercedes Benz E Class', price: 70 },
          { name: 'Audi A6', price: 65 },
        ],
      },
      {
        name: 'SUV',
        price: 100,
        children: [
          { name: 'BMW X5', price: 80 },
          { name: 'Mercedes Benz GLE', price: 90 },
          { name: 'Porsche Cayenne', price: 110 },
        ],
      },
    ],
  },
];
