import { ReactNode } from "react";
import NextIntl_Provider from "./NextIntl_Provider";
import { AbstractIntlMessages } from "next-intl";
import Mantine_Provider from "./Mantine_Provider";
import Nuqs_Adapter from "./Nuqs_Adapter";

interface Props {
    children: ReactNode
    locale: "en" | "ar"
    messages: AbstractIntlMessages
}


export default function Provider({ children, locale, messages }: Props) {
    return (
        <NextIntl_Provider messages={messages} locale={locale}>
            <Mantine_Provider>
                <Nuqs_Adapter>
                    {children}
                </Nuqs_Adapter>
            </Mantine_Provider>
        </NextIntl_Provider>
    );
}