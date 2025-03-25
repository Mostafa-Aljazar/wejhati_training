'use client';
import { Divider, Flex, Group, Stack, Tabs, Text } from '@mantine/core';
import { parseAsString, useQueryState } from 'nuqs';
import { cn } from '@/utility/cn';
import Back_Button from '@/components/common/Back_Button';
import { useTranslations } from 'next-intl';
import { GET_PROFILE_TABS } from '@/contents/profile';
import Profile_Form from '@/components/profile/Profile_Form';

export default function Profile() {
  const t = useTranslations('platform.profile');
  const Profile_Tabs = GET_PROFILE_TABS(t);
  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsString.withDefault(Profile_Tabs.My_Profile)
  );

  const activeTabSection = (tab: keyof typeof Profile_Tabs) => (
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
      pt={100}
      pb={{ base: 0, md: 40 }}
      gap={20}
      align={'center'}
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

      <Tabs
        value={activeTab}
        variant=""
        onChange={setActiveTab}
        className="rounded-xl w-full overflow-hidden"
        w={{ base: '100%', md: '730px', lg: '980px', xl: '1140px' }}
      >
        <Stack justify="center" align="center" gap={16} mt={40} w={'100%'}>
          <Tabs.List
            justify="center"
            grow
            className="flex md:flex-row flex-col justify-evenly items-center bg-white shadow-lg mx-auto border-[#DFDEDC] border-[1px] rounded-xl w-[340px] sm:w-[580px] md:w-[678px] overflow-hidden"
          >
            <Group
              flex={1}
              align="center"
              gap={4}
              className="w-full"
              wrap="nowrap"
            >
              {activeTabSection(Profile_Tabs.My_Profile)}
              <Divider h={20} w={2} bg={'#DFDEDC'} />
              {activeTabSection(Profile_Tabs.My_Bookings)}
            </Group>
          </Tabs.List>

          <Tabs.Panel value={Profile_Tabs.My_Profile} w={'100%'}>
            <Profile_Form />
          </Tabs.Panel>

          <Tabs.Panel value={Profile_Tabs.My_Bookings} w={'100%'}>
            <>My_Bookings_Form</>
            {/* <Refund_Request_Form userType={userType || UserType.Traveler} activeTab={activeTab || TabTypes.Refund_Request} /> */}
          </Tabs.Panel>
        </Stack>
      </Tabs>
    </Flex>
  );
}
