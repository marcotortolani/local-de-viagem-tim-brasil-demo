'use client'

import Header from '@/components/memotest/Header'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="relative w-screen min-w-[280px] h-[100svh] overflow-scroll  flex flex-col items-center justify-end bg-primary
      font-oswald font-bold
      sm:h-screen md:overflow-hidden  "
    >
      <Header />
      {children}
    </main>
  )
}
