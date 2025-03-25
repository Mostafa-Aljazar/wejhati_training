'use client';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/utility/cn';
import { Button, Flex, Group, PinInput, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Timer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';
import { useEffect, useState } from 'react';
import { z } from 'zod';

type OTPProps = {
  onSuccess?: () => void;
  operation?: 'Edit' | 'Add';
};
export default function OTP({ onSuccess, operation }: OTPProps) {
  const errors = useTranslations('errors');
  const t = useTranslations('Auth.otp');

  const router = useRouter();

  const [query, setQuery] = useQueryStates(
    {
      email: parseAsString.withDefault(''),
      callback: parseAsString.withDefault(''),
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

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(
        () => setSeconds((prev) => (prev > 1 ? prev - 1 : 0)),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const handleSubmit = form.onSubmit(async (data) => {
    setIsLoading(true);
    setError('');
    try {
      // Simulate OTP verification API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.otp === '1234') {
        onSuccess && onSuccess();
        router.push(query.callback);
      } else {
        setError(errors('Invalid_otp'));
      }
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
      setError('err.message');
    } finally {
      setIsLoading(false);
    }
  };

  // Time formatting
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <Flex
      direction={'column'}
      justify={{ base: 'start', md: 'center' }}
      align={'center'}
      bg={'white'}
      pt={{ base: 0, lg: 40 }}
      pb={20}
      className="md:rounded-[12px] lg:w-[550px]"
    >
      <Text fw={'500'} fz={{ base: 24, lg: 30 }} ta={'center'}>
        {t('title')}
      </Text>
      <Text
        mt={12}
        maw={345}
        w={'100%'}
        fw={400}
        fz={'sm'}
        c={'#817C74'}
        ta={'center'}
      >
        {t('text')} <span>{query.email}</span>
      </Text>

      <form
        className="flex flex-col justify-center items-center gap-10 mt-16 w-full"
        onSubmit={handleSubmit}
      >
        <Stack align="center" gap={12}>
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
        </Stack>

        {seconds > 0 && (
          <Group
            justify="center"
            gap={4}
            mt={40}
            p={4}
            w={96}
            c={'#5F6F52'}
            className="border-[#5F6F52] border-1 rounded-xl"
          >
            <Timer />
            <Text>
              {`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}
            </Text>
          </Group>
        )}

        {!seconds && (
          <Button
            className="flex flex-col gap-0 hover:bg-transparent mt-10 w-fit"
            variant="subtle"
            onClick={handleResend}
            disabled={isLoading}
          >
            <Text fw={600} fz={16} className="text-primary underline">
              {t('resend')}
            </Text>
          </Button>
        )}

        <Button
          type="submit"
          disabled={!seconds || form.values.otp.length !== 4 || isLoading}
          loading={isLoading}
          className={cn(
            ' w-56 bg-[#F19A07] text-white shadow-lg',
            !seconds || form.values.otp.length !== 4
              ? 'bg-[#F19A0763]'
              : 'bg-[#F19A07]'
          )}
          w={228}
        >
          {t('button')}
        </Button>

        {error && (
          <Text fw={500} size="sm" ta="center" c="red">
            {error}
          </Text>
        )}
      </form>
    </Flex>
  );
}
