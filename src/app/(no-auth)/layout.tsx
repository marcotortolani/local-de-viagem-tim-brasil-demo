import { Layout } from '@/components/layout/Layout'
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Layout>
      <div className="bg-primary/60">{children}</div>
    </Layout>
  )
}
