"use client"
import React, { useEffect, useState } from 'react'
import { MoveRight } from "lucide-react"
import { useTranslations } from 'next-intl'
import { useQueryState } from 'nuqs'
import { usePathname } from '@/i18n/navigation'

export default function Left_Section() {
  const [content, setContent] = useState({ text: "", button: "" })

  const pathname = usePathname()
  const [source, setSource] = useQueryState('source')

  const t = useTranslations("Auth")

  useEffect(() => {

    if (pathname === t("routes.auth")) {
      setContent({ text: t("auth.text"), button: t("auth.button") })
      return
    }
    else if (
      source == t("left_section.source") ||
      pathname == t("routes.forget-password")
    ) {
      setContent({
        text: t("left_section.forget_password.text"),
        button: t("left_section.forget_password.button"),
      })
      return
    }
    else if (
      pathname == t("routes.sign-in") ||
      pathname == t("routes.login") ||
      pathname == t("routes.otp") ||
      pathname == t("routes.create-new-password")
    ) {
      setContent({ text: t("left_section.sign_in.text"), button: t("left_section.sign_in.button") })
      return
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center lg:h-[100vh]">
      <div className="flex flex-col items-start justify-start gap-7 px-10 md:px-0">
        <p className="w-[270px] text-start text-3xl font-medium leading-10 text-white md:w-[450px] md:text-[38px] lg:w-[387px] lg:text-[45px]">
          {content.text}
        </p>
        <div className="flex h-[43px] w-full flex-row items-center justify-between rounded-lg border-[1px] border-[#757474] bg-transparent px-4 py-2 text-white transition-colors duration-300 md:w-[450px] lg:h-[39px] lg:w-[414px]">
          <p className="text-[16px] font-bold">{content.button}</p>
          <MoveRight strokeWidth={1} className="rtl:rotate-180" />
        </div>
      </div>
    </div>
  )
}
