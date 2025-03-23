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
      <div className="flex flex-col items-center gap-16 bg-white lg:pt-16 pb-5 rounded-xl w-full lg:w-[550px] h-full">
        <p className="font-medium text-2xl md:text-4xl text-center">
          {t('title')} 👋
        </p>

        <div className="flex flex-col justify-center items-center gap-5">
          <form
            className="flex flex-col items-center gap-10"
            onSubmit={handleSubmit}
          >
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
          <div className="flex flex-row items-center mt-7 w-full">
            <span className="flex-1 bg-[#DFDEDC] w-full h-[1px]"></span>
            <span className="mx-2 font-medium text-[#817C74]">{t('or')}</span>
            <span className="flex-1 bg-[#DFDEDC] w-full h-[1px]"></span>
          </div>

          <div className="mt-5 font-medium text-[#817C74] text-sm">
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
