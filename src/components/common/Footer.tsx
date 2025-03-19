import { Footer_Cover, Footer_Curve, logo } from '@/assets/common';
import { CONTACT_US, RESOURCES, SOCIALS } from '@/contents/common/footer';
import { MY_TICKETS } from '@/contents/common/navbar';
import { Link } from '@/i18n/navigation';
import {
  Divider,
  Container,
  Grid,
  Text,
  Group,
  Anchor,
  Stack,
  Box,
} from '@mantine/core';
import Image from 'next/image';

function Footer() {
  return (
    <Box
      component="footer"
      bg="#12100DEB"
      c="white"
      pos="relative"
      className="lg:h-[330px] overflow-hidden"
    >
      {/* Desktop: Background Image with Overlay */}
      <Box
        display={{ base: 'none', lg: 'block' }}
        w="100%"
        h={'100%'}
        pos="absolute"
        top={0}
        left={0}
        right={0}
        style={{
          overflow: 'hidden',
        }}
      >
        <Image
          src={Footer_Cover}
          alt="Footer Cover Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        {/* Black Overlay with 60% Opacity */}
        <Box
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="black"
          opacity={0.95}
        />
      </Box>
      <Image
        src={Footer_Curve}
        alt="Footer Curve"
        priority
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        className="hidden lg:block"
      />

      {/* Content: Overlaid on Image for Desktop, on Black Background for Mobile */}
      <Container size="lg" py={{ base: 32, lg: 56 }} pos="relative">
        <Grid gutter="lg">
          {/* Logo Section */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Image
              src={logo}
              alt="Wejhati Logo"
              width={150}
              height={50}
              style={{ objectFit: 'cover' }}
            />
          </Grid.Col>

          {/* Resources Section */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text size="18px" fw={500} mb="md">
              Resources
            </Text>
            <Stack gap="xs">
              {RESOURCES.map((element) => (
                <Anchor
                  key={element.id}
                  component={Link}
                  href={element.link}
                  c="gray.4"
                  size="14px"
                  fw="400"
                >
                  {element.label.replace('-', ' ')}
                </Anchor>
              ))}
            </Stack>
          </Grid.Col>

          {/* Tickets Section */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text size="18px" fw={500} mb="md">
              Tickets
            </Text>
            <Stack gap="xs">
              {MY_TICKETS.map((element) => (
                <Anchor
                  key={element.text}
                  component={Link}
                  href={element.link}
                  c="gray.4"
                  size="14px"
                  fw="400"
                >
                  {element.text.replace('-', ' ')}
                </Anchor>
              ))}
            </Stack>
          </Grid.Col>

          {/* Contact Us Section */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text size="18px" fw={500} mb="md">
              Contact Us
            </Text>
            <Stack gap="xs">
              {CONTACT_US.map((item) => (
                <Box key={item.id}>
                  {item.label !== 'social-media' ? (
                    <Box>
                      <Text c="#BEB7C8" size="xs" fw={500} tt="uppercase">
                        {item.label}
                      </Text>
                      <Anchor
                        href={
                          item.label === 'email'
                            ? `mailto:${item.link}`
                            : `tel:${item.link}`
                        }
                        c="gray.4"
                        size="14px"
                        fw="400"
                      >
                        {item.link}
                      </Anchor>
                    </Box>
                  ) : (
                    <Box>
                      <Text c="#BEB7C8" size="xs" fw={400}>
                        {item.label.replace('-', ' ')}
                      </Text>
                      <Group gap="sm">
                        {SOCIALS.map((social) => (
                          <Anchor
                            key={social.id}
                            href={social.link}
                            target="_blank"
                          >
                            {social.icon}
                          </Anchor>
                        ))}
                      </Group>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Divider */}
        <Divider my="xl" color="#323331" />

        {/* Bottom Section: Copyright and Links */}
        <Group justify="space-between" align="center" wrap="wrap" pb={36}>
          <Group gap="md" wrap="wrap">
            <Text size="14px" fw="400" c="gray.5">
              © 2024 Wejhati. All rights reserved.
            </Text>
            <Divider orientation="vertical" color="#323331" />
            <Text size="14px" fw="400" c="gray.5">
              Developed by{' '}
              <Anchor href="#" size="14px" fw="400" c="#fff">
                Glow
              </Anchor>
            </Text>
          </Group>
          <Group gap="sm">
            <Anchor href="#" size="14px" fw="400" c="white">
              Terms and Conditions
            </Anchor>
            <Anchor href="#" size="14px" fw="400" c="white">
              Privacy Policy
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}

export default Footer;
