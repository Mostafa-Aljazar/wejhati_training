import { City } from '@/@types/cities';
import { Amman } from '@/assets/home/Popular_Cities';
import { popular_cities } from '@/contents/home';
import { Card, CardSection, Group, Text, Box, Flex } from '@mantine/core';
import Image from 'next/image';

type Props = {
  data: (typeof popular_cities)[number];
};
export default function City_Card({ data }: Props) {
  return (
    <Card
      shadow="sm"
      padding="0"
      radius="md"
      withBorder
      w={{ base: 200, lg: 288 }}
      h={{ base: 183, lg: 245 }}
    >
      <CardSection>
        <Box pos="relative" h={{ base: 140, lg: 190 }}>
          <Image
            src={data.image}
            alt="Amman"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      </CardSection>

      <Flex
        gap="5px"
        p="sm"
        justify="start"
        align="center"
        direction="row"
        h={'100%'}
      >
        <Text fw={500} size="md" c="#2B261E">
          {data.city}
        </Text>
        <Text c="gray">-</Text>
        <Text fw={500} size="sm" c="#817C74">
          {data.country}
        </Text>
      </Flex>
    </Card>
  );
}
