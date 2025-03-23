'use client';
import '@mantine/carousel/styles.css';
import { Stack, Title } from '@mantine/core';
import React, { useRef } from 'react';
import City_Card from './City_Card';
// import { popular_cities } from '@/contents/home';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { getPopularCities } from '@/contents/home';
import { useTranslations } from 'next-intl';

export default function Popular_Cities() {
  const t = useTranslations();
  const popular_cities = getPopularCities(t);

  const isXl = useMediaQuery('(min-width: 1280px)', true, {
    getInitialValueInEffect: false,
  });

  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const shouldAutoplay = !(isXl && popular_cities.length === 4);

  return (
    <Stack justify="flex-start" gap="lg" w={'100%'} className="px-4 w-full">
      <Title
        fz={{ base: 16, lg: 32 }}
        fw="500"
        ta={{ base: 'start', lg: 'center' }}
        w={'100%'}
      >
        {t('platform.home.Popular_Cities.title')}
      </Title>

      <div
        style={{
          // resize: 'horizontal',
          overflow: 'hidden',
          maxWidth: '100%',
          minWidth: 250,
        }}
        className="md:px-20 xl:px-10"
      >
        <Carousel
          type="media"
          slideGap={20}
          loop
          align="start"
          slideSize={{
            base: '60%',
            '450px': '33.3333%',
            md: '33.3333%',
            xl: '25%',
          }}
          draggable={isXl && popular_cities.length === 4 ? false : true}
          withControls={false}
          plugins={shouldAutoplay ? [autoplay.current] : []}
          onMouseEnter={shouldAutoplay ? autoplay.current.stop : undefined}
          onMouseLeave={shouldAutoplay ? autoplay.current.reset : undefined}
        >
          {popular_cities.map((city) => (
            <Carousel.Slide key={city.id}>
              <City_Card data={city} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </Stack>
  );
}
