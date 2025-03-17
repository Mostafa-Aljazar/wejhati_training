'use client';
import { squares_menu } from '@/assets/common';
import { Box, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function Nav_Drawer() {
  const [opened, { open, close }] = useDisclosure(false);

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
        pt={50}
        withCloseButton={false}
        mt={50}
        overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
        size={300}
      >
        {/* {navItems.map((item, index) => {
          if (item.label === 'my-tickets') {
            return (
              <Box key={index} className="w-full">
                <div
                  onClick={toggleMyTickets}
                  className={cn(
                    'flex  py-2 w-full flex-row items-center  justify-between  text-left text-base font-normal text-[#817C74]', // Align text to the left and remove padding
                    isActive ? 'font-medium text-[#F19A07]' : '',
                  )}
                >
                  <span>{t(item.label)}</span>
                  <ChevronUp
                    size={16}
                    className={`${isActive ? 'text-[#F19A07]' : 'text-[#817C74]'} transition ${
                      isMyTicketsOpen ? '' : 'rotate-180'
                    }`}
                  />
                </div>
                <Collapse in={isMyTicketsOpen}>
                  {navPopoverItems.map((subItem, subIndex) => {
                    return (
                      <Link
                        key={`${subItem.label}-${subIndex}`}
                        href={subItem.link}
                        className={cn(
                          'block py-2 text-base font-normal text-[#817C74]', // Add padding to indicate nesting
                          subItem.link === pathname &&
                            'font-medium text-[#F19A07]',
                        )}
                        onClick={close}
                      >
                        {t(subItem.label)}
                      </Link>
                    );
                  })}
                </Collapse>
              </Box>
            );
          }

          return (
            <Link
              key={`${item.label}-${index}`}
              href={item.link}
              className={cn(
                'block py-2 text-base font-normal text-[#817C74]',
                item.link === pathname && 'font-medium text-[#F19A07]',
              )}
              onClick={close}
            >
              {t(item.label)}
            </Link>
          );
        })} */}
      </Drawer>
    </>
  );
}
