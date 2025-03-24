'use client';
import { Box, Flex, Text, Title } from '@mantine/core';
import React from 'react';
import { useTranslations } from 'next-intl';
import { GET_CONDITIONS } from '@/contents/tickets/Tickets_Conditions';
import Back_Button from '@/components/common/Back_Button';

export default function Tickets_Conditions() {
  const t = useTranslations('platform.my-tickets.tickets-conditions');
  const Conditions = GET_CONDITIONS(t);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      bg={{ base: '#FEF3E1', lg: '#F9F8F6' }}
      pt={{ base: 72, md: 112 }}
      w="100%"
      h="100%"
    >
      <Flex
        justify="flex-start"
        align="center"
        gap={{ base: 12, md: 32, lg: 48, xl: 64 }}
        px={{ base: 16, md: 32, lg: 48, xl: 56 }}
        w="100%"
        h={{ base: 80, md: 'auto' }}
      >
        <Back_Button />
        <Title order={2} c="#2B261E" fw={600} fz={{ base: 16, md: 20, lg: 24 }}>
          {t('title')}
        </Title>
      </Flex>

      <Box
        style={{ backgroundColor: '#F9F8F6' }}
        px={{ base: 16, md: 40, lg: 144, xl: 160 }}
        py={{ base: 20, md: 48 }}
        w="100%"
      >
        <Flex
          direction="column"
          justify="flex-start"
          gap={{ base: 20, md: 28 }}
        >
          {Conditions.map((item, index) => (
            <Flex direction="column" justify="flex-start" gap={8} key={index}>
              <Text fw={600} c="#2B261E" fz={{ base: 16, md: 18 }}>
                {index + 1}. {item.title}
              </Text>
              <Text c="#817C74" fz={{ base: 14, md: 16 }}>
                {item.body}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
