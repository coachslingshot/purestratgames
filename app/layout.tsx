import type { Metadata } from 'next';
import { Orbitron, Montserrat, Inter } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  variable: '--font-headline',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const montserrat = Montserrat({
  variable: '--font-subhead',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'PureStrat Games | No Dice. No Draws. Just Decisions.',
  description:
    'Enter a world built on intellect and precision. PureStrat Games delivers 0% luck gameplay — where foresight, discipline, and psychological control define victory.',
  openGraph: {
    title: 'PureStrat Games',
    description: 'No dice. No draws. Just decisions.',
    siteName: 'PureStrat Games',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${montserrat.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <div className="mesh-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
