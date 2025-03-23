'use client';

import { Grid, Stack, Title } from '@mantine/core';
import Before_Traveling_Card from './Before_Traveling_Card';
import { getBeforeTravelingInfo } from '@/contents/home';
import { useTranslations } from 'next-intl';

export default function Before_Traveling() {
  const t = useTranslations();
  const before_traveling_info = getBeforeTravelingInfo(t);

  return (
    <Stack
      align="center" // Center the entire stack horizontally
      justify="flex-start"
      className="mx-auto p-4 w-full max-w-screen-xl" // Ensure the stack is centered on the page with a max width
    >
      <Title
        fz={{ base: 16, lg: 32 }}
        fw="500"
        ta={{ base: 'start', lg: 'center' }}
        w={'100%'}
      >
        {t('platform.home.Before_Traveling.title')}
      </Title>

      <Grid gutter={20} className="sm:px-20 md:px-0 w-full" justify="center">
        {before_traveling_info.map((info) => (
          <Grid.Col key={info.id} span={{ base: 6, md: 3 }}>
            <Before_Traveling_Card {...info} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
