'use client';
import { wejhati } from '@/assets/auth';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/utility/cn';
import {
  AppShell,
  Burger,
  Button,
  Drawer,
  Group,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import React, { useMemo } from 'react';
import Nav_Tickets from './Nav-Tickets';
import { CircleX } from 'lucide-react';
import Languages_Switcher from './Languages-Switcher';
import { squares_menu } from '@/assets/common';

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();

  const NAV_ITEMS = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'About Us',
      link: '/about-us',
    },
    {
      text: 'Contact Us',
      link: '/contact-us',
    },
    {
      text: 'My Tickets',
      link: 'my-tickets',
    },
  ];

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
    <AppShell.Header className="w-full" px="40" bg={'#231D1DC2'}>
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
          </Group>
        </Group>

        {opened ? (
          <CircleX width={20} height={20} color="#B9B5B1" />
        ) : (
          <Image
            src={squares_menu}
            alt="squares_menu"
            width={20}
            height={20}
            onClick={open}
          />
        )}
      </Group>

      <Drawer opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
      </Drawer>
    </AppShell.Header>
  );
}
