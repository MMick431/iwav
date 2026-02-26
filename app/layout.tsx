import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PhoneSelect - Téléphones de Seconde Main Premium',
  description: 'Découvrez notre sélection de téléphones de seconde main 100% fiables. Tous les appareils sont testés et garantis. Livraison standard 7-10j ou express 3-7j.',
  generator: 'v0.app',
  keywords: ['téléphones', 'seconde main', 'occasion', 'iPhone', 'Samsung', 'pixel', 'oneplus', 'livraison'],
  authors: [{ name: 'PhoneSelect' }],
  creator: 'PhoneSelect',
  publisher: 'PhoneSelect',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://phoneselect.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PhoneSelect - Téléphones de Seconde Main Premium',
    description: 'Découvrez notre sélection de téléphones de seconde main 100% fiables. Tous les appareils sont testés et garantis.',
    url: 'https://phoneselect.com',
    siteName: 'PhoneSelect',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PhoneSelect - Téléphones Premium',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhoneSelect - Téléphones de Seconde Main Premium',
    description: 'Découvrez notre sélection de téléphones de seconde main 100% fiables.',
    images: ['/og-image.jpg'],
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
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  appleWebApp: {
    title: 'PhoneSelect',
    statusBarStyle: 'default',
    capable: true,
  },
  applicationName: 'PhoneSelect',
  category: 'e-commerce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Favicons supplémentaires pour tous les navigateurs */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9333ea" />
        <meta name="msapplication-TileColor" content="#9333ea" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}