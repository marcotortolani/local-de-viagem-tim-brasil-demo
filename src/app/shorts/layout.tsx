import React from 'react'
import { Layout } from '@/components/short/layout/Layout'
import { TrialProvider } from "@/providers/trial-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Layout>
      <TrialProvider>{children}</TrialProvider>
    </Layout>
  )
}
