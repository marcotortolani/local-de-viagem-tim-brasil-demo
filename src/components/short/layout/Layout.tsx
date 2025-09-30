'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ShortMenu } from '../ShortMenu'
import { SheetUI } from '@/components/ui/sidebar/sheet'
import { MenuFooter } from '@/components/layout/MenuFooter'
import { useLayoutSidebarStore } from '@/components/layout/layout-store'
import { RouteItem } from '@/lib/route/route-types'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { Heart } from 'lucide-react'
import { SearchIcon } from '@/components/icons'

import dictionary from '@/dictionary/lang.json'

// import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const { open, closeDialog } = useLayoutSidebarStore()

  //const { additionalConfig } = useAdditionalComponentsStore()
  //const { additionalSection } = additionalConfig

  const ROUTES: RouteItem[] = [
    {
      title: dictionary['Home'],
      href: '/',
    },
    {
      title: dictionary['Inspired By Brazil'],
      href: '/inspired-by',
    },
    {
      title: dictionary['Around the World'],
      href: '/around-the-world',
    },
    {
      title: dictionary['Culture and Flavor'],
      href: '/culture-and-flavor',
    },
    {
      title: dictionary['Checklist'],
      href: '/checklist',
    },
    {
      title: dictionary['Shorts'],
      href: '/shorts',
    },
    {
      title: dictionary['Destinations of the Month'],
      href: '/destinations-of-the-month',
    },
    {
      title: dictionary['Favorites'],
      Icon: Heart,
      href: '/favorites',
    },
    {
      title: dictionary['Search'],
      Icon: SearchIcon,
      href: '/search',
    },
  ]

  const MOBILE_ROUTES = [...ROUTES]

  // if (additionalSection && additionalSection?.show) {
  //   ROUTES.splice(2, 0, {
  //     title: additionalSection.title,
  //     href: `/${additionalSection['wp-category-slug']}`,
  //   })
  // }

  useEffect(() => {
    closeDialog()
  }, [pathname])

  return (
    <div className="relative w-full h-full bg-primary-dark ">
      <ShortMenu routes={ROUTES} />
      <main className="flex flex-col items-center justify-center h-[100dvh]">
        {children}
      </main>
      <SheetUI
        sidebarClassName="z-50 bg-primary-dark text-white w-[90%] overflow-x-hidden overflow-y-auto sm:overflow-y-hidden rounded-l-xl md:rounded-l-2xl"
        open={open}
        onOpenChange={() => {
          closeDialog()
        }}
        items={MOBILE_ROUTES}
        closeColor={'#fff'}
        header={<MobileHeader />}
        footer={<MenuFooter />}
        sidebarMenuItemClassName="text-sm hover:text-lxc"
      />
    </div>
  )
}
