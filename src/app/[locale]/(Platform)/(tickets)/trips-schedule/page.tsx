import { Hero_Bus, Hero_Curve } from '@/assets/home';
import Search_Section from '@/components/tickets/trips-schedule/Search_Section';
import { Box, Overlay, Stack, Text } from '@mantine/core';
import Image from 'next/image';

export default function Trips_Schedule() {
  return (
    <>
      <Box pos="relative" h={{ base: '50svh', lg: 500 }} w="100%">
        <Image
          alt="HeroUI hero Image"
          src={Hero_Bus}
          className="object-cover"
          layout="fill"
          priority
        />
        <Overlay color="black" backgroundOpacity={0.75} zIndex={10} center>
          <Stack align="center" c={'white'} px={20}>
            <Text
              fz={{ base: 20, lg: 44 }}
              fw={'500'}
              w={{ base: '100%', lg: 700 }}
              className="text-center"
            >
              Plan your journey in advance!
            </Text>
            <Text
              fz={{ base: 14, lg: 16 }}
              fw={'400'}
              w={{ base: '100%', lg: 570 }}
              className="text-center"
            >
              Check the availability of upcoming trips on your specified dates.
            </Text>
          </Stack>
        </Overlay>
        <Box pos="absolute" bottom={-2} w="100%" style={{ zIndex: 20 }}>
          <Image alt="Overlay" src={Hero_Curve} className="w-full" />
        </Box>
      </Box>
      <div className="z-50 relative flex justify-center items-center mx-auto -mt-64 lg:-mt-40 mb-10 lg:mb-20 px-4 w-full">
        <Search_Section />
      </div>
    </>
  );
}
