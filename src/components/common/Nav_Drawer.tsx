'use client';
import { squares_menu } from '@/assets/common';
import { MY_TICKETS, NAV_ITEMS } from '@/contents/common/navbar';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/utility/cn';
import { Box, Collapse, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronUp, CircleX } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo } from 'react';

export default function Nav_Drawer() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isMyTicketsOpen, { toggle: toggleMyTickets }] = useDisclosure(true);

  const pathname = usePathname();

  const isActive = useMemo(() => {
    return NAV_ITEMS.find((e) => {
      pathname.includes(e.link);
    });
  }, [pathname]);

  const isAnyTicketActive = useMemo(() => {
    return MY_TICKETS.some((item) => item.link === pathname);
  }, [pathname]);

  return (
    <>
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

      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
        size={300}
      >
        <Stack pt={20}>
          {NAV_ITEMS.map((item, index) => {
            if (item.text === 'My Tickets') {
              return (
                <Box key={index} className="w-full">
                  <div
                    onClick={toggleMyTickets}
                    className={cn(
                      'flex  py-2 w-full flex-row items-center  justify-between  text-left text-base font-normal text-[#817C74]', // Align text to the left and remove padding
                      isActive ? 'font-medium text-[#F19A07]' : '',
                    )}
                  >
                    <span
                      className={`${isAnyTicketActive ? 'text-[#F19A07]' : 'text-[#817C74]'}`}
                    >
                      {item.text}
                    </span>
                    <ChevronUp
                      size={16}
                      className={`${isActive ? 'text-[#F19A07]' : 'text-[#817C74]'} transition ${
                        isMyTicketsOpen ? '' : 'rotate-180'
                      }`}
                    />
                  </div>
                  <Collapse in={isMyTicketsOpen}>
                    {MY_TICKETS.map((subItem, subIndex) => {
                      return (
                        <Link
                          key={`${subItem.text}-${subIndex}`}
                          href={subItem.link}
                          className={cn(
                            'block py-2 text-base font-normal text-[#817C74]', // Add padding to indicate nesting
                            subItem.link === pathname &&
                              'font-medium text-[#F19A07]',
                          )}
                          onClick={close}
                        >
                          {subItem.text}
                        </Link>
                      );
                    })}
                  </Collapse>
                </Box>
              );
            }

            return (
              <Link
                key={`${item.text}-${index}`}
                href={item.link}
                className={cn(
                  'block py-2 text-base font-normal text-[#817C74]',
                  item.link === pathname && 'font-medium text-[#F19A07]',
                )}
                onClick={close}
              >
                {item.text}
              </Link>
            );
          })}
        </Stack>
      </Drawer>
    </>
  );
}
