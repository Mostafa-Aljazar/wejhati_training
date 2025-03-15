import "../globals.css";
import '@mantine/core/styles.css';


import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import Provider from '@/providers/providers';
import { getMessages } from "next-intl/server";

export const metadata = {
    title: 'My Mantine app',
    description: 'I have followed setup instructions carefully',
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages()
    return (
        <html lang={locale} dir={`${locale == "en" ? "ltr" : "rtl"}`} {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <Provider messages={messages} locale={locale}>{children}</Provider>
            </body>
        </html>
    );
}