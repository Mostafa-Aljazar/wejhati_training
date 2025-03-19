import { before_traveling_info } from '@/contents/home';
import { Link } from '@/i18n/navigation';
import { Box, Text } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

type Props = {
  id: Number;
  text: string;
  image: StaticImageData;
  link: string;
};

export default function Before_Traveling_Card(info: Props) {
  return (
    <Link href={info.link}>
      <Box className="relative h-[140px] w-[166px] mx-auto overflow-hidden rounded-lg shadow-lg lg:h-40 lg:w-56 xl:h-48 xl:w-[284px] ">
        <Image
          src={info.image}
          alt={info.text}
          className="h-full w-full object-cover"
        />

        <Box className="absolute bottom-0 left-0 w-full bg-black/50 bg-opacity-60 p-2">
          <Text
            size="sm"
            fz={{ base: 14, lg: 16 }}
            fw={400}
            className="text-center"
            c="#FFFFFF"
          >
            {info.text}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
