import React from 'react'
import { Layout } from '@/components/short/layout/Layout'
import { TrialProvider } from '@/providers/trial-provider'

const operatorCountry = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (operatorCountry === 'test') return <>{children}</>
  
  return (
    <Layout>
      <TrialProvider>{children}</TrialProvider>
    </Layout>
  )
}
