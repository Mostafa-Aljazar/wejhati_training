'use client';
import Back_Button from '@/components/common/Back_Button';
import Contact_Us_Form from '@/components/contact-us/Contact_Form';
import {
  Button,
  Divider,
  Tabs,
  Text,
  Box,
  Group,
  Flex,
  Stack,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { cn } from '@/utility/cn';
import { User_Type } from '@/contents/home';
import { GET_CONTACT_US_TABS } from '@/contents/contact-us';

export default function Contact_Us() {
  const t = useTranslations('platform.contact-us');
  const Contact_Us_Tabs = GET_CONTACT_US_TABS(t);
  const [userType, setUserType] = useQueryState(
    'type',
    parseAsString.withDefault(User_Type.User)
  );

  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsString.withDefault(Contact_Us_Tabs.Send_Enquiries)
  );

  const activeTabSection = (tab: keyof typeof Contact_Us_Tabs) => (
    <Tabs.Tab bg={'#fff'} value={tab} className="w-full">
      <Text
        w="100%"
        className={cn(
          'transition-all duration-300 ease-in-out',
          activeTab == tab
            ? '!text-primary !font-bold '
            : '!font-medium !text-[#817C74]'
        )}
      >
        {t(`tabs.${tab}`)}
      </Text>
      <Divider
        orientation="horizontal"
        pos="absolute"
        bottom={1}
        left="50%"
        style={{
          transition: 'all 300ms ease-in-out',
          opacity: activeTab === tab ? 1 : 0,
          transformOrigin: 'center',
          scale: activeTab === tab ? '1' : '0',
        }}
        w={64}
        h={5}
        mb={-1}
        className={cn(
          'transform -translate-x-1/2 w-16 h-[5px] rounded-t-lg bg-primary '
        )}
      />
    </Tabs.Tab>
  );

  return (
    <Flex
      direction={'column'}
      justify={'center'}
      align={'center'}
      pt={100}
      pb={{ base: 0, md: 40 }}
      gap={20}
      w={'100%'}
      bg={'#F9F8F6'}
      className="min-h-screen"
    >
      <Group
        w={'100%'}
        justify="start"
        align="center"
        px={{ base: 20, lg: 48 }}
        className="!gap-5 md:!gap-16"
      >
        <Back_Button />
        <Text fz={'xl'} c={'#2B261E'} className="!text-2xl">
          {t('title')}
        </Text>
      </Group>

      <Stack
        gap={16}
        mx={'auto'}
        px={{ base: 0, md: 40, lg: 0 }}
        w={'100%'}
        className="!max-w-5xl"
      >
        <Group w={'100%'} className="!justify-center md:!justify-start">
          <Button
            variant={userType === User_Type.User ? 'filled' : 'outline'}
            onClick={() => setUserType(User_Type.User)}
            px={{ base: 0, md: 40 }}
            w={{ base: 140, md: 190 }}
            fw={'normal'}
            fz={16}
            className="bg-primary shadow-lg"
          >
            {t('tabs.Traveler')}
          </Button>
          <Button
            variant={userType === User_Type.Provider ? 'filled' : 'outline'}
            onClick={() => setUserType(User_Type.Provider)}
            px={{ base: 0, md: 40 }}
            w={{ base: 140, md: 190 }}
            fw={'normal'}
            fz={16}
            className="bg-primary shadow-lg"
          >
            {t('tabs.Provider')}
          </Button>
        </Group>

        <Stack
          w={'100%'}
          className="lg:bg-white lg:border lg:border-[#DFDEDC] rounded-2xl w-full"
        >
          <Tabs
            value={activeTab || Contact_Us_Tabs.Send_Enquiries}
            variant=""
            onChange={setActiveTab}
            className="px-5 sm:px-20 pt-5 rounded-xl w-full"
          >
            <Tabs.List
              justify="center"
              grow
              className="flex md:flex-row flex-col justify-evenly items-center bg-white shadow-lg mx-auto border-[#DFDEDC] border-[1px] rounded-xl w-full max-w-2xl overflow-hidden"
            >
              <Box className="flex flex-row flex-1 items-center gap-1">
                {activeTabSection(Contact_Us_Tabs.Send_Enquiries)}
                <Divider h={20} w={2} bg={'#DFDEDC'} />
                {activeTabSection(Contact_Us_Tabs.Complaints)}
              </Box>

              <Divider
                h={{ base: 1, md: 20 }}
                w={{ base: '100%', md: 2 }}
                bg={'#DFDEDC'}
              />

              <Box className="flex flex-row flex-1 items-center gap-1">
                {activeTabSection(Contact_Us_Tabs.Suggestions)}
                <Divider h={20} w={2} bg={'#DFDEDC'} />
                {activeTabSection(Contact_Us_Tabs.Refund_Request)}
              </Box>
            </Tabs.List>
          </Tabs>
          <Contact_Us_Form />
        </Stack>
      </Stack>
    </Flex>
  );
}
