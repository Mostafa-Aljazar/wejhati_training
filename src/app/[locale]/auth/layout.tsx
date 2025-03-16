import { coverLogin } from '@/assets/auth'
import Left_Section from '@/components/auth/Left_Section'
import Image from 'next/image'
import React from 'react'

export default function Auth_Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block relative w-full ">
                {/* Image spanning the entire page */}
                <Image src={coverLogin} alt='coverLogin'
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                {/* Content Above the Overlay */}
                <div className=" relative z-10 flex w-full  items-center justify-center min-h-screen">
                    <div className='flex-1'>
                        <Left_Section />
                    </div>
                    <div className='h-[550px]  flex-1 '>{children}</div>
                </div>
            </div>

            {/* Mobile */}
            <div className="block lg:hidden  w-full  min-h-screen">
                <div className='w-full relative  rounded-b-2xl overflow-hidden'>
                    {/* Image spanning the entire page */}
                    <div className="h-[285px] w-full  ">
                        <Image
                            src={coverLogin}
                            alt="Cover Login"
                            objectFit="cover"
                            className="h-full object-cover w-full"
                        />
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 flex   w-full items-end justify-center bg-black/50 pb-10">
                        <Left_Section />
                    </div>
                </div>
                <div className="flex w-full flex-1 items-center justify-center my-5">{children}</div>
            </div>
        </>
    )
}
