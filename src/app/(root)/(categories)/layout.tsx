// @/app/(root)/(categories)/layout.tsx

import React from 'react'
import { TrialProvider } from '@/providers/trial-provider'

// Descomentar para permitir uso libre en TEST
// const operatorCountry = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY

export default function TrialLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Descomentar para permitir uso libre en TEST
  // if (operatorCountry === 'test') return <>{children}</>

  return <TrialProvider>{children}</TrialProvider>
}
