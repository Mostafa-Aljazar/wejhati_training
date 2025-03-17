import '../globals.css';
import '@mantine/core/styles.css';

import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import Provider from '@/providers/providers';
import { getMessages, setRequestLocale } from 'next-intl/server';
import sfProDisplay from '@/fonts';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  // setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      dir={`${locale == 'en' ? 'ltr' : 'rtl'}`}
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${sfProDisplay.className} antialiased`}>
        <Provider messages={messages} locale={locale as 'en' | 'ar'}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
