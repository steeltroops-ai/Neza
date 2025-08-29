import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Neza - Premium Local Services Marketplace',
    template: '%s | Neza',
  },
  description:
    'The Uber for local services - instantly connect with verified service providers through secure booking and escrow payments.',
  keywords: [
    'local services',
    'marketplace',
    'service providers',
    'booking',
    'escrow payments',
    'trusted services',
  ],
  authors: [{ name: 'Neza Team' }],
  creator: 'Neza',
  publisher: 'Neza',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Neza - Premium Local Services Marketplace',
    description:
      'The Uber for local services - instantly connect with verified service providers through secure booking and escrow payments.',
    siteName: 'Neza',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neza - Premium Local Services Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neza - Premium Local Services Marketplace',
    description:
      'The Uber for local services - instantly connect with verified service providers through secure booking and escrow payments.',
    images: ['/og-image.png'],
    creator: '@neza',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
