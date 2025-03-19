import {
  Booking_Enquiry,
  Cancellation,
  Ticket_Conditions,
  Trips_Schedule,
} from '@/assets/home/Before_Traveling';
import { Amman, Damascus, Riyadh, Sanaa } from '@/assets/home/Popular_Cities';
import { PLATFORM_ROUTES } from '../routes/routes';

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

export const before_traveling_info = [
  {
    id: 1,
    text: 'Ticket Conditions',
    image: Ticket_Conditions,
    link: PLATFORM_ROUTES.TICKET_CONDITIONS,
  },
  {
    id: 2,
    text: 'Booking Enquiry',
    image: Booking_Enquiry,
    link: PLATFORM_ROUTES.BOOKING_ENQUIRER,
  },
  {
    id: 3,
    text: 'Cancellation',
    image: Cancellation,
    link: PLATFORM_ROUTES.CANCELLATION,
  },
  {
    id: 4,
    text: 'Trips Schedule',
    image: Trips_Schedule,
    link: PLATFORM_ROUTES.TRIPS_SCHEDULE,
  },
] as const;
