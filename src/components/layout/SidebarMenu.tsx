'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MobileHeader } from './MobileHeader'
import { SheetUI } from '../ui/sidebar/sheet'
import { MenuFooter } from '@/components/layout/MenuFooter'
import { RouteItem } from '@/lib/route/route-types'

import { useLayoutSidebarStore } from './layout-store'
//import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'

export default function SidebarMenu(): React.ReactNode {
  const pathname = usePathname()
  const { open, closeDialog } = useLayoutSidebarStore()

  //const { additionalConfig } = useAdditionalComponentsStore()
  //const { additionalSection } = additionalConfig

  const MOBILE_ROUTES: RouteItem[] = [
    {
      title: 'Inicio',
      href: '/',
    },
    {
      title: 'Inspírate en Venezuela',
      href: '/inspired-by',
    },
    {
      title: 'Por el Mundo',
      href: '/around-the-world',
    },
    {
      title: 'Cultura y Paladar',
      href: '/culture-and-flavor',
    },
    {
      title: 'Checklist',
      href: '/checklist',
    },
    {
      title: 'Destinos del Mes',
      href: '/destinations-of-the-month',
    },
    {
      href: '/favorites',
      title: 'Favoritos',
    },
    {
      href: '/shorts',
      title: 'Shorts',
    },
    {
      href: '/search',
      title: 'Búsqueda',
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
