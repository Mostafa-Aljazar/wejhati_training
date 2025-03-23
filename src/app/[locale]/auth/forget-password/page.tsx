'use client';
import React, { useState } from 'react';
import { Button, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/utility/cn';
import { AUTH_ROUTES } from '@/contents/routes/routes';

export default function Forget_Password() {
  const errors = useTranslations('errors');

  const t = useTranslations('Auth.forget_password');

  const emailSchema = z.object({
    email: z
      .string({ required_error: errors('required_error') })
      .email(errors('Invalid_email')),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '' },
    validate: zodResolver(emailSchema),
  });

  const [error, setError] = useState('');
  const Router = useRouter();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      Router.push(
        `/auth/otp?email=${encodeURIComponent(values.email)}&date=${encodeURIComponent(
          Date.now(),
        )}&callback=${encodeURIComponent(AUTH_ROUTES.CREATE_NEW_PASSWORD)}`,
      );
    } catch (error: any) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
      setError(error.message);
    }
  });

  return (
    <>
      {/* Desktop  & Mobile */}
      <div className="flex flex-col items-center gap-10 bg-white lg:pt-16 pb-5 rounded-xl w-full lg:w-[550px] h-full">
        <p className="font-medium text-black text-2xl md:text-3xl text-center">
          {t('title')}
        </p>
        <p className="mx-auto mt-2 w-full max-w-96 font-normal text-[#817C74] text-xs md:text-sm text-center">
          {t('text')}
        </p>

        <div className="flex flex-col justify-center items-center gap-5">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            {/* Email Id */}
            <TextInput
              label={
                <p className="font-medium text-[#817C74] text-xs">
                  {t('inputs.email.text')}
                </p>
              }
              placeholder={t('inputs.email.placeholder')}
              className="border-[#DFDEDC] border-w-1 focus:border-none outline-none w-[343px] md:w-[400px]"
              key={form.key('email')}
              {...form.getInputProps('email')}
              classNames={{
                error: 'w-full text-end text-[#FD6265] font-normal text-sm',
              }}
            />
            <Button
              loading={form.submitting}
              type="submit"
              className={cn('mt-14 w-56 bg-[#F19A07] text-white shadow-lg')}
              w={228}
            >
              {t('button')}
            </Button>
            {error ? (
              <Text fw={'500'} mt={'sm'} size="sm" ta="center" c={'red'}>
                {error}
              </Text>
            ) : null}
          </form>
          <div className="flex flex-row items-center w-full">
            <span className="flex-1 bg-[#DFDEDC] w-full h-[1px]"></span>
            <span className="mx-4 font-medium text-[#817C74]">{t('or')}</span>
            <span className="flex-1 bg-[#DFDEDC] w-full h-[1px]"></span>
          </div>

          <div className="font-medium text-sm">
            {t('have_account')}{' '}
            <Link href={AUTH_ROUTES.LOGIN} className="text-[#F19A07]">
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
