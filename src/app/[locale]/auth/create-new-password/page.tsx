"use client"
import { Button, PasswordInput, Text } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "@/i18n/navigation"
import { cn } from "@/utility/cn"

export default function CREATE_NEW_PASSWORD() {
  const errors = useTranslations("errors")
  const t = useTranslations("Auth.create_new_password")

  const passwordFormSchema = z
    .object({
      password: z
        .string({ required_error: errors("required_error") })
        .min(6, errors("Invalid_password_format")),
      confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: errors("Passwords_do_not_match"),
      path: ["confirm_password"],
    })

  const form = useForm<z.infer<typeof passwordFormSchema>>({
    mode: "uncontrolled",
    initialValues: { password: "", confirm_password: "" },
    validate: zodResolver(passwordFormSchema), 
  })

  const [error, setError] = useState("")
  const Router = useRouter()
  const handleSubmit = form.onSubmit(async (values) => {
    try {
      Router.push(`/`)
    } catch (error :any) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError(error.message)
    }
  })

  return (
    <>
      {/* Desktop & Mobile */}
      <div className="gap-10 flex  w-full h-full flex-col items-center rounded-xl bg-white lg:pt-16 pb-5 lg:w-[550px]">
        <p className="text-2xl font-medium md:text-3xl text-center">{t("title")}</p>
        <p className="mt-2  text-center text-xs font-normal text-[#817C74] md:text-sm ">{t("text")}</p>
        <form className=" px-4 lg:px-0 flex w-full flex-col items-center  max-w-md mx-auto " onSubmit={handleSubmit}>
          {/*  password */}
          <PasswordInput
            w="100%"
            label={<p className="text-xs font-medium text-[#817C74]">{t("inputs.new_password.text")}</p>}
            placeholder={t("inputs.new_password.placeholder")}
            className="border-w-1 border-[#DFDEDC] outline-none focus:border-none md:w-[400px]"
            key={form.key("password")}
            {...form.getInputProps("password")}
            classNames={{
              error: "w-full text-end text-[#FD6265] font-normal text-sm",
            }}
          />
          {/*  Confirm password */}
          <PasswordInput
            w="100%"
            label={<p className="text-xs font-medium text-[#817C74]">{t("inputs.confirm_password.text")}</p>}
            placeholder={t("inputs.confirm_password.placeholder")}
            className="border-w-1 mt-6 w-[343px] border-[#DFDEDC] outline-none focus:border-none md:w-[400px]"
            key={form.key("confirm_password")}
            {...form.getInputProps("confirm_password")}
            classNames={{
              error: "w-full text-end text-[#FD6265] font-normal text-sm",
            }}
          />

          <Button
            type="submit"
            loading={form.submitting}
            className={cn("mt-16 bg-[#F19A07] text-white shadow-lg")}
            w={228}>
            {t("button")}
          </Button>
          {error ? (
            <Text fw={"500"} mt={"sm"} size="sm" ta="center" c={"red"}>
              {error}
            </Text>
          ) : null}
        </form>
      </div>
    </>
  )
}
