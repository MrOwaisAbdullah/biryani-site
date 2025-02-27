import type { Config } from "tailwindcss";

const colors = {
  text: '#140b01',
  background: '#fcfaf9',
  primary: '#f48d2b',
  secondary: '#1d1b1b',
  accent: '#d62f2f',
  foreground: '#140b01',
  card: '#ffffff',
  cardForeground: '#140b01',
  popover: '#ffffff',
  popoverForeground: '#140b01',
  primaryForeground: '#fcfaf9',
  secondaryForeground: '#fcfaf9',
  muted: '#f0ece8',
  mutedForeground: '#716c68',
  accentForeground: '#fcfaf9',
  destructive: '#b32121',
  destructiveForeground: '#fcfaf9',
  border: '#e0dedc',
  input: '#e0dedc',
  ring: '#f48d2b',
  chart1: '#f48d2b',
  chart2: '#5a5753',
  chart3: '#8c6b50',
  chart4: '#d62f2f',
  chart5: '#944a4a',
};

const darkColors = {
  text: '#fef5ec',
  background: '#090501',
  primary: '#d6771f',
  secondary: '#e4e2e2',
  accent: '#d12929',
  foreground: '#fef5ec',
  card: '#1d1b1b',
  cardForeground: '#fef5ec',
  popover: '#1d1b1b',
  popoverForeground: '#fef5ec',
  primaryForeground: '#140b01',
  secondaryForeground: '#140b01',
  muted: '#262424',
  mutedForeground: '#a8a5a2',
  accentForeground: '#140b01',
  destructive: '#f24c4c',
  destructiveForeground: '#140b01',
  border: '#3d3b3b',
  input: '#3d3b3b',
  ring: '#d6771f',
  chart1: '#f29d49',
  chart2: '#a6a3a0',
  chart3: '#c4a388',
  chart4: '#f04747',
  chart5: '#c77777',
};


export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        foreground: colors.foreground,
        card: {
          DEFAULT: colors.card,
          foreground: colors.cardForeground,
        },
        popover: {
          DEFAULT: colors.popover,
          foreground: colors.popoverForeground,
        },
        primary: {
          DEFAULT: colors.primary,
          foreground: colors.primaryForeground,
        },
        secondary: {
          DEFAULT: colors.secondary,
          foreground: colors.secondaryForeground,
        },
        muted: {
          DEFAULT: colors.muted,
          foreground: colors.mutedForeground,
        },
        accent: {
          DEFAULT: colors.accent,
          foreground: colors.accentForeground,
        },
        destructive: {
          DEFAULT: colors.destructive,
          foreground: colors.destructiveForeground,
        },
        border: colors.border,
        input: colors.input,
        ring: colors.ring,
        chart: {
          '1': colors.chart1,
          '2': colors.chart2,
          '3': colors.chart3,
          '4': colors.chart4,
          '5': colors.chart5,
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        'xxs' : '280px',
        'xs': '420px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;