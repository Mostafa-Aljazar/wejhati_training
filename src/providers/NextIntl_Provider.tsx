import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
    locale: "en" | "ar",
    messages: AbstractIntlMessages
}

export default function NextIntl_Provider({ children, locale, messages }: Props) {
    return (
        <NextIntlClientProvider messages={messages} locale={locale}>{children}</NextIntlClientProvider>
    );
}