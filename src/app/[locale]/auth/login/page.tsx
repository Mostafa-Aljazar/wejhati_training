"use client"
import { Link } from '@/i18n/navigation'
import { Button, PasswordInput, Text, TextInput } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { z } from "zod"
import { useForm, zodResolver } from "@mantine/form"
import { cn } from '@/utility/cn'
import { useState } from 'react'
import { useQueryState } from 'nuqs'

export default function Login() {
  const errors = useTranslations("errors")
  const t = useTranslations("Auth")

  // Define the form schema
  const loginSchema = z.object({
    email: z.string({ required_error: errors("required_error") }).email(errors("Invalid_email")),
    password: z
      .string({ required_error: errors("required_error") })
      .min(6, errors("Invalid_password_format")),
  })

  type loginType = z.infer<typeof loginSchema>

  const form = useForm<loginType>({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
    validate: zodResolver(loginSchema),
  })

  const [type] = useQueryState('type', { defaultValue: 'provider' })
  const [error, setError] = useState("");

  const handleSubmit = form.onSubmit( (data: loginType) => {
    try {
      console.log("🚀 ~ handleSubmit ~ data:", data);

    } catch (error:any) {
      console.log("🚀 ~ onSubmit ~ error:", error); 
      setError(error?.message as string)
    }
  })

  return (
    <>
      {/* Desktop & Mobile */}
      <div className="gap-10 flex  w-full h-full flex-col items-center rounded-xl bg-white lg:pt-16 pb-5 lg:w-[550px]">
        <p className="text-2xl font-medium md:text-4xl text-center">{t("login.title")} 👋</p>

        <div className="gap-5 flex flex-col items-center justify-center">
          <form className="gap-0 flex flex-col items-center" onSubmit={handleSubmit}>
            {/* Email Id */}
            <TextInput
              label={<p className="text-xs font-medium text-[#817C74]">{t("login.inputs.email.text")}</p>}
              placeholder={t("login.inputs.email.placeholder")}
              className="border-w-1 w-[343px] border-[#DFDEDC] outline-none focus:border-none md:w-[400px]"
              key={form.key("email")}
              {...form.getInputProps("email")}
              classNames={{
                error: "w-full text-end text-[#FD6265] font-normal text-sm",
              }}
            />

            {/*  password */}
            <PasswordInput
              label={<p className="text-xs font-medium text-[#817C74]">{t("login.inputs.password.text")}</p>}
              placeholder={t("login.inputs.password.placeholder")}
              className="border-w-1 mt-5 w-[343px] border-[#DFDEDC] outline-none focus:border-none md:w-[400px]"
              key={form.key("password")}
              {...form.getInputProps("password")}
              classNames={{
                error: "w-full text-end text-[#FD6265] font-normal text-sm",
              }}
            />

            <div className=" flex w-full flex-row items-center">
              <Link href={t('routes.forget-password')} className="text-sm font-normal text-[#F19A07]">
                {t("login.forget_password")}
              </Link>
            </div>

            <Button
              loading={form.submitting}
              type="submit"
              className={cn("mt-8 w-56 bg-[#F19A07] text-white shadow-lg max-lg:mt-10")}
              w={228}>
              {t("login.button")}
            </Button>
            {error ? (
              <Text fw={"500"} mt={"sm"} size="sm" ta="center" c={"red"}>
                {error}
              </Text>
            ) : null}
          </form>
          <div className=" flex w-full flex-row items-center">
            <span className="h-[1px] w-full flex-1 bg-[#DFDEDC]"></span>
            <span className="mx-2 font-medium text-[#817C74]">{t("login.or")}</span>
            <span className="h-[1px] w-full flex-1 bg-[#DFDEDC]"></span>
          </div>

          <div className="text-sm font-medium text-[#817C74]">
            {t("login.dont_have_account")}{" "}
            <Link href={t('routes.sign-up')} className="text-[#F19A07]">
              {t("login.sign_up")}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
