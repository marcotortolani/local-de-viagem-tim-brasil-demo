'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { EllipsisVerticalIcon, MenuIcon } from 'lucide-react'
import { useLayoutSidebarStore } from '@/components/layout/layout-store'
import { Logo } from '@/components/layout/Logo'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { RouteItem } from '@/lib/route/route-types'

import dictionary from '@/dictionary/lang.json'

type ShortMenuProps = {
  routes: RouteItem[]
}

export const ShortMenu: React.FC<ShortMenuProps> = ({ routes = [] }) => {
  const pathname = usePathname()
  const pathnameSection = '/' + pathname.split('/')[1]
  const { openDialog } = useLayoutSidebarStore()
  return (
    <>
      <header className="fixed z-50 flex h-20 w-full items-center justify-start bg-transparent px-4 md:px-6 xl:hidden">
        <Button
          size="icon"
          className="!bg-transparent lg:hidden"
          onClick={() => openDialog()}
        >
          <EllipsisVerticalIcon className="h-6 w-6 text-white" />
        </Button>
      </header>
      <header className="hidden fixed md:flex z-50  h-20 md:min-h-24 w-full items-center justify-between bg-black/0 px-4 md:px-6 xl:px-8 2xl:px-10 ">
        <Logo />
        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList className="flex lg:gap-2 2xl:gap-4">
            {routes.map(({ title, href, Icon }, index) => (
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
                      <Icon className=" w-6 h-6 xl:w-6 xl:h-5  " />
                    ) : (
                      title
                    )}
                  </Link>
                  <span
                    className={` ${pathnameSection === href ? ' translate-y-2 opacity-100 ' : ' -translate-y-2 opacity-0 '} -z-10 absolute bottom-0 left-0 right-0 w-2/3 m-auto h-0.5 bg-white rounded-full transition-all duration-200 ease-in-out`}
                  ></span>
                </div>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          size="icon"
          className="bg-transparent xl:hidden"
          onClick={() => openDialog()}
        >
          <MenuIcon className="h-6 w-6 text-white" />
        </Button>
      </header>
    </>
  )
}
