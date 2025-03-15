import { NuqsAdapter } from 'nuqs/adapters/next/app'

export default function Nuqs_Adapter({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NuqsAdapter>{children}</NuqsAdapter>
    );
}