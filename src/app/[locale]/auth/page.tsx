import { AirlineManageGate, bus, MoveLocation, Ticket, wejhati } from '@/assets/auth'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

export default function Auth_Page() {

    // "title": "Traveler",
    // "text": "Book tickets, view schedules, and manage your journeys with ease."

    const t = useTranslations("Auth.auth")
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:flex h-full  flex-col items-center justify-center bg-white shadow-lg  rounded-[12px] px-8 w-[500px] xl:w-[600px]">
                <Image src={wejhati} alt="wejhati" className="h-12 w-28" />
                <div className="mt-12 flex w-full flex-row justify-center gap-6 p-4">
                    {/* Traveler */}
                    <Link
                        href={t('traveler.link')}
                        className="flex h-60 w-40 flex-col gap-4 rounded-xl bg-[#FFE5E5] p-4 transition-shadow duration-300 hover:shadow-md md:w-56">
                        <div className="flex h-2/5 w-full flex-row">
                            <div className="w-full flex-1">
                                <div className="w-fit rounded-full bg-white p-2">
                                    <Image src={bus} width={22} height={22} alt="bus" />
                                </div>
                            </div>
                            <div className="flex w-full flex-1 items-end justify-end">
                                <Image
                                    src={MoveLocation}
                                    width={65}
                                    height={70}
                                    alt="MoveLocation"
                                    className="h-12 w-12 md:h-16 md:w-16"
                                />
                            </div>
                        </div>

                        <div className="flex h-full w-full flex-1 flex-col">
                            <p className="text-base font-medium md:text-xl">{t('traveler.title')}</p>
                            <p className="text-xs font-normal text-[#817C74] md:text-sm">{t('traveler.text')}</p>
                        </div>
                    </Link>
                    {/* Service Provider */}
                    <Link
                        href={t('Service_Provider.link')}
                        className="flex h-60 w-40 flex-col gap-4 rounded-xl bg-[#FFE5E5] p-4 transition-shadow duration-300 hover:shadow-md md:w-56">
                        <div className="flex h-2/5 w-full flex-row">
                            <div className="w-full flex-1">
                                <div className="w-fit rounded-full bg-white p-2">
                                    <Image src={Ticket} width={22} height={22} alt="bus" />
                                </div>
                            </div>
                            <div className="flex w-full flex-1 items-end justify-end">
                                <Image src={AirlineManageGate} alt="MoveLocation" className="h-12 w-12 md:h-16 md:w-16" />
                            </div>
                        </div>
                        <div className="flex h-full w-full flex-1 flex-col">
                            <p className="text-base font-medium md:text-xl">{t("Service_Provider.title")}</p>
                            <p className="text-xs font-normal text-[#817C74] md:text-sm">{t("Service_Provider.text")}</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Mobile */}
            <div className='flex lg:hidden flex-col items-center justify-center gap-14'>
                <Image src={wejhati} alt="wejhati" className="h-9 w-20 " />
                <div className="flex w-full flex-row justify-center gap-5 p-4">
                    {/* Traveler */}
                    <Link
                        href={t('traveler.link')}
                        className="flex h-60 w-40 flex-col gap-4 rounded-xl bg-[#FFE5E5] p-4 transition-shadow duration-300 hover:shadow-md md:w-56">
                        <div className="flex h-2/5 w-full flex-row">
                            <div className="w-full flex-1">
                                <div className="w-fit rounded-full bg-white p-2">
                                    <Image src={bus} width={22} height={22} alt="bus" />
                                </div>
                            </div>
                            <div className="flex w-full flex-1 items-end justify-end">
                                <Image
                                    src={MoveLocation}
                                    width={65}
                                    height={70}
                                    alt="MoveLocation"
                                    className="h-12 w-12 md:h-16 md:w-16"
                                />
                            </div>
                        </div>

                        <div className="flex h-full w-full flex-1 flex-col">
                            <p className="text-base font-medium md:text-xl">{t('traveler.title')}</p>
                            <p className="text-xs font-normal text-[#817C74] md:text-sm">{t('traveler.text')}</p>
                        </div>
                    </Link>
                    {/* Service Provider */}
                    <Link
                        href={t('Service_Provider.link')}
                        className="flex h-60 w-40 flex-col gap-4 rounded-xl bg-[#FFE5E5] p-4 transition-shadow duration-300 hover:shadow-md md:w-56">
                        <div className="flex h-2/5 w-full flex-row">
                            <div className="w-full flex-1">
                                <div className="w-fit rounded-full bg-white p-2">
                                    <Image src={Ticket} width={22} height={22} alt="bus" />
                                </div>
                            </div>
                            <div className="flex w-full flex-1 items-end justify-end">
                                <Image src={AirlineManageGate} alt="MoveLocation" className="h-12 w-12 md:h-16 md:w-16" />
                            </div>
                        </div>
                        <div className="flex h-full w-full flex-1 flex-col">
                            <p className="text-base font-medium md:text-xl">{t("Service_Provider.title")}</p>
                            <p className="text-xs font-normal text-[#817C74] md:text-sm">{t("Service_Provider.text")}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
