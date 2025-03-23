import { PLATFORM_ROUTES } from '../routes/routes';

// NAV_ITEMS with translations
export const GET_NAV_ITEMS = (t: any) => {
  return [
    {
      text: t('nav-bar.home'),
      link: PLATFORM_ROUTES.Home,
    },
    {
      text: t('nav-bar.about-us'),
      link: PLATFORM_ROUTES.ABOUT_US,
    },
    {
      text: t('nav-bar.contact-us'),
      link: PLATFORM_ROUTES.CONTACT_US,
    },
    {
      text: t('nav-bar.my-tickets'),
      link: PLATFORM_ROUTES.my_tickets,
    },
  ] as const;
};

// MY_TICKETS with translations
export const GET_MY_TICKETS = (t: any) => {
  return [
    {
      text: t('nav-bar.ticket-conditions'),
      link: PLATFORM_ROUTES.TICKET_CONDITIONS,
    },
    {
      text: t('nav-bar.cancellation'),
      link: PLATFORM_ROUTES.CANCELLATION,
    },
    {
      text: t('nav-bar.book-tickets'),
      link: PLATFORM_ROUTES.BOOK_TICKETS,
    },
    {
      text: t('nav-bar.booking-enquirer'),
      link: PLATFORM_ROUTES.BOOKING_ENQUIRER,
    },
    {
      text: t('nav-bar.trips-schedule'),
      link: PLATFORM_ROUTES.TRIPS_SCHEDULE,
    },
  ] as const;
};
