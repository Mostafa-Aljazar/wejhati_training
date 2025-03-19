import { Box, Overlay } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import { Hero_Bus, Hero_Curve } from '@/assets/home';

export default function Hero_Section() {
  return (
    <Box
      pos="relative"
      h={{ base: '50svh', lg: 500 }}
      w="100%"
      className="mb-20"
    >
      <Image
        alt="HeroUI hero Image"
        src={Hero_Bus}
        className="object-cover"
        layout="fill"
        priority
      />
      <Overlay color="black" backgroundOpacity={0.5} zIndex={10} />
      <Box pos="absolute" bottom={0} w="100%" style={{ zIndex: 20 }}>
        <Image alt="Overlay" src={Hero_Curve} className="w-full" />
      </Box>
    </Box>
  );
}
