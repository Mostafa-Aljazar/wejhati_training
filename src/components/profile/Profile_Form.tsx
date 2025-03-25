'use client';

import {
  Box,
  Button,
  Flex,
  Modal,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, useRef, useEffect } from 'react';
import { z } from 'zod';
// import OTPForm from './OTP_Form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import default styles
import { useTranslations } from 'next-intl';
import OTP_Form from './OTP_Form';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { PLATFORM_ROUTES } from '@/contents/routes/routes';

export default function ProfileForm() {
  const errors = useTranslations('errors');
  const t = useTranslations('platform.profile.my-profile.form');

  const schema = z.object({
    firstName: z
      .string({ required_error: errors('required_error') })
      .min(2, { message: errors('Invalid_input_more_2') }),
    lastName: z
      .string({ required_error: errors('required_error') })
      .min(2, { message: errors('Invalid_input_more_2') }),
    passportNumber: z
      .string({ required_error: errors('required_error') })
      .min(6),
    mobileNumber: z
      .string({ required_error: errors('required_error') })
      .refine(isValidPhoneNumber, { message: 'Mobile number is Invalid' }) // Use imported isValidPhoneNumber
      .transform((val) => (val === '' ? undefined : val)),
    email: z
      .string({ required_error: errors('required_error') })
      .email({ message: errors('Invalid_email_format') }),
  });

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      passportNumber: '',
      mobileNumber: '', // Initialize as empty string for PhoneInput
      email: '',
    },
    validate: zodResolver(schema),
  });

  const [query, setQuery] = useQueryStates(
    {
      email: parseAsString.withDefault(''),
      callback: parseAsString.withDefault('/'),
      date: parseAsInteger.withDefault(Date.now()),
    },
    { shallow: true }
  );

  const mobile = useRef('');

  const [opened, { open, close }] = useDisclosure(false);

  const handleSubmit = form.onSubmit((values: typeof form.values) => {
    mobile.current = values.mobileNumber;
    setQuery({
      email: values.email,
      callback: PLATFORM_ROUTES.PROFILE,
      date: Date.now(),
    });
    open();
  });

  const [operation, setOperation] = useState<'Edit' | 'Add'>('Add');

  useEffect(() => {
    const fetchNumber = async () => {
      let num = await (async function getNumber() {
        return null;
      })();
      num ? setOperation('Edit') : setOperation('Add');
    };
    fetchNumber();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <Flex
          direction="column"
          align="center"
          justify="center"
          bg={{ base: 'transparent', md: 'white' }}
          gap={{ base: 10, lg: 20 }}
          w="100%"
          px={{ base: 20, lg: 100 }}
          pb={{ base: 28, lg: 24 }}
          pt={{ base: 28, lg: 50 }}
          className="shadow-md md:rounded-lg"
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: 10, lg: 30 }}
            w={'100%'}
          >
            <Flex direction="row" gap={{ base: 8, md: 16 }} w={'100%'}>
              <TextInput
                label={
                  <Text c={'#817C74'} fw={'normal'} fz={'sm'}>
                    {t('first-name.label')}
                  </Text>
                }
                placeholder={t('first-name.placeholder')}
                {...form.getInputProps('firstName')}
                w={'100%'}
              />
              <TextInput
                label={
                  <Text c={'#817C74'} fw={'normal'} fz={'sm'}>
                    {t('last-name.label')}
                  </Text>
                }
                placeholder={t('last-name.placeholder')}
                {...form.getInputProps('lastName')}
                w={'100%'}
              />
            </Flex>
            <TextInput
              label={
                <Text c={'#817C74'} fw={'normal'} fz={'sm'}>
                  {t('passport-number.label')}
                </Text>
              }
              placeholder={t('passport-number.placeholder')}
              {...form.getInputProps('passportNumber')}
              w={'100%'}
            />
          </Flex>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 10, lg: 30 }}
            w={'100%'}
          >
            <Stack justify="center" align="start" gap={8} w={'100%'}>
              <Text c={'#817C74'} fw={'normal'} fz={'sm'}>
                {t('mobile-number.label')}
              </Text>

              <Box dir="ltr" className="w-full">
                <PhoneInput
                  className="flex flex-row justify-center items-start w-full"
                  name="mobileNumber"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="SA"
                  inputComponent={TextInput}
                  key={form.key('mobileNumber')}
                  {...form.getInputProps('mobileNumber')}
                />
              </Box>
              <Text c={'#817C74'} fw={'normal'} fz={'sm'}>
                {t('mobile-number.hint')}
              </Text>
            </Stack>
            <Stack justify="start" align="start" gap={8} w={'100%'}>
              <TextInput
                label={
                  <Text c={'#817C74'} fw={'normal'} fz={'sm'}>
                    {t('email.label')}
                  </Text>
                }
                type="email"
                placeholder={t('email.placeholder')}
                {...form.getInputProps('email')}
                className="w-full"
              />
              <Text c={'#817C74'} fw={'normal'} fz={'sm'}>
                {t('email.hint')}
              </Text>
            </Stack>
          </Flex>
          <Button
            w={{ base: '100%', md: 200 }}
            h={40}
            type="submit"
            className="bg-[#F19A07] hover:bg-[#e08e06] shadow-md rounded-md w-full md:w-52 h-10 md:h-12 text-white"
          >
            {t(operation === 'Edit' ? 'edit' : 'add')}
          </Button>
        </Flex>
      </form>

      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="auto"
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: '8px',
        }}
        classNames={{ root: 'bg-red-500' }}
      >
        <OTP_Form onSuccess={close} operation={operation} />
      </Modal>
    </>
  );
}
