import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RootLayout from '@/components/layout/RootLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dern-Support - IT Qo\'llab-quvvatlash Tizimi',
  description: 'Biznes va shaxslar uchun professional IT yordam yechimlari',
    generator: 'v0.dev'
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
