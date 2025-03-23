'use client';
import { Link } from '@/i18n/navigation';
import { Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { cn } from '@/utility/cn';
import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { AUTH_ROUTES } from '@/contents/routes/routes';

export default function Login() {
  const errors = useTranslations('errors');
  const t = useTranslations('Auth.login');

  // Define the form schema
  const loginSchema = z.object({
    email: z
      .string({ required_error: errors('required_error') })
      .email(errors('Invalid_email')),
    password: z
      .string({ required_error: errors('required_error') })
      .min(6, errors('Invalid_password_format')),
  });

  type loginType = z.infer<typeof loginSchema>;

  const form = useForm<loginType>({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: zodResolver(loginSchema),
  });

  const [type] = useQueryState('type', { defaultValue: 'provider' });
  const [error, setError] = useState('');

  const handleSubmit = form.onSubmit((data: loginType) => {
    try {
      console.log('🚀 ~ handleSubmit ~ data:', data);
    } catch (error: any) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      setError(error?.message as string);
    }
  });

  return (
    <>
      {/* Desktop & Mobile */}
      <div className="flex flex-col items-center gap-10 bg-white lg:pt-16 pb-5 rounded-xl w-full lg:w-[550px] h-full">
        <p className="font-medium text-2xl md:text-4xl text-center">
          {t('title')} 👋
        </p>

        <div className="flex flex-col justify-center items-center gap-5">
          <form
            className="flex flex-col items-center gap-0"
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

            {/*  password */}
            <PasswordInput
              label={
                <p className="font-medium text-[#817C74] text-xs">
                  {t('inputs.password.text')}
                </p>
              }
              placeholder={t('inputs.password.placeholder')}
              className="mt-5 border-[#DFDEDC] border-w-1 focus:border-none outline-none w-[343px] md:w-[400px]"
              key={form.key('password')}
              {...form.getInputProps('password')}
              classNames={{
                error: 'w-full text-end text-[#FD6265] font-normal text-sm',
              }}
            />

            <div className="flex flex-row items-center w-full">
              <Link
                href={AUTH_ROUTES.FORGET_PASSWORD}
                className="font-normal text-[#F19A07] text-sm"
              >
                {t('forget_password')}
              </Link>
            </div>

            <Button
              loading={form.submitting}
              type="submit"
              className={cn(
                'mt-8 w-56 bg-[#F19A07] text-white shadow-lg max-lg:mt-10',
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
          <div className="flex flex-row items-center w-full">
            <span className="flex-1 bg-[#DFDEDC] w-full h-[1px]"></span>
            <span className="mx-2 font-medium text-[#817C74]">{t('or')}</span>
            <span className="flex-1 bg-[#DFDEDC] w-full h-[1px]"></span>
          </div>

          <div className="font-medium text-[#817C74] text-sm">
            {t('dont_have_account')}{' '}
            <Link href={AUTH_ROUTES.SIGN_UP} className="text-[#F19A07]">
              {t('sign_up')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
