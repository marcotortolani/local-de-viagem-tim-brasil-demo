'use client'
import React, { useContext } from 'react'
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

import dictionary from '@/dictionary/lang.json'

//import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'
const urlLanding = process.env.NEXT_PUBLIC_LANDING_SUBSCRIPTION || '/'

const Header: React.FC = () => {
  const pathname = usePathname()
  const pathnameSection = '/' + pathname.split('/')[1]
  const { openDialog } = useLayoutSidebarStore()
  const { userEnabled } = useContext(ValidationContext)
  // const { additionalConfig } = useAdditionalComponentsStore()
  // const { additionalSection } = additionalConfig

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
      title: dictionary['Subscribe'],
      href: urlLanding,
    },
    {
      Icon: Heart,
      href: '/favorites',
    },
    {
      Icon: SearchIcon,
      href: '/search',
    },
  ]

  if (userEnabled) {
    const index = ROUTES.findIndex(
      (item) => item.title === dictionary['Subscribe'],
    )
    if (index !== -1) {
      ROUTES.splice(index, 1)
    }
  }

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
      <div className="w-full xl:w-[200px] pl-6 lg:pl-0 flex justify-center items-center gap-4 xl:gap-0 ">
        <Logo />
        <Image
          className="xl:w-[40px] 2xl:w-[60px] mt-4"
          src="/images/brasil-flag.webp"
          alt="logo"
          width={60}
          height={42}
        />
      </div>
      <NavigationMenu className="hidden xl:flex ">
        <NavigationMenuList className="flex lg:gap-2 2xl:gap-4">
          {ROUTES?.map(({ title, href, Icon }, index) => (
            <NavigationMenuLink asChild key={index}>
              <div className="z-0 relative w-fit h-fit">
                <Link
                  href={href || '#'}
                  className={` ${title === dictionary['Home'] && ' hidden 2xl:flex '}  
                  ${title === dictionary['Subscribe'] && ' bg-secondary '}  
                  ${href === '/destinations-of-the-month' ? ' text-neutral-800 bg-neutral-300 ' : ' text-white bg-primary-light/50 '} z-20 relative group inline-flex w-max items-center justify-center rounded-full px-4 py-1 text-sm lg:text-[12px] xl:text-sm font-light fill-white hover:bg-primary transition-all duration-300 ease-in-out`}
                  prefetch
                  target={
                    title === dictionary['Subscribe'] ? '_blank' : '_self'
                  }
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
