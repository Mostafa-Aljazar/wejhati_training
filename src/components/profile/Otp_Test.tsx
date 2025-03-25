'use client';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/utility/cn';
import { Button, PinInput, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Timer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export default function OTP() {
  const errors = useTranslations('errors');
  const t = useTranslations('Auth.otp');

  const router = useRouter();

  const [query, setQuery] = useQueryStates(
    {
      email: parseAsString.withDefault(''),
      callback: parseAsString.withDefault('/'),
      date: parseAsInteger.withDefault(Date.now()),
    },
    { shallow: true }
  );

  const [seconds, setSeconds] = useState(() =>
    Math.max(60 - Math.floor((Date.now() - query.date) / 1000), 0)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: { otp: '' },
    validate: zodResolver(
      z.object({
        otp: z
          .string()
          .length(4, errors('Invalid_otp'))
          .regex(/^\d{4}$/, errors('Invalid_otp')),
      })
    ),
  });

  // Timer effect
  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(
        () => setSeconds((prev) => (prev > 1 ? prev - 1 : 0)),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [seconds]);

  // Handlers
  const handleSubmit = form.onSubmit(async (data) => {
    setIsLoading(true);
    setError('');
    try {
      // Add OTP verification API call here
      router.push(query.callback);
    } catch (err: any) {
      setError(err.message || errors('Invalid_otp'));
    } finally {
      setIsLoading(false);
    }
  });

  const handleResend = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Add OTP resend API call here
      const newDate = Date.now();
      setQuery({ date: newDate });
      setSeconds(60);
      form.reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Time formatting
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="lg:flex flex-col justify-start md:justify-center items-center bg-white lg:pt-16 md:rounded-[12px] lg:w-[550px] h-full">
      <p className="font-medium text-2xl lg:text-3xl text-center">
        {t('title')}
      </p>
      <p className="mt-3 w-[345px] font-normal text-[#817C74] text-sm text-center">
        {t('text')} <span>{query.email}</span>
      </p>

      <form
        className="flex flex-col justify-center items-center mt-16 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-3">
          <PinInput
            type="number"
            size="md"
            length={4}
            placeholder=""
            classNames={{
              root: 'gap-5',
              input: 'border-1 border-[#DFDEDC] w-12 h-12 rounded-lg',
            }}
            {...form.getInputProps('otp')}
          />
          {!seconds && (
            <span className="font-normal text-[#FD6265] text-sm">
              {errors('Time_out')}
            </span>
          )}
        </div>

        {seconds > 0 && (
          <div className="flex flex-row justify-center gap-1 mt-10 p-1 border-[#5F6F52] border-1 rounded-xl w-24 text-[#5F6F52]">
            <Timer />
            <span>
              {`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}
            </span>
          </div>
        )}

        {!seconds && (
          <Button
            className="flex flex-col gap-0 hover:bg-transparent mt-10 w-fit"
            variant="subtle"
            onClick={handleResend}
            disabled={isLoading}
          >
            <span className="font-semibold text-[#F19A07] text-base underline">
              {t('resend')}
            </span>
          </Button>
        )}

        <Button
          type="submit"
          disabled={!seconds || form.values.otp.length !== 4 || isLoading}
          loading={isLoading}
          className={cn(
            'my-16 w-56 bg-[#F19A07] text-white shadow-lg',
            !seconds || form.values.otp.length !== 4
              ? 'bg-[#F19A0763]'
              : 'bg-[#F19A07]'
          )}
          w={228}
        >
          {t('button')}
        </Button>

        {error && (
          <Text fw={500} mt="sm" size="sm" ta="center" c="red">
            {error}
          </Text>
        )}
      </form>
    </div>
  );
}
