'use client'
import React from 'react'
import { Post } from '@/lib/api/wp/wp-types'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { FavoriteVideoSectionItem } from '@/components/favorites/FavoriteVideoSectionItem'
import { SectionTitle } from '@/components/text/SectionTitle'

type FavoriteVideoSectionProps = {
  title?: string
  moreLink?: string
  items: Post[]
  isRounded?: boolean
  isLarge?: boolean
  color?: string
}

export const FavoriteVideoSection: React.FC<FavoriteVideoSectionProps> = ({
  title,
  moreLink = '#',
  items = [],
  color = 'text-white ',
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <SectionTitle color={color}>{title}</SectionTitle>
        {items.length > 4 && (
          <Link
            href={moreLink}
            className="text-white text-xs  font-normal md:text-[16px] flex items-center"
          >
            Ver más <ChevronRight size={20} className="ml-1" />
          </Link>
        )}
      </div>

      {items.length ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 md:px-2">
          {items.slice(0, 4).map((item, key) => (
            <FavoriteVideoSectionItem item={item} key={key} />
          ))}
        </div>
      ) : (
        <div className="text-white text-center bg-neutral-500 py-4 rounded-xl ">
          No tienes videos disponibles
        </div>
      )}
    </div>
  )
}
