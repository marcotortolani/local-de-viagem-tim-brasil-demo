import React from 'react'
import { Layout } from '@/components/layout/Layout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Layout>
      <div className=" bg-white min-h-[60dvh]">{children}</div>
    </Layout>
  )
}
