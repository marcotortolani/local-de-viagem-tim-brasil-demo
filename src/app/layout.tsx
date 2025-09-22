// src/app/layout.tsx

import React from 'react'

import type { Metadata } from 'next'
import { Poppins, Oswald } from 'next/font/google'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './globals.css'
import { ValidationProvider } from '@/providers/validation-provider'
import GoogleAnalyticsLoader from '@/components/GoogleAnalyticsLoader'

const poppins = Poppins({
  subsets: ['latin'],
  preload: true,
  style: ['normal', 'italic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const oswald = Oswald({
  subsets: ['latin'],
  style: ['normal'],
  preload: true,
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: 'Que Guay Viajes | Tu sitio de viajes',
  description: '',
  icons: '/favicon.ico',
  other: {
    version: '1.4.3',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <GoogleAnalyticsLoader />
      </head>
      <body className={`${poppins.variable} ${oswald.variable} font-sans`}>
        <ValidationProvider>{children}</ValidationProvider>
      </body>
    </html>
  )
}
