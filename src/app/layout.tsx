import { SessionProvider } from 'next-auth/react';
import Provider from '../components/Provider';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Socix',
  description: 'AM I SOCIX?',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, 'bg-[#000000] text-white relative')}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
