'use client';
import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function Platform_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pinned = useHeadroom({ fixedAt: 70 });

  return (
    <AppShell
      header={{ height: 72, collapsed: !pinned, offset: false }}
      navbar={{
        width: 300,
        breakpoint: 'lg',
        collapsed: { desktop: true, mobile: true },
      }}
      withBorder={false}
      className="w-full min-h-screen flex flex-col"
    >
      <Navbar />
      <AppShell.Main className="w-full h-full flex-1 flex flex-col">
        {children}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
