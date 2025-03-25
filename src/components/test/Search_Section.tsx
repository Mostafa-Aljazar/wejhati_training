'use client';
import {
  Button,
  Fieldset,
  Group,
  Tabs,
  Text,
  Box,
  Popover,
  Stack,
  ActionIcon,
} from '@mantine/core';
import { Baby, ChevronDown, CircleUserRound, Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/utility/cn';
import { useTranslations } from 'next-intl';
import { TabTypes } from '@/contents/home';
import Trip_Form from './Trip_Form';
import { Link } from '@/i18n/navigation';
import { PLATFORM_ROUTES } from '@/contents/routes/routes';

export default function Search_Section() {
  const tGen = useTranslations('general'); // For general translations
  const tNav = useTranslations('nav-bar'); // For nav-bar translations

  const [activeTab, setActiveTab] = useState<string>(TabTypes.One_Way);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const activeTabSection = (tab: string) => (
    <Tabs.Tab
      value={tab}
      className="h-full"
      styles={{
        tab: {
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Text size="14px" fw={500} c={activeTab === tab ? 'primary' : '#2B261E'}>
        {tab === TabTypes.One_Way
          ? tGen('trip-types.oneWay')
          : tGen('trip-types.Round')}
      </Text>
      <Box
        w={36}
        h={6}
        mt={4}
        mx="auto"
        mb={-8}
        bg="#F19A07"
        className={cn('rounded-t-lg', activeTab === tab ? '' : 'hidden')}
      />
    </Tabs.Tab>
  );

  return (
    <Fieldset
      legend={
        <Button
          w={137}
          h={32}
          color="primary"
          fz={14}
          fw={400}
          radius="md"
          className="mx-5 !p-0"
        >
          Trip Schedule
        </Button>
      }
      radius={12}
      className="rounded-xl w-full lg:w-[950px] xl:w-[1140px]"
    >
      <Trip_Form />
    </Fieldset>
  );
}
