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
        <Group className="!gap-3 !lg:gap-10 px-5">
          <Button
            w={137}
            h={32}
            color="primary"
            fz={14}
            fw={400}
            radius="md"
            className="!p-0"
          >
            {tNav('book-tickets')}
          </Button>
          <Button
            variant="light"
            w={137}
            h={32}
            color="white"
            fz={14}
            fw={400}
            radius="md"
            bg="#231D1DC2"
            className="!p-0"
          >
            {tNav('booking-enquirer')}
          </Button>
        </Group>
      }
      radius={12}
      className="flex flex-col shadow-lg !mx-0 md:mt-0 !p-0 rounded-xl w-full lg:w-[950px] xl:w-[1140px]"
    >
      <div className="flex flex-col justify-center items-center mt-4 lg:-mt-2 w-full">
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as string)}
          className="flex flex-col justify-center w-full"
          variant=""
        >
          <div className="flex justify-center items-center gap-3 lg:gap-5 bg-[#FEFAE0] mx-auto -mt-2 px-1 lg:px-4 rounded-b-xl w-fit">
            <Tabs.List className="h-11">
              <Group className="gap-0 lg:gap-16">
                {activeTabSection(TabTypes.One_Way)}
                {activeTabSection(TabTypes.Round_Trip)}
              </Group>
            </Tabs.List>

            <div className="bg-[#DFDEDC] w-[2px] h-5" />

            {/* Passengers Dropdown */}
            <Popover width={200} shadow="md" position="bottom">
              <Popover.Target>
                <Button
                  variant="transparent"
                  rightSection={<ChevronDown size={15} />}
                  className="!m-0 !p-0 h-11 text-black"
                  c={'dark'}
                >
                  {tGen('passengers')}
                </Button>
              </Popover.Target>

              <Popover.Dropdown>
                <Stack align="center" gap={8}>
                  <Group align="center" justify="space-between" w={'100%'}>
                    <Stack gap={0}>
                      <Text fw={400} fz={14} c={'#2B261E'}>
                        {tGen('adult')}
                      </Text>
                      <Text c={'#B9B5B1'} fz={10} fw={'400'}>
                        {tGen('age')} 12+
                      </Text>
                    </Stack>
                    <Group gap={10}>
                      <ActionIcon
                        variant="filled"
                        bg={'#F19A07 '}
                        w={25}
                        h={25}
                        onClick={() => setAdults((pre) => pre + 1)}
                      >
                        <Plus size={18} />
                      </ActionIcon>

                      <Text c={'#2B261E'} fz={14} fw={'400'}>
                        {adults}
                      </Text>
                      <ActionIcon
                        variant="filled"
                        bg={'#F19A07 '}
                        w={25}
                        h={25}
                        onClick={() =>
                          setAdults((pre) => (pre > 0 ? pre - 1 : pre))
                        }
                      >
                        <Minus size={18} />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <Group
                    align="center"
                    justify="space-between"
                    gap={0}
                    w={'100%'}
                  >
                    <Stack gap={0}>
                      <Text fw={400} fz={14} c={'#2B261E'}>
                        {tGen('child')}
                      </Text>
                      <Text c={'#B9B5B1'} fz={10} fw={'400'}>
                        {tGen('age')} 12-
                      </Text>
                    </Stack>
                    <Group gap={10}>
                      <ActionIcon
                        variant="filled"
                        bg={'#F19A07 '}
                        w={25}
                        h={25}
                        onClick={() => setChildren((pre) => pre + 1)}
                      >
                        <Plus size={18} />
                      </ActionIcon>

                      <Text c={'#2B261E'} fz={14} fw={'400'}>
                        {children}
                      </Text>
                      <ActionIcon
                        variant="filled"
                        bg={'#F19A07 '}
                        w={25}
                        h={25}
                        onClick={() =>
                          setChildren((pre) => (pre > 0 ? pre - 1 : pre))
                        }
                      >
                        <Minus size={18} />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Stack>
              </Popover.Dropdown>
            </Popover>

            <div className="hidden lg:block bg-[#DFDEDC] w-[2px] h-5" />

            {/* Passenger Counts */}
            <Group visibleFrom="lg">
              <Group gap={5}>
                <Text>{adults}</Text>
                <CircleUserRound size={20} />
              </Group>
              <Group gap={5}>
                <Text>{children}</Text>
                <Baby size={20} />
              </Group>
            </Group>
            <Text
              bg={'white'}
              w={30}
              h={20}
              className="text-center"
              hiddenFrom="lg"
            >
              {children + adults}
            </Text>
          </div>
          <Tabs.Panel value={TabTypes.One_Way} className="px-4 w-full">
            <Trip_Form tripType="One_Way" Children={children} Adults={adults} />
          </Tabs.Panel>
          <Tabs.Panel value={TabTypes.Round_Trip} className="px-4 w-full">
            <Trip_Form
              tripType="Round_Trip"
              Children={children}
              Adults={adults}
            />
          </Tabs.Panel>
        </Tabs>
      </div>
    </Fieldset>
  );
}
