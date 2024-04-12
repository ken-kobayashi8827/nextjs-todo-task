import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '../lib/chakra-ui/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextJS TODO List',
  description: 'NextJS TODO List',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
