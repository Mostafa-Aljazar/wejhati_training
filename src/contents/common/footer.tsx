import { Instagram, Linkedin, X } from 'lucide-react';
import { PLATFORM_ROUTES } from '../routes/routes';

// Type for the translation function (adjust based on your setup)
// type TFunction = ReturnType<typeof import('next-intl').useTranslations>;

export const GET_RESOURCES = (t: any) => {
  return [
    { id: 1, label: t('footer.home'), link: PLATFORM_ROUTES.Home },
    { id: 2, label: t('footer.about-us'), link: PLATFORM_ROUTES.ABOUT_US },
    { id: 3, label: t('footer.contact-us'), link: PLATFORM_ROUTES.CONTACT_US },
    { id: 4, label: t('footer.transport'), link: '#' },
    { id: 5, label: t('footer.transport-authority'), link: '#' },
  ] as const;
};

export const GET_CONTACT_US = (t: any) => {
  return [
    { id: 1, label: t('footer.email'), link: 'wejhati.co.com' },
    { id: 2, label: t('footer.phone'), tel: '+966 55 140 5555' },
    { id: 3, label: t('footer.social-media') },
  ] as const;
};

export const GET_SOCIALS = (t: any) => {
  return [
    {
      id: 1,
      link: 'linkedin', // Consider providing full URLs
      icon: <Linkedin size={16} className="text-white" />,
      label: t('footer.social-media'), // Optional: for accessibility
    },
    {
      id: 2,
      link: 'instagram', // Consider providing full URLs
      icon: <Instagram size={16} className="text-white" />,
      label: t('footer.social-media'), // Optional: for accessibility
    },
    {
      id: 3,
      link: 'x', // Consider providing full URLs
      icon: <X size={16} className="text-white" />,
      label: t('footer.social-media'), // Optional: for accessibility
    },
  ] as const;
};
