import './globals.css';
import Store from '@/components/Store';
import Shell from '@/components/Shell';
import { Inter } from 'next/font/google';
import { Fraunces } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: 'variable',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
  weight: 'variable',
});

export const metadata = {
  title: 'FounderPilot: AI for small teams',
  description: 'AI workspace for small startups. C2P project, Atmiya University.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Store><Shell>{children}</Shell></Store>
      </body>
    </html>
  );
}

