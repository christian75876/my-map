// tailwind.config.js (convertido a .ts)
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)']
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',

        secondary: 'var(--color-secondary)',
        'secondary-light': 'var(--color-secondary-light)',
        'secondary-dark': 'var(--color-secondary-dark)',

        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        success: 'var(--color-green-success)',

        background: 'var(--color-background)',
        'background-dark': 'var(--color-background-dark)',
        'neutral-white': 'var(--color-neutral-white)',
        'neutral-dark': 'var(--color-neutral-dark)',
        'neutral-gray': 'var(--color-neutral-gray)',

        'theme-bg': 'var(--theme-bg)',
        'theme-text': 'var(--theme-text)',
        'theme-border': 'var(--theme-border)',
        'theme-card': 'var(--theme-card)',
        'theme-input': 'var(--theme-input)'
      }
    }
  },
  plugins: []
};

export default config;
