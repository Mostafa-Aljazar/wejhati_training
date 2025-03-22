'use client';

import { Autocomplete, AutocompleteProps, Button } from '@mantine/core';
import { ArrowRightLeft, Calendar, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { DatePickerInput } from '@mantine/dates';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Target_Arrow } from '@/assets/about_us';
import { Example_Cities } from '@/contents/common/cities';

const schema = z
  .object({
    departure: z.string().min(1, { message: 'Departure station is required' }),
    arrival: z.string().min(1, { message: 'Arrival station is required' }),
    dateRange: z
      .tuple([
        z.date({ required_error: 'Departure date is required' }),
        z.date({ required_error: 'Return date is required' }),
      ])
      .refine((dates) => dates[0] < dates[1], {
        message: 'Return date must be after departure date',
        path: [1],
      }),
  })
  .refine((data) => data.departure !== data.arrival, {
    message: 'Arrival station cannot be the same as Departure station',
    path: ['arrival'],
  });

type Props = {
  Children: Number;
  Adults: Number;
};
export default function Round_Way_Form({ Children, Adults }: Props) {
  const form = useForm({
    initialValues: {
      departure: '',
      arrival: '',
      dateRange: [null, null] as [Date | null, Date | null],
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: typeof form.values) => {
    // Ensure dateRange is valid before submitting
    if (!values.dateRange[0] || !values.dateRange[1]) {
      form.setFieldError('dateRange', 'Please select a valid date range');
      return;
    }
    console.log('Trip scheduled:', values);
    console.log('🚀 ~ Round_Way_Form ~ Adults:', Adults);
    console.log('🚀 ~ Round_Way_Form ~ Children:', Children);
  };

  const formattedCities = Example_Cities.map((city) => ({
    value: city.id,
    label: `${city.name} - ${city.station}`,
  }));

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = (
    input,
  ) => {
    const { option } = input as { option: { value: string; label: string } };
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
                    Departure
                  </p>
                }
                placeholder="Where From?"
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

            {/* Arrival stations */}
            <div className="flex w-full">
              <Autocomplete
                label={
                  <p className="font-normal text-[#817C74] text-sm">
                    Arrival stations
                  </p>
                }
                placeholder="Where to?"
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

          {/* Date of journey */}
          <div className="flex flex-1 w-full">
            <DatePickerInput
              type="range"
              placeholder="Pick dates range"
              label={
                <p className="font-normal text-[#817C74] text-sm">
                  Date of journey
                </p>
              }
              leftSection={<Calendar size={16} className="text-[#B9B5B1]" />}
              classNames={{ input: 'border-1 border-[#DFDEDC]' }}
              className="w-full"
              size="md"
              valueFormat="DD/MM/YYYY"
              {...form.getInputProps('dateRange')}
            />
          </div>
        </div>
      </div>

      <div className="mb-5 lg:-mb-5 rounded-xl w-full lg:w-32 h-full">
        <Button
          className="flex justify-center bg-[#F19A07] shadow-lg w-full text-white"
          h={36}
          w={'100%'}
          type="submit"
        >
          <Search size={18} className="mr-2" />
          <span className="font-medium text-xl">Search</span>
        </Button>
      </div>
    </form>
  );
}
