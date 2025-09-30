import React from 'react'
import { Layout } from '@/components/short/layout/Layout'
import { TrialProvider } from '@/providers/trial-provider'

const operatorCountry = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Layout>
      {operatorCountry === 'test' ? (
        <>{children}</>
      ) : (
        <TrialProvider>{children}</TrialProvider>
      )}
    </Layout>
  )
}
