'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { ActionIcon } from '@mantine/core';
import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function LanguagesSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locales = ['en', 'ar'];
  const currentLocale = useLocale();

  const nextLocale = currentLocale === 'en' ? 'ar' : 'en';

  function handleLanguageSwitch() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <ActionIcon variant="subtle" radius={'sm'} onClick={handleLanguageSwitch}>
      <Languages className="w-6 h-6" />
    </ActionIcon>
  );
}
