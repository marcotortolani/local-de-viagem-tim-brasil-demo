// src/components/layout/Layout.tsx

'use client'
import React, { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { MenuMobile } from '@/components/ui/menu/MenuMobile'
import { Footer } from '@/components/layout/Footer'
import { Chatbot } from '../Chatbot'
import SidebarMenu from './SidebarMenu'

import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'

// import SideNavBar from './SideNavBar'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { setAdditionalConfig } = useAdditionalComponentsStore()

  useEffect(() => {
    setAdditionalConfig({
      game: {
        title: '',
        bannerMobile: '',
        bannerDesktop: '',
        url: '',
        validPeriod: {
          startDate: '',
          endDate: '',
        },
      },
      additionalSection: {
        show: false,
        title: '',
        flag: '',
        'wp-category-slug': '',
        'wp-category-id': 0,
      },
      validatorActive: false,
    })
  }, [])

  return (
    <>
      <Header />
      {/* <SideNavBar /> */}
      <main className=" relative w-full pb-[3rem] md:pb-0  ">{children}</main>
      <Chatbot />
      <Footer />
      <SidebarMenu />
      <MenuMobile
        titleColor="text-white"
        titleActiveColor="text-[#FFB626]"
        iconColor="white"
        iconActiveColor="#000"
        hideTitle
      />
    </>
  )
}
