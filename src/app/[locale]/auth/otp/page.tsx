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
    { shallow: true },
  );

  const [seconds, setSeconds] = useState(() =>
    Math.max(60 - Math.floor((Date.now() - query.date) / 1000), 0),
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
      }),
    ),
  });

  // Timer effect
  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(
        () => setSeconds((prev) => (prev > 1 ? prev - 1 : 0)),
        1000,
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
    <div className=" h-full flex-col items-center justify-start bg-white lg:pt-16  md:justify-center md:rounded-[12px] lg:flex lg:w-[550px]">
      <p className="text-2xl lg:text-3xl text-center font-medium">
        {t('title')}
      </p>
      <p className="mt-3 w-[345px] text-center text-sm font-normal text-[#817C74]">
        {t('text')} <span>{query.email}</span>
      </p>

      <form
        className="mt-16 flex w-full flex-col items-center justify-center"
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
            <span className="text-sm font-normal text-[#FD6265]">
              {errors('Time_out')}
            </span>
          )}
        </div>

        {seconds > 0 && (
          <div className="border-1 mt-10 flex w-24 flex-row justify-center gap-1 rounded-xl border-[#5F6F52] p-1 text-[#5F6F52]">
            <Timer />
            <span>
              {`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}
            </span>
          </div>
        )}

        {!seconds && (
          <Button
            className="mt-10 flex w-fit flex-col gap-0 hover:bg-transparent"
            variant="subtle"
            onClick={handleResend}
            disabled={isLoading}
          >
            <span className="text-base font-semibold text-[#F19A07] underline">
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
              : 'bg-[#F19A07]',
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
