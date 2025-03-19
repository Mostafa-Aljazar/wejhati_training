'use client';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

import { ReactNode } from 'react';
import { DirectionProvider, MantineProvider } from '@mantine/core';
import {
  Badge,
  Button,
  createTheme,
  Divider,
  Input,
  Menu,
  NumberInput,
  Radio,
  RadioGroup,
  rem,
  Select,
  Table,
  TableTd,
  TableTh,
  TableThead,
  TagsInput,
  TextInput,
} from '@mantine/core';
import { Calendar, DatesProvider } from '@mantine/dates';
import { Triangle } from 'lucide-react';
import { IconTriangleInvertedFilled } from '@tabler/icons-react';

const primary = [
  '#fff7e1',
  '#ffedcd',
  '#fdd99d',
  '#fbc469',
  '#f9b33d',
  '#f8a821',
  '#f8a210',
  '#dd8d02',
  '#c57d00',
  '#ab6b00',
] as const;
const secondary = [
  '#f3f7ef',
  '#e7ebe4',
  '#cdd4c8',
  '#b2bda9',
  '#9ba98f',
  '#8c9c7e',
  '#849675',
  '#718262',
  '#637456',
  '#536446',
] as const;
const gray = [
  '#f5f5f5',
  '#e7e7e7',
  '#cdcdcd',
  '#b2b2b2',
  '#e7e7e7',
  '#8b8b8b',
  '#848484',
  '#717171',
  '#656565',
  '#575757',
] as const;

const text = [
  '#faf4ec',
  '#eae7e3',
  '#d0cecb',
  '#b5b3af',
  '#9e9c97',
  '#908d88',
  '#8a867f',
  '#77736b',
  '#6b665d',
  '#5e574b',
] as const;

export const theme = createTheme({
  black: '#2B261E',
  breakpoints: {
    xs: '450px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  colors: {
    primary,
    secondary,
    gray,
    text,
  },

  // fontFamilyMonospace: "Monaco, Courier, monospace",
  primaryColor: 'primary',
  radius: {
    sm: '0.35rem',
    md: '0.55rem',
    lg: '0.8rem',
    xl: '1rem',
  },

  components: {
    Divider: Divider.extend({
      defaultProps: {
        color: '#DFDEDC',
      },
    }),
    Table: Table.extend({
      defaultProps: {
        color: 'primary',
        highlightOnHover: true,
        verticalSpacing: 'md',
        borderColor: '#EAECF0',
      },
    }),
    TableThead: TableThead.extend({
      defaultProps: {
        bg: '#FFF9F0',
      },
    }),
    TableTh: TableTh.extend({
      defaultProps: {
        fw: 600,
        ta: 'center',
      },
    }),
    TableTd: TableTd.extend({
      defaultProps: {
        c: '#747474',
        ta: 'center',
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        size: 'lg',
        radius: 'xl',
        fw: 600,
        variant: 'light',
        style: {
          textTransform: 'capitalize',
        },
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        shadow: 'lg',
      },
    }),
    Input: Input.extend({
      defaultProps: {
        size: 'md',
        fw: 500,
        c: 'primary',
        classNames: {
          input: '[type="tel"]:!text-left placeholder:text-sm ',
        },
      },
    }),

    Select: Select.extend({
      defaultProps: {
        size: 'md',
        fw: 500,
        rightSection: <Triangle size={12} />,
        classNames: {
          input: ' placeholder:text-sm',
        },
        labelProps: {
          style: {
            fontSize: '14px',
          },
        },
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        size: 'md',
        classNames: {
          input: ' placeholder:text-sm',
        },

        labelProps: {
          style: {
            fontSize: '14px',
          },
        },
      },
    }),
    TagsInput: TagsInput.extend({
      defaultProps: {
        size: 'md',
        classNames: {
          inputField: ' placeholder:text-sm',
        },

        labelProps: {
          style: {
            fontSize: '14px',
          },
        },
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        size: 'md',
        classNames: {
          input: ' placeholder:text-sm',
        },

        labelProps: {
          style: {
            fontSize: '14px',
          },
        },
      },
    }),

    Button: Button.extend({
      defaultProps: {
        fw: 500,
        size: 'md',
      },
    }),
    // Calendar: Calendar.extend({
    //   defaultProps: {
    //     classNames() {
    //       return {
    //         day: !rounded-full data-[selected='true']:!bg-secondary,
    //       }
    //     },
    //   },
    // }),
    // SegmentedControl: SegmentedControl.extend({
    //   defaultProps: {
    //     radius: "sm",
    //     style(_theme) {
    //       return {
    //         border: "1px solid #C1C1C1",
    //         background: "#E2E2E2",
    //         padding: 0,
    //       }
    //     },
    //   },
    // }),
    RadioGroup: RadioGroup.extend({
      defaultProps: {
        labelProps: {
          fw: 500,
        },
      },
    }),
    Radio: Radio.extend({
      defaultProps: {
        fw: 600,
        c: '#817C74',
      },
    }),
  },

  defaultRadius: 'md',
  fontSizes: {
    xs: rem(11),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
    '2xl': rem(28),
  },
  headings: {
    fontWeight: '600',
    sizes: {
      h1: {
        fontSize: rem(36),
      },
      h2: {
        fontSize: rem(30),
      },
    },
  },
});
interface Props {
  children: ReactNode;
}

const MantineProviderWrapper = ({ children }: Props) => {
  return (
    <MantineProvider theme={theme}>
      <DirectionProvider detectDirection>
        <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
          {children}
        </DatesProvider>
      </DirectionProvider>
    </MantineProvider>
  );
};

export default MantineProviderWrapper;
