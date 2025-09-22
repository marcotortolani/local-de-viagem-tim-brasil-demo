'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MobileHeader } from './MobileHeader'
import { SheetUI } from '../ui/sidebar/sheet'
import { MenuFooter } from '@/components/layout/MenuFooter'
import { RouteItem } from '@/lib/route/route-types'

import { useLayoutSidebarStore } from './layout-store'
import useMemotestConfigStore from '@/stores/memotest-config-store'
//import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'

export default function SidebarMenu(): React.ReactNode {
  const pathname = usePathname()
  const { open, closeDialog } = useLayoutSidebarStore()
  const { validPeriod } = useMemotestConfigStore()
  //const { additionalConfig } = useAdditionalComponentsStore()
  //const { additionalSection } = additionalConfig

  const currentDate = new Date()

  const isBetweenDates = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return currentDate >= start && currentDate <= end
  }

  const MOBILE_ROUTES: RouteItem[] = [
    {
      title: 'Inicio',
      href: '/',
    },
    {
      title: 'Inspírate en Venezuela',
      href: '/inspirate-en-venezuela',
    },
    {
      title: 'Por el Mundo',
      href: '/por-el-mundo',
    },
    {
      title: 'Cultura y Paladar',
      href: '/cultura-y-paladar',
    },
    {
      title: 'Checklist',
      href: '/checklist',
    },
    {
      title: 'Destinos del Mes',
      href: '/destinos-del-mes',
    },
    {
      href: '/favoritos',
      title: 'Favoritos',
    },
    {
      href: '/shorts',
      title: 'Shorts',
    },
    {
      href: '/busqueda',
      title: 'Búsqueda',
    },
  ]

  if (isBetweenDates(validPeriod.startDate, validPeriod.endDate)) {
    MOBILE_ROUTES.splice(1, 0, {
      title: 'Juega al Memotest',
      href: '/memotest',
    })
  }

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
