// @/app/(root)/(categories)/layout.tsx

import React from 'react'
import { TrialProvider } from '@/providers/trial-provider'

// Trial deshabilitado
// const operatorCountry = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY
const operatorCountry = 'test'

export default function TrialLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (operatorCountry === 'test') return <>{children}</>

  return <TrialProvider>{children}</TrialProvider>
}
