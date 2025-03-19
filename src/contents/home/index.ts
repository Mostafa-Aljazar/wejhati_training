import { Amman, Damascus, Riyadh, Sanaa } from '@/assets/home/Popular_Cities';

export const popular_cities = [
  {
    id: 1,
    city: 'Riyadh',
    country: 'Saudi_Arabia',
    image: Riyadh,
  },
  {
    id: 2,
    city: 'Amman',
    country: 'Jordan',
    image: Amman,
  },
  {
    id: 3,
    city: 'Sanaa',
    country: 'Yemen',
    image: Sanaa,
  },
  {
    id: 4,
    city: 'Damascus',
    country: 'Syria',
    image: Damascus,
  },
] as const;
