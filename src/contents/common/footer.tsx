import { Instagram, Linkedin, X } from 'lucide-react';
import { PLATFORM_ROUTES } from '../routes/routes';

export const RESOURCES = [
  { id: 1, label: 'home', link: PLATFORM_ROUTES.Home },
  { id: 2, label: 'about-us', link: PLATFORM_ROUTES.ABOUT_US },
  { id: 3, label: 'contact-us', link: PLATFORM_ROUTES.CONTACT_US },
  { id: 4, label: 'transport', link: '#' },
  { id: 5, label: 'transport-authority', link: '#' },
] as const;

export const CONTACT_US = [
  { id: 1, label: 'email', link: 'wejhati.co.com' },
  { id: 2, label: 'number', link: '+966 55 140 5555' },
  { id: 3, label: 'social-media' },
] as const;

export const SOCIALS = [
  {
    id: 1,
    link: 'linkedin',
    icon: <Linkedin size={16} className="text-white" />,
  },
  {
    id: 2,
    link: 'instagram',
    icon: <Instagram size={16} className="text-white" />,
  },
  { id: 3, link: 'x', icon: <X size={16} className="text-white" /> },
] as const;
