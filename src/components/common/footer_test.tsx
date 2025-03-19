import { footer, logo } from '@/assets/common';
import { Hero_Bus } from '@/assets/home';
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
import { Instagram, Linkedin, X } from 'lucide-react';
import Image from 'next/image';

// Define the data as provided
const resources = [
  { id: 1, label: 'home', link: '/' },
  { id: 2, label: 'about-us', link: '/about-us' },
  { id: 3, label: 'contact-us', link: '/contact-us' },
  { id: 4, label: 'transport', link: '#' },
  { id: 5, label: 'transport-authority', link: '#' },
] as const;

const tickets = [
  { id: 1, label: 'tickets-conditions', link: '#' },
  { id: 2, label: 'cancellation', link: '#' },
  { id: 3, label: 'booking-enquiries', link: '#' },
  { id: 4, label: 'trips-schedule', link: '#' },
] as const;

const contactUs = [
  { id: 1, label: 'email', link: 'wejhati.co.com' },
  { id: 2, label: 'number', link: '+966 55 140 5555' },
  { id: 3, label: 'social-media' },
] as const;

const socials = [
  {
    id: 1,
    link: 'linkedin',
    icon: <Linkedin size={16} className="text-white" />,
  },
  {
    id: 2,
    link: 'instagram',
    icon: <Instagram size={16} className="text-white" />,
  },
  { id: 3, link: 'x', icon: <X size={16} className="text-white" /> },
] as const;

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff' }}>
      {/* Background Image with Overlay */}
      <Box pos="relative" bg="black">
        {/* Background Image - Hidden on Mobile */}
        <Box
          pos="relative"
          h={{ base: 0, lg: 413 }}
          w="100%"
          display={{ base: 'none', lg: 'block' }}
        >
          <Image
            src={Hero_Bus}
            alt="Hero Bus Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
          {/* Black Overlay */}
          <Box
            pos="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          />
        </Box>

        {/* Footer Content */}
        <Container
          size="lg"
          style={{ position: 'relative', padding: '40px 0' }}
        >
          <Grid gutter="lg">
            {/* Logo Section */}
            <Grid.Col
              span={{ base: 12, md: 3 }}
              style={{ textAlign: 'center' }}
            >
              <Image src={logo} alt="Wejhati Logo" width={150} height={50} />
            </Grid.Col>

            {/* Resources Section */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Text size="lg" fw={700} mb="md">
                RESOURCES
              </Text>
              <Stack gap="xs">
                {resources.map((item) => (
                  <Anchor
                    key={item.id}
                    component={Link}
                    href={item.link}
                    c="gray.4"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {item.label.replace('-', ' ')}
                  </Anchor>
                ))}
              </Stack>
            </Grid.Col>

            {/* Tickets Section */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Text size="lg" fw={700} mb="md">
                TICKETS
              </Text>
              <Stack gap="xs">
                {tickets.map((item) => (
                  <Anchor
                    key={item.id}
                    component={Link}
                    href={item.link}
                    c="gray.4"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {item.label.replace('-', ' ')}
                  </Anchor>
                ))}
              </Stack>
            </Grid.Col>

            {/* Contact Us Section */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Text size="lg" fw={700} mb="md">
                CONTACT US
              </Text>
              <Stack gap="xs">
                {contactUs.map((item) => (
                  <div key={item.id}>
                    {item.label !== 'social-media' ? (
                      <Text c="gray.4" style={{ textTransform: 'capitalize' }}>
                        {item.label}: {item.link}
                      </Text>
                    ) : (
                      <Group gap="sm">
                        {socials.map((social) => (
                          <Anchor
                            key={social.id}
                            href={social.link}
                            target="_blank"
                          >
                            {social.icon}
                          </Anchor>
                        ))}
                      </Group>
                    )}
                  </div>
                ))}
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Divider */}
          <Divider my="lg" color="gray.8" />

          {/* Bottom Section: Copyright and Developed By */}
          <Group justify="space-between" align="center" wrap="wrap">
            <Text size="sm" c="gray.5">
              © 2024 WEJHATI. All rights reserved.
            </Text>
            <Text size="sm" c="gray.5">
              Developed by{' '}
              <Anchor href="#" c="gray.4">
                Glow
              </Anchor>
            </Text>
          </Group>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
