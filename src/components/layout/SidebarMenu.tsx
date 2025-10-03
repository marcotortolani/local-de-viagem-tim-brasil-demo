'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MobileHeader } from './MobileHeader'
import { SheetUI } from '../ui/sidebar/sheet'
import { MenuFooter } from '@/components/layout/MenuFooter'
import { RouteItem } from '@/lib/route/route-types'

import { useLayoutSidebarStore } from './layout-store'
//import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'

import dictionary from '@/dictionary/lang.json'

export default function SidebarMenu(): React.ReactNode {
  const pathname = usePathname()
  const { open, closeDialog } = useLayoutSidebarStore()

  //const { additionalConfig } = useAdditionalComponentsStore()
  //const { additionalSection } = additionalConfig

  const MOBILE_ROUTES: RouteItem[] = [
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
      title: dictionary['Travelers'],
      href: '/travelers',
    },
    {
      title: dictionary['Destinations of the Month'],
      href: '/destinations-of-the-month',
    },
    {
      title: dictionary['Favorites'],
      href: '/favorites',
    },
    {
      title: dictionary['Shorts'],
      href: '/shorts',
    },
    {
      title: dictionary['Search'],
      href: '/search',
    },
  ]

  // if (additionalSection && additionalSection?.show) {
  //   MOBILE_ROUTES.splice(2, 0, {
  //     title: additionalSection.title,
  //     href: `/${additionalSection['wp-category-slug']}`,
  //   })
  // }

  useEffect(() => {
    closeDialog()
  }, [pathname])

  return (
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
      sidebarMenuItemClassName="text-sm "
    />
  )
}
