import { Hero_Bus, Hero_Curve } from '@/assets/home';
import Image from 'next/image';
import React from 'react';

export default function Hero_Section() {
  return (
    <div className="relative h-[50svh] lg:h-[500px] w-full">
      <Image
        alt="HeroUI hero Image"
        src={Hero_Bus}
        className="z-0 flex w-full h-full object-cover"
        layout="fill"
        priority
      />
      <div className="absolute inset-0 z-10 bg-black/50"></div>
      <Image
        alt="Overlay"
        src={Hero_Curve}
        className="w-full absolute  bottom-0 z-20"
      />
    </div>
  );
}
