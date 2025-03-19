'use client';
import '@mantine/carousel/styles.css';
import { Stack, Title } from '@mantine/core';
import React, { useRef } from 'react';
import City_Card from './City_Card';
import { popular_cities } from '@/contents/home';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';

export default function Popular_Cities() {
  const isXl = useMediaQuery('(min-width: 1280px)', true, {
    getInitialValueInEffect: false,
  });

  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const shouldAutoplay = !(isXl && popular_cities.length === 4);

  return (
    <Stack align="stretch" justify="flex-start" gap="30px">
      <Title fz="h2" fw="normal" className="font-normal" ta="center">
        Popular cities
      </Title>

      <div
        style={{
          // resize: 'horizontal',
          overflow: 'hidden',
          maxWidth: '100%',
          minWidth: 250,
        }}
        className="pl-10  md:px-20  xl:px-10"
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
