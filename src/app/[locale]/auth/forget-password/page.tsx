"use client"
import React, { useState } from "react"
import { Button, Text, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { Link, useRouter } from "@/i18n/navigation"
import { cn } from "@/utility/cn"
import { AUTH_ROUTES } from "../_routes"

export default function Forget_Password() {
  const errors = useTranslations("errors")

  const t = useTranslations("Auth.forget_password")

  const emailSchema = z.object({
    email: z.string({ required_error: errors("required_error") }).email(errors("Invalid_email")),
  })

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "" },
    validate: zodResolver(emailSchema),
  })

  const [error, setError] = useState("")
  const Router = useRouter()

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      Router.push(
        `/auth/otp?email=${encodeURIComponent(values.email)}&date=${encodeURIComponent(
          Date.now()
        )}&callback=${encodeURIComponent(AUTH_ROUTES.CREATE_NEW_PASSWORD)}`
      )
    } catch (error:any) {
      console.log("🚀 ~ handleSubmit ~ error:", error)    
      setError(error.message)
    }
  })

  return (
    <>
      {/* Desktop  & Mobile */}
      <div className="gap-10 flex  w-full h-full flex-col items-center rounded-xl bg-white lg:pt-16 pb-5 lg:w-[550px]">
        <p className="text-2xl font-medium text-black md:text-3xl text-center">{t("title")}</p>
        <p className="mt-2 w-full max-w-96 text-center mx-auto text-xs font-normal text-[#817C74] md:text-sm">
          {t("text")}
        </p>

        <div className="gap-5 flex flex-col items-center justify-center">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            {/* Email Id */}
            <TextInput
              label={<p className="text-xs font-medium text-[#817C74]">{t("inputs.email.text")}</p>}
              placeholder={t("inputs.email.placeholder")}
              className="border-w-1 w-[343px] border-[#DFDEDC] outline-none focus:border-none md:w-[400px]"
              key={form.key("email")}
              {...form.getInputProps("email")}
              classNames={{
                error: "w-full text-end text-[#FD6265] font-normal text-sm",
              }}
            />
            <Button
              loading={form.submitting}
              type="submit"
              className={cn("mt-14 w-56 bg-[#F19A07] text-white shadow-lg")}
              w={228}>
              {t("button")}
            </Button>
            {error ? (
              <Text fw={"500"} mt={"sm"} size="sm" ta="center" c={"red"}>
                {error}
              </Text>
            ) : null}
          </form>
          <div className=" flex w-full flex-row items-center">
            <span className="h-[1px] w-full flex-1 bg-[#DFDEDC]"></span>
            <span className="mx-4 font-medium text-[#817C74]">{t("or")}</span>
            <span className="h-[1px] w-full flex-1 bg-[#DFDEDC]"></span>
          </div>

          <div className=" text-sm font-medium">
            {t("have_account")}{" "}
            <Link href={AUTH_ROUTES.LOGIN} className="text-[#F19A07]">
              {t("login")}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
