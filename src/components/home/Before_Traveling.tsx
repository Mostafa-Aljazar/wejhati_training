'use client';

import { Grid, Stack, Title } from '@mantine/core';
import Before_Traveling_Card from './Before_Traveling_Card';
import { before_traveling_info } from '@/contents/home';

export default function Before_Traveling() {
  return (
    <Stack
      align="center" // Center the entire stack horizontally
      justify="flex-start"
      className="p-4 w-full max-w-screen-xl mx-auto" // Ensure the stack is centered on the page with a max width
    >
      <Title
        fz={{ base: 16, lg: 32 }}
        fw="500"
        ta={{ base: 'start', lg: 'center' }}
        w={'100%'}
      >
        Before Traveling
      </Title>

      <Grid gutter={20} className="w-full  sm:px-20 md:px-0" justify="center">
        {before_traveling_info.map((info) => (
          <Grid.Col key={info.id} span={{ base: 6, md: 3 }}>
            <Before_Traveling_Card {...info} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
