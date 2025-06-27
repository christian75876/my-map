import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { APP_NAME } from '@/lib/constants/config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: 'Home'
  },
  description: 'Maps, 360° photos, and more from around the world.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme='light'>
      <body
        className={`${geistSans.variable} antialiased [scrollbar-gutter:stable]`}
      >
        {children}
      </body>
    </html>
  );
}
