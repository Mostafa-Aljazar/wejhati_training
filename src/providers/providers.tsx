import { ReactNode } from "react";
import Mantine_Provider from "./mantine_provider";
import NextIntl_Provider from "./NextIntl_Provider";
import { AbstractIntlMessages } from "next-intl";

interface Props {
    children: ReactNode
    locale: "en" | "ar"
    messages: AbstractIntlMessages
}


export default function Provider({ children, locale, messages }: Props) {
    return (
        <NextIntl_Provider messages={messages} locale={locale}>
            <Mantine_Provider>
                {children}
            </Mantine_Provider>
        </NextIntl_Provider>
    );
}