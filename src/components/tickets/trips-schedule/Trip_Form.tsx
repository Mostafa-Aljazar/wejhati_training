'use client';
import {
  Autocomplete,
  AutocompleteProps,
  Button,
  Flex,
  Text,
} from '@mantine/core';
import { ArrowRightLeft, Calendar, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { DateInput, DatePickerInput } from '@mantine/dates';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Target_Arrow } from '@/assets/about_us';
import { Example_Cities } from '@/contents/common/cities';
import { useTranslations } from 'next-intl';

export default function Trip_Form() {
  const errors = useTranslations('errors');

  const tripSchema = z
    .object({
      departure: z.string().min(1, { message: errors('required_error') }),
      arrival: z.string().min(1, { message: errors('required_error') }),
      date: z.date({ message: errors('required_error') }),
    })
    .refine((data) => data.departure !== data.arrival, {
      message: errors('Same_Station_Error'),
      path: ['arrival'],
    });

  const t = useTranslations('general');

  const form = useForm({
    initialValues: {
      departure: '',
      arrival: '',
      date: null,
    } as {
      departure: string;
      arrival: string;
      date?: Date | null;
    },
    validate: zodResolver(tripSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Trip scheduled:', values);
  };

  const formattedCities = Example_Cities.map((city) => ({
    value: city.id,
    label: `${city.name} - ${city.station}`,
  }));

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({
    option,
  }) => {
    const city = Example_Cities.find((c) => c.id === option.value);
    return (
      <div className="flex items-start gap-2">
        <MapPin className="w-5 h-5 text-[#B9B5B1]" />
        <div className="flex flex-col">
          <span className="font-normal text-[#2B261E] text-sm">
            {city?.name}
          </span>
          <span className="font-normal text-[#B9B5B1] text-sm">
            {city?.station}
          </span>
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col items-center gap-5 w-full h-full"
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify={'center'}
        align={'center'}
        gap={8}
        w={'100%'}
      >
        <div className="relative flex lg:flex-row flex-col flex-2 items-center gap-2 w-full">
          {/* Departure */}
          <div className="flex flex-wrap w-full">
            <Autocomplete
              label={
                <p className="font-normal text-[#817C74] text-sm">
                  {t('departure')}
                </p>
              }
              placeholder={t('departure')}
              data={formattedCities}
              renderOption={renderAutocompleteOption}
              leftSection={<MapPin size={16} className="text-[#B9B5B1]" />}
              size="md"
              classNames={{ input: 'border-1 border-[#DFDEDC]' }}
              className="w-full"
              {...form.getInputProps('departure')}
            />
          </div>

          {/* ArrowRightLeft */}
          <div className="top-1/2 lg:right-1/2 z-20 absolute flex justify-center items-center rotate-90 md:rotate-0 translate-x-1/2 end-5">
            <ArrowRightLeft
              size={25}
              strokeWidth={3}
              className="p-1 border-[#F19A07] border-[1px] rounded-full text-[#B9B5B1]"
            />
          </div>

          {/* Arrival */}
          <div className="flex w-full">
            <Autocomplete
              label={
                <p className="font-normal text-[#817C74] text-sm">
                  {t('arrival')}
                </p>
              }
              placeholder={t('arrival')}
              data={formattedCities}
              renderOption={renderAutocompleteOption}
              leftSection={
                <Image
                  src={Target_Arrow}
                  alt="target_arrow"
                  className="mr-2 ml-3 w-4 h-4"
                />
              }
              classNames={{ input: 'border-1 border-[#DFDEDC]' }}
              size="md"
              className="w-full"
              {...form.getInputProps('arrival')}
            />
          </div>
        </div>

        <div className="flex flex-1 w-full">
          <DateInput
            label={
              <p className="font-normal text-[#817C74] text-sm">{t('date')}</p>
            }
            leftSection={<Calendar size={16} className="text-[#B9B5B1]" />}
            placeholder={t('date-input-placeholder')}
            classNames={{ input: 'border-1 border-[#DFDEDC]' }}
            className="w-full"
            size="md"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps('date')}
          />
        </div>
      </Flex>

      <Button
        c={'white'}
        className="bg-primary shadow-lg text-center"
        h={36}
        w={{ base: '100%', lg: 128 }}
        mb={{ base: 20, lg: -38 }}
        type="submit"
        leftSection={<Search size={18} />}
      >
        <Text className="font-medium text-xl">{t('search')}</Text>
      </Button>
    </form>
  );
}
