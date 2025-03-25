'use client';
import { Autocomplete, AutocompleteProps, Button, Text } from '@mantine/core';
import { ArrowRightLeft, Calendar, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { DateInput, DatePickerInput } from '@mantine/dates';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Target_Arrow } from '@/assets/about_us';
import { Example_Cities } from '@/contents/common/cities';
import { useTranslations } from 'next-intl';
import { TabTypes } from '@/contents/home';

type Props = {
  tripType: keyof typeof TabTypes; // Determines form type
  Children: number; // Changed to lowercase 'number' for consistency
  Adults: number;
};

export default function Trip_Form({ tripType, Children, Adults }: Props) {
  const errors = useTranslations('errors'); // For translations

  // Define schemas for validation
  const oneWaySchema = z
    .object({
      departure: z.string().min(1, { message: errors('required_error') }),
      arrival: z.string().min(1, { message: errors('required_error') }),
      date: z.date({ message: errors('required_error') }),
    })
    .refine((data) => data.departure !== data.arrival, {
      message: errors('Same_Station_Error'),
      path: ['arrival'],
    });

  const roundTripSchema = z
    .object({
      departure: z.string().min(1, { message: errors('required_error') }),
      arrival: z.string().min(1, { message: errors('required_error') }),
      dateRange: z
        .tuple([
          z.date({ required_error: 'required_error' }),
          z.date({ required_error: errors('required_error') }),
        ])
        .refine((dates) => dates[0] < dates[1], {
          message: errors('Return_Date_After_Departure'),
          path: [1],
        }),
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
      date: tripType === 'One_Way' ? null : undefined,
      dateRange: tripType === 'Round_Trip' ? [null, null] : undefined,
    } as {
      departure: string;
      arrival: string;
      date?: Date | null;
      dateRange?: [Date | null, Date | null];
    },
    validate: zodResolver(
      tripType === 'One_Way' ? oneWaySchema : roundTripSchema
    ),
  });

  const handleSubmit = (values: typeof form.values) => {
    if (
      tripType === 'Round_Trip' &&
      (!values.dateRange?.[0] || !values.dateRange?.[1])
    ) {
      form.setFieldError('dateRange', errors('required_error'));
      return;
    }
    console.log('Trip scheduled:', values);
    console.log('Adults:', Adults);
    console.log('Children:', Children);
  };

  // Format cities for Autocomplete
  const formattedCities = Example_Cities.map((city) => ({
    value: city.id,
    label: `${city.name} - ${city.station}`,
  }));

  // Render Autocomplete option
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
      <div className="flex flex-col gap-12 mt-0 md:pt-5 w-full">
        <div className="flex lg:flex-row flex-col lg:flex-nowrap justify-center items-center gap-2 w-full lg:h-14">
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

          {/* Date Input (One-Way or Round-Trip) */}
          <div className="flex flex-1 w-full">
            {tripType === 'One_Way' ? (
              <DateInput
                label={
                  <p className="font-normal text-[#817C74] text-sm">
                    {t('date')}
                  </p>
                }
                leftSection={<Calendar size={16} className="text-[#B9B5B1]" />}
                placeholder={t('date-input-placeholder')}
                classNames={{ input: 'border-1 border-[#DFDEDC]' }}
                className="w-full"
                size="md"
                valueFormat="DD/MM/YYYY"
                {...form.getInputProps('date')}
              />
            ) : (
              <DatePickerInput
                type="range"
                placeholder={t('date-range-input-placeholder')}
                label={
                  <p className="font-normal text-[#817C74] text-sm">
                    {t('date')}
                  </p>
                }
                leftSection={<Calendar size={16} className="text-[#B9B5B1]" />}
                classNames={{ input: 'border-1 border-[#DFDEDC]' }}
                className="w-full"
                size="md"
                valueFormat="DD/MM/YYYY"
                {...form.getInputProps('dateRange')}
              />
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mb-5 lg:-mb-5 rounded-xl w-full lg:w-32 h-full">
        <Button
          className="flex justify-center bg-[#F19A07] shadow-lg w-full text-white"
          h={36}
          w={'100%'}
          type="submit"
          leftSection={<Search size={18} className="" />}
        >
          <Text className="font-medium text-xl">{t('search')}</Text>
        </Button>
      </div>
    </form>
  );
}
