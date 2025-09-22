'use client'
import React, { useEffect, useState, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ValidationContext } from '@/providers/validation-provider'
import { Logo } from '@/components/layout/Logo'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { RouteItem } from '@/lib/route/route-types'
import { useLayoutSidebarStore } from '@/components/layout/layout-store'

import { Heart, Menu } from 'lucide-react'
import { SearchIcon } from '@/components/icons'
//import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'
const urlLanding = process.env.NEXT_PUBLIC_LANDING_SUBSCRIPTION || '/'

const Header: React.FC = () => {
  const pathname = usePathname()
  const pathnameSection = '/' + pathname.split('/')[1]
  const { openDialog } = useLayoutSidebarStore()
  const [isOnTop, setIsOnTop] = useState(true)
  const { userEnabled } = useContext(ValidationContext)
  // const { additionalConfig } = useAdditionalComponentsStore()
  // const { additionalSection } = additionalConfig

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
      title: 'Suscríbete',
      href: urlLanding,
    },
    {
      Icon: Heart,
      href: '/favoritos',
    },
    {
      Icon: SearchIcon,
      href: '/busqueda',
    },
  ]

  if (userEnabled) {
    const index = ROUTES.findIndex((item) => item.title === 'Suscríbete')
    if (index !== -1) {
      ROUTES.splice(index, 1)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const match = window.matchMedia('(max-width: 768px)')

      if (match.matches && scrollY > 200) {
        setIsOnTop(false)
      } else {
        setIsOnTop(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Limpiar el event listener cuando el componente se desmonta
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={` fixed z-50 flex min-h-20 md:min-h-24 w-full items-center justify-between bg-primary-dark  md:px-10 xl:px-4  2xl:px-10 top-0 transition-all duration-300 ease-in-out `}
    >
      <Button
        size="icon"
        className="bg-transparent xl:hidden focus-visible:outline-0 absolute left-4"
        onClick={() => openDialog()}
      >
        <Menu className="h-6 w-6 text-white" />
      </Button>
      <div className="w-full pl-6 xl:w-fit lg:pl-0 flex justify-center items-center gap-4 xl:gap-0 ">
        <Logo />
        <Image
          className=" mt-4"
          src="/images/bandera-venezuela.webp"
          alt="logo"
          width={60}
          height={42}
        />
        {
          pathname === '/' && isOnTop && null
          // <div className="text-white text-sm md:text-md font-semibold md:hidden">
          //   El mundo esta a <span className=" text-secondary ">un click </span>{' '}
          //   de distancia
          // </div>
        }
      </div>
      <NavigationMenu className="hidden xl:flex ">
        <NavigationMenuList className="flex lg:gap-2 2xl:gap-4">
          {ROUTES?.map(({ title, href, Icon }, index) => (
            <NavigationMenuLink asChild key={index}>
              <div className="z-0 relative w-fit h-fit">
                <Link
                  href={href || '#'}
                  className={` ${title === 'Inicio' && ' hidden 2xl:flex '}  
                  ${title === 'Suscríbete' && ' bg-secondary '}  
                  ${href === '/destinos-del-mes' ? ' text-neutral-800 bg-neutral-300 ' : ' text-white bg-primary-light/50 '} z-20 relative group inline-flex w-max items-center justify-center rounded-full px-4 py-1 text-sm lg:text-[12px] xl:text-sm font-light fill-white hover:bg-primary transition-all duration-300 ease-in-out`}
                  prefetch
                  target={title === 'Suscríbete' ? '_blank' : '_self'}
                >
                  {Icon ? (
                    <Icon className=" w-6 h-6 xl:w-6 xl:h-5 fill-[inherit] " />
                  ) : null}
                  {title}
                </Link>
                <span
                  className={` ${pathnameSection === href ? ' translate-y-2 opacity-100 ' : ' -translate-y-2 opacity-0 '} -z-10 absolute bottom-0 left-0 right-0 w-2/3 m-auto h-0.5 bg-white rounded-full transition-all duration-200 ease-in-out`}
                ></span>
              </div>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

export { Header }
