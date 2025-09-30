'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { MenuItem } from '@/components/ui/menu/menu-types'
import Link from 'next/link'
import { SECONDARY_COLOR } from '@/lib/constants'

import dictionary from '@/dictionary/lang.json'

import {
  FavoriteIcon,
  HomeIcon,
  SearchIcon,
  ShortIcon,
  VenezuelaIcon,
} from '@/components/icons'

type MenuMobileProps = {
  menuClassName?: string
  menuItemClassName?: string
  color?: string
  hideTitle?: boolean
  titleColor?: string
  titleActiveColor?: string
  iconActiveColor?: string
  iconColor?: string
  itemColor?: string
  activeItemColor?: string
}

const ICON_WIDTH = 28
const ICON_HEIGHT = 28

const MenuMobile: React.FC<MenuMobileProps> = ({
  menuClassName = 'bg-black',
  menuItemClassName = 'text-white',
  titleActiveColor = 'text-white',
  iconActiveColor = 'white',
  titleColor = 'text-black',
  iconColor = 'black',
  hideTitle = false,
  itemColor = 'bg-transparent',
  activeItemColor = 'bg-transparent',
}) => {
  const currentPath = usePathname()

  const items: MenuItem[] = [
    {
      title: dictionary['Shorts'],
      href: '/shorts',
      Icon: ShortIcon,
    },
    {
      title: dictionary['Search'],
      Icon: SearchIcon,
      href: '/search',
    },
    {
      title: dictionary['Home'],
      href: '/',
      Icon: HomeIcon,
    },
    {
      title: dictionary['Inspired By Brazil'],
      href: '/inspired-by',
      Icon: VenezuelaIcon,
    },
    {
      title: dictionary['Favorites'],
      href: '/favorites',
      Icon: FavoriteIcon,
    },
  ]
  return (
    <div
      className={`shadow-t fixed bottom-0 left-0 z-50 flex w-full items-center justify-around py-3 lg:hidden bg-primary-dark ${menuClassName}`}
    >
      {items.map(({ href, action, title, Icon }) => {
        const routeLevelPath =
          href !== '/' &&
          (currentPath === href || currentPath.startsWith(`${href}/`))

        const textColor =
          currentPath === href || routeLevelPath ? titleActiveColor : titleColor
        const color =
          currentPath === href || routeLevelPath ? iconActiveColor : iconColor
        const activeColor =
          currentPath === href || routeLevelPath ? activeItemColor : itemColor
        if (action) {
          return (
            <div
              key={`${title}-icon`}
              onClick={action}
              className={`flex flex-col items-center gap-1 text-xs font-medium py-1 h-6 w-6 ${menuItemClassName} ${textColor} ${activeColor}`}
            >
              <Icon height={ICON_HEIGHT} width={ICON_WIDTH} fill={color} />
              {!hideTitle && title}
            </div>
          )
        }

        return (
          <Link
            key={`${title}-icon`}
            href={href || '#'}
            style={{
              background:
                currentPath === href || routeLevelPath
                  ? SECONDARY_COLOR
                  : 'transparent',
            }}
            className={`flex flex-col items-center justify-center gap-1 text-xs font-medium h-10 w-10  ${menuItemClassName} ${textColor} ${activeColor} rounded-sm p-1`}
            prefetch
          >
            <Icon height={ICON_HEIGHT} width={ICON_WIDTH} fill={color} />

            {!hideTitle && title}
          </Link>
        )
      })}
    </div>
  )
}

export { MenuMobile }
