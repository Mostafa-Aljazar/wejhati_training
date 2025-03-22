'use client';
import { Autocomplete, AutocompleteProps, Button } from '@mantine/core';
import { ArrowRightLeft, Calendar, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { DateInput } from '@mantine/dates';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Target_Arrow } from '@/assets/about_us';
import { Example_Cities } from '@/contents/common/cities';

const schema = z
  .object({
    departure: z.string().min(1, { message: 'Departure is required' }),
    arrival: z.string().min(1, { message: 'Arrival is required' }),
    date: z.date({ message: 'Date is required' }),
  })
  .refine((data) => data.departure !== data.arrival, {
    message: 'Arrival station cannot be the same as Departure station',
    path: ['arrival'],
  });

type Props = {
  Children: Number;
  Adults: Number;
};
export default function One_Way_Form({ Children, Adults }: Props) {
  const form = useForm({
    initialValues: {
      departure: '',
      arrival: '',
      date: null,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Trip scheduled:', values);
    console.log('🚀 ~ One_Way_Form ~ Adults:', Adults);
    console.log('🚀 ~ One_Way_Form ~ Children:', Children);
  };

  const formattedCities = Example_Cities.map((city) => ({
    value: city.id,
    label: `${city.name} - ${city.station}`, // Display text
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
            <DateInput
              label={
                <p className="font-normal text-[#817C74] text-sm">
                  Date of journey
                </p>
              }
              leftSection={<Calendar size={16} className="text-[#B9B5B1]" />}
              placeholder="Pick a date"
              classNames={{ input: 'border-1 border-[#DFDEDC]' }}
              className="w-full"
              size="md"
              {...form.getInputProps('date')}
              valueFormat="DD/MM/YYYY"
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
