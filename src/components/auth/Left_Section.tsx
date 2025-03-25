'use client';
import React, { useEffect, useState } from 'react';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { usePathname } from '@/i18n/navigation';
import { AUTH_ROUTES } from '@/contents/routes/routes';

export default function Left_Section() {
  const [content, setContent] = useState({ text: '', button: '' });

  const pathname = usePathname();
  const [source, setSource] = useQueryState('source', { defaultValue: '' });

  const t = useTranslations('Auth');

  useEffect(() => {
    if (pathname === AUTH_ROUTES.AUTH) {
      setContent({
        text: t('left_section.auth.text'),
        button: t('left_section.auth.button'),
      });
      return;
    } else if (
      source == t('left_section.source') ||
      pathname == AUTH_ROUTES.FORGET_PASSWORD
    ) {
      setContent({
        text: t('left_section.forget_password.text'),
        button: t('left_section.forget_password.button'),
      });
      return;
    } else if (
      pathname == AUTH_ROUTES.SIGN_UP ||
      pathname == AUTH_ROUTES.LOGIN ||
      pathname == AUTH_ROUTES.OTP ||
      pathname == AUTH_ROUTES.CREATE_NEW_PASSWORD
    ) {
      setContent({
        text: t('left_section.sign_in.text'),
        button: t('left_section.sign_in.button'),
      });
      return;
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center lg:h-[100vh]">
      <div className="flex flex-col justify-start items-start gap-7 px-10 md:px-0">
        <p className="w-[270px] md:w-[450px] lg:w-[387px] font-medium text-white md:text-[38px] lg:text-[45px] text-3xl text-start leading-10">
          {content.text}
        </p>
        <div className="flex flex-row justify-between items-center bg-transparent px-4 py-2 border-[#757474] border-[1px] rounded-lg w-full md:w-[450px] lg:w-[414px] h-[43px] lg:h-[39px] text-white transition-colors duration-300">
          <p className="font-bold text-[16px]">{content.button}</p>
          <MoveRight strokeWidth={1} className="rtl:rotate-180" />
        </div>
      </div>
    </div>
  );
}
