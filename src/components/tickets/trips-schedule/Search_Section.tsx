'use client';
import { Button, Fieldset, Box } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Trip_Form from './Trip_Form';

export default function Search_Section() {
  const t = useTranslations('platform.home.Before_Traveling');
  return (
    <Fieldset
      legend={
        <Button
          w={137}
          h={32}
          color="primary"
          fz={14}
          fw={400}
          radius="md"
          className="mx-5 !p-0"
        >
          {t('Trips_Schedule')}
        </Button>
      }
      radius={12}
      className="rounded-xl w-full lg:w-[950px] xl:w-[1140px]"
    >
      <Trip_Form />
    </Fieldset>
  );
}
