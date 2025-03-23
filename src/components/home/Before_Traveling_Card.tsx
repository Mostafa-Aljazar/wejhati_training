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
      <Box className="relative shadow-lg mx-auto rounded-lg w-[166px] lg:w-56 xl:w-[284px] h-[140px] lg:h-40 xl:h-48 overflow-hidden">
        <Image
          src={info.image}
          alt={info.text}
          className="w-full h-full object-cover"
        />

        <Box className="bottom-0 left-0 absolute bg-black/50 bg-opacity-60 p-2 w-full">
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
