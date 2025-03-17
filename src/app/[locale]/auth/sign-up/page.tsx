'use client';
import { Link, useRouter } from '@/i18n/navigation';
import { Button, Text, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { cn } from '@/utility/cn';
import { useState } from 'react';
import { AUTH_ROUTES } from '@/contents/routes/routes';

export default function Sign_Up() {
  const errors = useTranslations('errors');
  const t = useTranslations('Auth.sign_up');

  // Define the form schema
  const signup_Schema = z.object({
    email: z
      .string({ required_error: errors('required_error') })
      .email(errors('Invalid_email')),
  });

  type signup_Type = z.infer<typeof signup_Schema>;

  const form = useForm<signup_Type>({
    mode: 'uncontrolled',
    initialValues: { email: '' },
    validate: zodResolver(signup_Schema),
  });

  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = form.onSubmit(async (data: signup_Type) => {
    try {
      console.log('🚀 ~ handleSubmit ~ data:', data);

      router.push(
        `${AUTH_ROUTES.OTP}?email=${encodeURIComponent(data.email)}&date=${encodeURIComponent(
          Date.now(),
        )}&callback=${encodeURIComponent(AUTH_ROUTES.CREATE_NEW_PASSWORD)}`,
      );
    } catch (error: any) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      setError(error?.message as string);
    }
  });

  return (
    <>
      {/* Desktop & Mobile */}
      <div className="gap-16 flex  w-full h-full flex-col items-center rounded-xl bg-white lg:pt-16 pb-5 lg:w-[550px]">
        <p className="text-2xl font-medium md:text-4xl text-center">
          {t('title')} 👋
        </p>

        <div className="gap-5 flex flex-col items-center justify-center">
          <form
            className="gap-10 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            {/* Email Id */}
            <TextInput
              label={
                <p className="text-xs font-medium text-[#817C74]">
                  {t('inputs.email.text')}
                </p>
              }
              placeholder={t('inputs.email.placeholder')}
              className="border-w-1 w-[343px] border-[#DFDEDC] outline-none focus:border-none md:w-[400px]"
              key={form.key('email')}
              {...form.getInputProps('email')}
              classNames={{
                error: 'w-full text-end text-[#FD6265] font-normal text-sm',
              }}
            />

            <Button
              loading={form.submitting}
              type="submit"
              className={cn(
                'w-56 bg-[#F19A07] text-white shadow-lg max-lg:mt-10',
              )}
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
          <div className="mt-7 flex w-full flex-row items-center">
            <span className="h-[1px] w-full flex-1 bg-[#DFDEDC]"></span>
            <span className="mx-2 font-medium text-[#817C74]">{t('or')}</span>
            <span className="h-[1px] w-full flex-1 bg-[#DFDEDC]"></span>
          </div>

          <div className="mt-5 text-sm font-medium text-[#817C74]">
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
