import Before_Traveling from '@/components/home/Before_Traveling';
import Hero_Section from '@/components/home/Hero_Section';
import Popular_Cities from '@/components/home/Popular_Cities';
import { Button, Center, Flex, Stack } from '@mantine/core';

export default function HeroSection() {
  return (
    <>
      <Hero_Section />
      <Flex gap="md" justify="center" align="center" direction="column">
        <Popular_Cities />
        <Before_Traveling />
      </Flex>
      <div> hi from home</div>
    </>
  );
}
