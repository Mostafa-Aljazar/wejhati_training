"use client"
import { MantineProvider } from "@mantine/core";

export default function Mantine_Provider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MantineProvider>{children}</MantineProvider>
    );
}