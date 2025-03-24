'use client';
import { Button, Flex, Text, TextInput } from '@mantine/core';
import { Search } from 'lucide-react';
import React from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';

export default function Booking_Form() {
  const tGen = useTranslations('general');

  const errors = useTranslations('errors'); // For translations
  const t = useTranslations('platform.my-tickets.booking-enquiry');

  const searchSchema = z.object({
    ticket_id: z.string().min(1, { message: errors('required_error') }),
    mobile_number: z.string().min(1, { message: errors('required_error') }),
  });

  const form = useForm({
    initialValues: {
      ticket_id: '',
      mobile_number: '',
    },
    validate: zodResolver(searchSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('🚀 ~ Booking_Form ~ values:', values);
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col items-center gap-5 px-2 w-full h-full"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify={'center'}
        align={'center'}
        w={'100%'}
        gap={10}
      >
        {/* Ticket ID */}
        <div className="flex flex-wrap w-80 max-w-[340px]">
          <TextInput
            label={
              <p className="font-normal text-[#817C74] text-sm">
                {t('search.inputs.ticket_id.label')}
              </p>
            }
            placeholder={t('search.inputs.ticket_id.placeholder')}
            size="md"
            classNames={{ input: 'border-1 border-[#DFDEDC]' }}
            className="w-full"
            {...form.getInputProps('ticket_id')}
          />
        </div>
        {/* Mobile number */}
        <div className="flex flex-wrap w-80 lg:w-[340px]">
          <TextInput
            label={
              <p className="font-normal text-[#817C74] text-sm">
                {t('search.inputs.mobile_number.label')}
              </p>
            }
            placeholder={t('search.inputs.mobile_number.placeholder')}
            size="md"
            classNames={{ input: 'border-1 border-[#DFDEDC]' }}
            className="w-full"
            {...form.getInputProps('mobile_number')}
          />
        </div>
      </Flex>

      {/* Submit Button */}
      <div className="mb-3 md:-mb-[18px] rounded-xl w-full md:w-32 h-full">
        <Button
          className="flex justify-center bg-[#F19A07] shadow-lg w-full text-white"
          h={36}
          w={'100%'}
          type="submit"
          leftSection={<Search size={18} className="" />}
        >
          <Text className="font-medium text-xl">{tGen('search')}</Text>
        </Button>
      </div>
    </form>
  );
}
