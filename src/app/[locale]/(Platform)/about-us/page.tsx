'use client';
import {
  About_Cover,
  Target_Arrow,
  Vehicle_ar,
  Vehicle_en,
} from '@/assets/about_us';
import { Hero_Curve } from '@/assets/home';
import { useRouter } from '@/i18n/navigation';
import {
  ActionIcon,
  Box,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Overlay,
  Stack,
  Text,
} from '@mantine/core';
import { ArrowLeft, MapPinned } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function About_US() {
  const t = useTranslations('platform.about');
  const router = useRouter();
  const locale = useLocale();
  return (
    <>
      <Group
        gap={12}
        px={20}
        mt={72}
        h={85}
        w="100%"
        bg={'#FEF3E1'}
        hiddenFrom="lg"
      >
        <ActionIcon
          variant="white"
          w={30}
          h={30}
          className="!rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} color="#000" />
        </ActionIcon>
        <Text c={'About Us'} fw={600} fz={16}>
          {t('title')}
        </Text>
      </Group>
      <Box pos="relative" h={{ base: 200, md: 300, lg: 500 }} w="100%">
        <Image
          alt="HeroUI hero Image"
          src={About_Cover}
          className="object-cover"
          layout="fill"
          priority
        />

        <Overlay color="black" backgroundOpacity={0.75} zIndex={10} center>
          <Stack align="center" c={'white'} px={20}>
            <Text
              fz={{ base: 20, lg: 30 }}
              fw={'500'}
              w={{ base: '100%', lg: 700 }}
              className="text-center"
            >
              {t('hero_title')}
            </Text>
            <Text
              fz={{ base: 14, lg: 16 }}
              fw={'400'}
              w={{ base: '100%', lg: 570 }}
              className="text-center"
            >
              {t('hero_text')}
            </Text>
          </Stack>
        </Overlay>
        <Box pos="absolute" bottom={-1.5} w="100%" style={{ zIndex: 20 }}>
          <Image alt="Overlay" src={Hero_Curve} className="w-full" />
        </Box>
      </Box>

      <Stack my={48} w="100%" justify="center" align="center">
        <Flex
          direction={{ base: 'column-reverse', lg: 'row' }}
          justify="center"
          align="center"
          gap={{ base: 24, md: 0, lg: 64 }}
        >
          <Flex
            direction="column"
            justify="center"
            align={{ base: 'center', lg: 'flex-start' }}
            gap={12}
          >
            <Text
              fw={{ base: 600, md: 400 }}
              fz={{ base: '16px', md: '24px', lg: '32px' }}
            >
              {t('title')}
            </Text>
            <Text
              c="#817C74"
              fz={{ base: 'xs', md: 'sm', lg: 'md' }}
              w={{ base: 307, md: 350, lg: 438 }}
              ta={{ base: 'center', lg: 'start' }}
            >
              {t('about-us_text')}
            </Text>
          </Flex>
          <Image
            src={locale == 'en' ? Vehicle_en : Vehicle_ar}
            alt="targetArrow"
            width={492}
            height={297}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: 492,
              maxHeight: 297,
            }}
          />
        </Flex>

        <Stack
          gap={12}
          bg="#FFF9F0"
          mt={{ base: 40, lg: 50 }}
          p={10}
          style={{ borderRadius: '16px' }}
          className="w-fit"
          mx={10}
        >
          <Card
            shadow="sm"
            radius="xl"
            w={{ base: '100%', lg: 950, xl: 1054 }}
            bg="white"
            p={20}
          >
            <Flex direction="column" align="center" gap={8}>
              <Center
                bg="#FFF9F0"
                w={40}
                h={40}
                style={{ borderRadius: '8px' }}
              >
                <Image
                  src={Target_Arrow}
                  alt="targetArrow"
                  width={24}
                  height={24}
                />
              </Center>
              <Text
                fw={{ base: 600, lg: 400 }}
                fz={{ base: '16px', md: '24px', lg: '32px' }}
              >
                {t('vision')}
              </Text>
              <Text
                c="#817C74"
                fz={{ base: 'xs', md: 'sm', lg: 'md' }}
                ta="center"
                maw={720}
              >
                {t('vision_text')}
              </Text>
            </Flex>
          </Card>

          <Card
            shadow="sm"
            radius="xl"
            w={{ base: '100%', lg: 950, xl: 1054 }}
            bg="white"
            p={20}
          >
            <Flex direction="column" align="center" gap={8}>
              <Center
                bg="#FFF9F0"
                w={40}
                h={40}
                style={{ borderRadius: '8px' }}
              >
                <MapPinned size={24} color="#F19A07" />
              </Center>
              <Text
                fw={{ base: 600, lg: 400 }}
                fz={{ base: '16px', md: '24px', lg: '32px' }}
              >
                {t('Mission')}
              </Text>
              <Text
                c="#817C74"
                fz={{ base: 'xs', md: 'sm', lg: 'md' }}
                ta="center"
                maw={720}
              >
                {t('Mission_text')}
              </Text>
            </Flex>
          </Card>
        </Stack>
      </Stack>
    </>
  );
}
