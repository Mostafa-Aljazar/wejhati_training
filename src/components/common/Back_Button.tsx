'use client';
import { useRouter } from '@/i18n/navigation';
import { ActionIcon } from '@mantine/core';
import { ArrowLeft, CircleArrowLeft } from 'lucide-react';
import React from 'react';

export default function Back_Button() {
  const router = useRouter();

  return (
    <ActionIcon
      variant="transparent"
      size={40}
      radius="xl"
      bg="#F9F8F6"
      onClick={() => router.back()}
    >
      <CircleArrowLeft
        color="#817C74"
        className="hidden lg:block rtl:rotate-180"
      />
      <ArrowLeft
        color="#817C74"
        size={24}
        className="lg:hidden block rtl:rotate-180"
      />
    </ActionIcon>
  );
}
