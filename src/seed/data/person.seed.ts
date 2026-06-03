export interface SeedPerson {
  full_name: string;
  id_card?: string;
  id_card_city?: string;
  id_card_expiry?: string;
  license_number: string;
  license_city: string;
  license_expiry: string;
  passport_number?: string;
  passport_country?: string;
  passport_expiry?: string;
  birth_date: string;
  address: string;
  phone: string;
  cell_phone: string;
  work_address?: string;
  work_phone?: string;
  is_foreign: boolean;
}

export const initialPersons: SeedPerson[] = [
  // ─── Bolivians ───────────────────────────────────────────
  {
    full_name: 'Juan Carlos Perez Lopez',
    id_card: '1234567',
    id_card_city: 'Santa Cruz',
    id_card_expiry: '2028-05-15',
    license_number: 'LC-001234',
    license_city: 'Santa Cruz',
    license_expiry: '2026-08-20',
    birth_date: '1990-03-12',
    address: 'Av. Cañoto 123, Santa Cruz',
    phone: '3-3334444',
    cell_phone: '70012345',
    work_address: 'Av. San Martin 456, Santa Cruz',
    work_phone: '3-4445555',
    is_foreign: false,
  },
  {
    full_name: 'Maria Elena Rodriguez Vaca',
    id_card: '2345678',
    id_card_city: 'Santa Cruz',
    id_card_expiry: '2027-11-10',
    license_number: 'LC-002345',
    license_city: 'Santa Cruz',
    license_expiry: '2025-12-31',
    birth_date: '1985-07-22',
    address: 'Calle Murillo 789, Santa Cruz',
    phone: '3-5556666',
    cell_phone: '71023456',
    work_address: 'Av. Busch 321, Santa Cruz',
    work_phone: '3-6667777',
    is_foreign: false,
  },
  {
    full_name: 'Carlos Alberto Suarez Mendez',
    id_card: '3456789',
    id_card_city: 'Cochabamba',
    id_card_expiry: '2029-03-20',
    license_number: 'LC-003456',
    license_city: 'Cochabamba',
    license_expiry: '2027-06-15',
    birth_date: '1978-11-05',
    address: 'Av. Blanco Galindo 567, Cochabamba',
    phone: '4-4445555',
    cell_phone: '72034567',
    work_address: 'Av. Heroinas 890, Cochabamba',
    work_phone: '4-5556666',
    is_foreign: false,
  },
  {
    full_name: 'Ana Lucia Flores Gutierrez',
    id_card: '4567890',
    id_card_city: 'La Paz',
    id_card_expiry: '2026-09-30',
    license_number: 'LC-004567',
    license_city: 'La Paz',
    license_expiry: '2026-03-10',
    birth_date: '1995-01-18',
    address: 'Calle Sagarnaga 234, La Paz',
    phone: '2-2223333',
    cell_phone: '73045678',
    work_address: 'Av. Arce 678, La Paz',
    work_phone: '2-3334444',
    is_foreign: false,
  },

  // ─── Foreigners ──────────────────────────────────────────
  {
    full_name: 'John Michael Smith',
    id_card: undefined,
    id_card_city: undefined,
    id_card_expiry: undefined,
    license_number: 'US-789012',
    license_city: 'New York',
    license_expiry: '2027-04-25',
    passport_number: 'US123456789',
    passport_country: 'United States',
    passport_expiry: '2030-06-15',
    birth_date: '1982-09-14',
    address: '123 Main St, New York, USA',
    phone: '+1-2125551234',
    cell_phone: '+1-9175556789',
    work_address: '456 Business Ave, New York, USA',
    work_phone: '+1-2125559876',
    is_foreign: true,
  },
  {
    full_name: 'Sofia Garcia Martinez',
    id_card: undefined,
    id_card_city: undefined,
    id_card_expiry: undefined,
    license_number: 'AR-456789',
    license_city: 'Buenos Aires',
    license_expiry: '2026-11-20',
    passport_number: 'AR987654321',
    passport_country: 'Argentina',
    passport_expiry: '2028-09-10',
    birth_date: '1991-04-30',
    address: 'Av. Corrientes 789, Buenos Aires, Argentina',
    phone: '+54-1155551234',
    cell_phone: '+54-9115556789',
    work_address: 'Av. Santa Fe 456, Buenos Aires, Argentina',
    work_phone: '+54-1155559876',
    is_foreign: true,
  },
];
