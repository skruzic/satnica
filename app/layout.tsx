import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin-ext'] });

export const metadata = {
  title: 'Izračun satnice prema GKO',
  description:
    'Aplikacija za izračun satnice prema granskom kolektivnom ugovoru',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
