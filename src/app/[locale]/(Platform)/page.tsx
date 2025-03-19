import Hero_Section from '@/components/home/Hero_Section';
import Popular_Cities from '@/components/home/Popular_Cities';
import { Button, Stack } from '@mantine/core';

export default function HeroSection() {
  return (
    <>
      <Hero_Section />
      <Stack align="stretch" justify="flex-start" gap="30px">
        <Popular_Cities />
        <Button variant="default">2</Button>
        <Button variant="default">3</Button>
      </Stack>
      <div> hi from home</div>
    </>
  );
}
