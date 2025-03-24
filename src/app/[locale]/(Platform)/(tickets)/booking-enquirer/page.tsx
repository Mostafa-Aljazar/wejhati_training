import { Hero_Curve } from '@/assets/home';
import { Hero_Booking } from '@/assets/tickets/booking-enquirer';
import Search_Section from '@/components/tickets/booking-enquirer/Search_Section';
import { Box, Overlay, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Booking_Enquirer() {
  const t = useTranslations('platform.my-tickets.booking-enquiry');

  return (
    <>
      <Box pos="relative" h={{ base: 200, md: 300, lg: 500 }} w="100%">
        <Image
          alt="HeroUI hero Image"
          src={Hero_Booking}
          className="object-cover"
          layout="fill"
          priority
        />

        <Overlay color="black" backgroundOpacity={0.75} zIndex={10} center>
          <Stack align="center" c={'white'} px={20}>
            <Text
              visibleFrom="lg"
              fz={96}
              fw={700}
              className="[-webkit-text-fill-color:transparent] [text-fill-color:transparent] [-webkit-text-stroke:2px_#FFFFFF] leading-[100%] tracking-[0%] [text-stroke:2px_#FFFFFF]"
            >
              {t('title')}
            </Text>
          </Stack>
        </Overlay>
        <Box pos="absolute" bottom={-1.5} w="100%" style={{ zIndex: 20 }}>
          <Image alt="Overlay" src={Hero_Curve} className="w-full" />
        </Box>
      </Box>

      <div className="z-50 relative flex justify-center items-center mx-auto -mt-20 lg:-mt-40 px-4 w-full">
        <Search_Section />
      </div>
    </>
  );
}
