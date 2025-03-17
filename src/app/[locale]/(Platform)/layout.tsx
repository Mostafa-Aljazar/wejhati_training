'use client';
import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import Navbar from '@/components/common/Navbar';

export default function Platform_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pinned = useHeadroom({ fixedAt: 70 });

  return (
    <AppShell
      header={{ height: 72, offset: false }}
      navbar={{
        width: 300,
        breakpoint: 'lg',
        collapsed: { desktop: true, mobile: true },
      }}
      withBorder={false}
      // className="w-full flex flex-col"
    >
      <Navbar />
      <AppShell.Main className="w-full flex-1">{children}</AppShell.Main>
    </AppShell>
  );
}
