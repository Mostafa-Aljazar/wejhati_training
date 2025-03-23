'use client';
import { GET_MY_TICKETS } from '@/contents/common/navbar';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/utility/cn';
import { Button, Popover, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';

export default function Nav_Tickets() {
  const t = useTranslations();
  const MY_TICKETS = GET_MY_TICKETS(t);
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();

  // Determine if any ticket link is active
  const isAnyTicketActive = useMemo(() => {
    return MY_TICKETS.some((item) => item.link === pathname);
  }, [pathname]);

  const Dropdown_Items = useMemo(() => {
    return MY_TICKETS.map((item) => {
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
          onClick={() => setOpened(false)}
        >
          {item.text}
        </Link>
      );
    });
  }, [pathname]);

  return (
    <Popover
      width={200}
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      withArrow
      arrowPosition="side"
      arrowSize={12}
      arrowRadius={3}
      arrowOffset={10}
      classNames={{ arrow: '!border-none' }}
    >
      <Popover.Target>
        <div
          onClick={() => setOpened((o) => !o)}
          className={cn(
            'text-base font-normal text-white hover:cursor-pointer',
            isAnyTicketActive && 'font-bold text-[#F19A07]',
          )}
        >
          {t('nav-bar.my-tickets')}
        </div>
      </Popover.Target>

      <Popover.Dropdown p={16} bg={'#161511'} className="!border-none">
        <Stack justify="flex-start" gap={20}>
          {Dropdown_Items}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
