import {
  Booking_Enquiry,
  Cancellation,
  Ticket_Conditions,
  Trips_Schedule,
} from '@/assets/home/Before_Traveling';
import { Amman, Damascus, Riyadh, Sanaa } from '@/assets/home/Popular_Cities';
import { PLATFORM_ROUTES } from '../routes/routes';

export const User_Type = {
  User: 'user',
  Provider: 'provider',
};

export const TabTypes = {
  One_Way: 'One way',
  Round_Trip: 'Round trip',
} as const;

// Factory function for popular_cities
export const getPopularCities = (t: any) =>
  [
    {
      id: 1,
      city: t('platform.home.Popular_Cities.cities.Saudi_Arabia.city'),
      country: t('platform.home.Popular_Cities.cities.Saudi_Arabia.country'),
      image: Riyadh,
    },
    {
      id: 2,
      city: t('platform.home.Popular_Cities.cities.Jordan.city'),
      country: t('platform.home.Popular_Cities.cities.Jordan.country'),
      image: Amman,
    },
    {
      id: 3,
      city: t('platform.home.Popular_Cities.cities.Yemen.city'),
      country: t('platform.home.Popular_Cities.cities.Yemen.country'),
      image: Sanaa,
    },
    {
      id: 4,
      city: t('platform.home.Popular_Cities.cities.Syria.city'),
      country: t('platform.home.Popular_Cities.cities.Syria.country'),
      image: Damascus,
    },
  ] as const;

// Factory function for before_traveling_info
export const getBeforeTravelingInfo = (t: any) =>
  [
    {
      id: 1,
      text: t('platform.home.Before_Traveling.Ticket_Conditions'),
      image: Ticket_Conditions,
      link: PLATFORM_ROUTES.TICKET_CONDITIONS,
    },
    {
      id: 2,
      text: t('platform.home.Before_Traveling.Booking_Enquiry'),
      image: Booking_Enquiry,
      link: PLATFORM_ROUTES.BOOKING_ENQUIRER,
    },
    {
      id: 3,
      text: t('platform.home.Before_Traveling.Cancellation'),
      image: Cancellation,
      link: PLATFORM_ROUTES.CANCELLATION,
    },
    {
      id: 4,
      text: t('platform.home.Before_Traveling.Trips_Schedule'),
      image: Trips_Schedule,
      link: PLATFORM_ROUTES.TRIPS_SCHEDULE,
    },
  ] as const;
