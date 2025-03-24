import { GET_CONTACT_US_TABS } from '@/contents/contact-us';
import { User_Type } from '@/contents/home';
import { Button, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';

export default function Contact_Us_Form() {
  const t = useTranslations('platform.contact-us');
  const Contact_Us_Tabs = GET_CONTACT_US_TABS(t);
  const [guard] = useQueryState(
    'type',
    parseAsString.withDefault(User_Type.User)
  );

  const [tab] = useQueryState(
    'tab',
    parseAsString.withDefault(Contact_Us_Tabs.Send_Enquiries)
  );

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      booking_code_number: '',
      provider_code_number: '',
      bank: {
        IBAN: '',
        bank_name: '',
        account_name: '',
      },
    },
  });

  const [error, setError] = useState('');
  const handleSubmit = form.onSubmit(async (data) => {
    console.log('🚀 ~ Form ~ data:', data);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full"
    >
      <div className="flex md:flex-row flex-col justify-center items-center gap-6 px-4 lg:px-16 pb-8 border-[#DFDEDC] border-b-[1px] w-full">
        <TextInput
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          required
          withAsterisk={false}
          className="flex-1 w-full"
          labelProps={{
            c: 'text',
            className: '!text-sm',
          }}
          {...form.getInputProps('name')}
        />
        <TextInput
          label={t('form.email.label')}
          placeholder={t('form.email.placeholder')}
          required
          withAsterisk={false}
          className="flex-1 w-full"
          type="email"
          labelProps={{
            c: 'text',
            className: '!text-sm',
          }}
          {...form.getInputProps('email')}
        />
      </div>
      <div className="flex md:flex-row flex-col justify-center items-center gap-6 mt-4 lg:mt-6 px-4 lg:px-16 w-full">
        <TextInput
          label={t('form.subject.label')}
          placeholder={t('form.subject.placeholder')}
          required
          withAsterisk={false}
          className="flex-1 w-full"
          labelProps={{
            c: 'text',
            className: '!text-sm',
          }}
          {...form.getInputProps('subject')}
        />
        {guard == User_Type.User ? (
          <TextInput
            label={t('form.booking_code_number.label')}
            placeholder={t('form.booking_code_number.placeholder')}
            className="flex-1 w-full"
            labelProps={{
              c: 'text',
              className: '!text-sm',
            }}
            {...form.getInputProps('booking_code_number')}
          />
        ) : null}
        {guard == User_Type.Provider ? (
          <TextInput
            label={t('form.provider_code_number.label')}
            placeholder={t('form.provider_code_number.placeholder')}
            className="flex-1 w-full"
            labelProps={{
              c: 'text',
              className: '!text-sm',
            }}
            {...form.getInputProps('provider_code_number')}
          />
        ) : null}
      </div>
      <div className="mt-6 px-4 lg:px-16 w-full">
        <Textarea
          autosize
          minRows={5}
          label={t('form.message.label')}
          placeholder={t('form.message.placeholder')}
          required
          withAsterisk={false}
          className="flex-1 w-full"
          labelProps={{
            c: 'text',
            className: '!text-sm',
          }}
          {...form.getInputProps('message')}
        />
      </div>
      {/* Bank Details Section */}
      {tab === Contact_Us_Tabs.Refund_Request ? (
        <div className="mt-6 px-4 lg:px-16 w-full">
          <p className="font-semibold text-[#2B261E] text-base">
            {t('form.bank.title')}
          </p>
          <span className="mt-2 font-normal text-[#817C74] text-xs">
            {t('form.bank.description')}
          </span>
          <div className="flex md:flex-row flex-col gap-6 mt-5">
            <TextInput
              required
              withAsterisk={false}
              label={t('form.bank.IBAN.label')}
              placeholder={t('form.bank.IBAN.placeholder')}
              className="flex-1 w-full"
              {...form.getInputProps('bank.IBAN')}
            />
            <TextInput
              required
              withAsterisk={false}
              label={t('form.bank.bank_name.label')}
              placeholder={t('form.bank.bank_name.placeholder')}
              className="flex-1 w-full"
              labelProps={{
                c: 'text',
                className: '!text-sm',
              }}
              {...form.getInputProps('bank.bank_name')}
            />
          </div>
          <div className="mt-6">
            <TextInput
              required
              withAsterisk={false}
              label={t('form.bank.account_name.label')}
              placeholder={t('form.bank.account_name.placeholder')}
              className="flex-1 w-full"
              labelProps={{
                c: 'text',
                className: '!text-sm',
              }}
              {...form.getInputProps('bank.account_name')}
            />
          </div>
        </div>
      ) : null}
      {/* End Bank Details Section */}
      <Button
        loading={form.submitting}
        type="submit"
        className="bg-[#F19A07] shadow-lg my-10 text-white"
        w={218}
      >
        {t('form.submit')}
      </Button>
      {error ? (
        <Text fw={'500'} size="sm" ta="center" c={'red'}>
          {error}
        </Text>
      ) : null}
    </form>
  );
}
