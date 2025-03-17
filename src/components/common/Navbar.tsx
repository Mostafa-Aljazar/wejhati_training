import { wejhati } from '@/assets/auth';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/utility/cn';
import { AppShell, Button, Group } from '@mantine/core';
import Image from 'next/image';
import React, { useMemo } from 'react';
import Nav_Tickets from './Nav_Tickets';
import Languages_Switcher from './Languages_Switcher';
import Nav_Drawer from './Nav_Drawer';
import { NAV_ITEMS } from '@/contents/common/navbar';

export default function Navbar() {
  const pathname = usePathname();

  const MenuItems = useMemo(() => {
    return NAV_ITEMS.map((item) => {
      if (item.link === 'my-tickets') {
        return <Nav_Tickets key={item.link} />;
      }
      const isActive = item.link === pathname;
      return (
        <Link
          key={item.link}
          aria-current={isActive ? 'page' : undefined}
          href={item.link}
          className={cn(
            'text-base font-normal text-white',
            isActive && 'font-bold text-[#F19A07]',
          )}
        >
          {item.text}
        </Link>
      );
    });
  }, [pathname]);

  return (
    <AppShell.Header
      className="w-full"
      px={{ base: 20, lg: 50 }}
      bg={'#231D1DC2'}
    >
      <Group h="100%" className="w-full">
        <Group justify="space-between" style={{ flex: 1 }}>
          <Link href={'/'} className="flex items-center justify-center">
            <Image src={wejhati} alt="wejhati" className="w-20" />
          </Link>
          <Group gap={32} visibleFrom="lg">
            {MenuItems}
          </Group>

          <Group>
            <Languages_Switcher />
            <Group visibleFrom="lg">
              <Button variant="outline" w={100} h={32}>
                Log up
              </Button>
              <Button variant="outline" w={100} h={32}>
                Login
              </Button>
            </Group>
            <Nav_Drawer />
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
