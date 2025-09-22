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
import useMemotestConfigStore from '@/stores/memotest-config-store'
// import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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

  const ROUTES: RouteItem[] = [
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
      href: '/shorts',
      title: 'Shorts',
    },
    {
      title: 'Destinos del Mes',
      href: '/destinos-del-mes',
    },
    {
      Icon: Heart,
      title: 'Favoritos',
      href: '/favoritos',
    },
    {
      Icon: SearchIcon,
      title: 'Busqueda',
      href: '/busqueda',
    },
  ]

  const MOBILE_ROUTES = [...ROUTES]

  if (isBetweenDates(validPeriod.startDate, validPeriod.endDate)) {
    MOBILE_ROUTES.splice(1, 0, {
      title: 'Juega al Memotest',
      href: '/memotest',
    })
  }

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
