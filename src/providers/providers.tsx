import Mantine_Provider from "./mantine_provider";

export default function Provider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Mantine_Provider>{children}</Mantine_Provider>
    );
}