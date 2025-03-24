'use client';
import { Button, Fieldset, Group, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Booking_Form from './Booking_Form';
import { Link } from '@/i18n/navigation';
import { PLATFORM_ROUTES } from '@/contents/routes/routes';

export default function Search_Section() {
  const tNav = useTranslations('nav-bar');
  const t = useTranslations('platform.my-tickets.booking-enquiry');

  return (
    <Fieldset
      legend={
        <Group className="!gap-3 !lg:gap-10 px-5">
          <Link href={PLATFORM_ROUTES.Home}>
            <Button
              variant="light"
              w={137}
              h={32}
              color="white"
              fz={14}
              fw={400}
              radius="md"
              bg="#231D1DC2"
              className="!p-0"
            >
              {tNav('book-tickets')}
            </Button>
          </Link>
          <Link href={PLATFORM_ROUTES.BOOKING_ENQUIRER}>
            <Button
              w={137}
              h={32}
              color="primary"
              fz={14}
              fw={400}
              radius="md"
              className="!p-0"
            >
              {tNav('booking-enquirer')}
            </Button>
          </Link>
        </Group>
      }
      radius={12}
      className="flex flex-col gap-5 shadow-lg !mx-0 md:mt-0 !px-0 !py-0 rounded-xl w-full lg:w-[950px] xl:w-[1140px]"
    >
      <Text
        mt={10}
        fw={400}
        px={10}
        className="!text-primary text-xs lg:text-sm text-center"
      >
        {t('search.hint')}
      </Text>
      <Booking_Form />
    </Fieldset>
  );
}
