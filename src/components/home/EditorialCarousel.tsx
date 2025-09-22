'use client'
import React from 'react'
import { Post } from '@/lib/api/wp/wp-types'
import { SectionTitle } from '@/components/text/SectionTitle'
import { EditorialCarouselItem } from '@/components/home/EditorialCarouselItem'
import SeeMore from '../ui/see-more'

type EditorialCarouselProps = {
  title?: string
  moreLink?: string
  items: Post[]
  color?: string
}

export const EditorialCarousel: React.FC<EditorialCarouselProps> = ({
  title,
  moreLink = '#',
  items = [],
  color = 'text-white',
}) => {
  return (
    <div className="my-6 lg:my-10">
      <div className="flex items-center justify-between md:mb-1">
        <SectionTitle color={color}>{title}</SectionTitle>
        <SeeMore moreLink={moreLink} text="Ver más" />
      </div>
      <div className=" w-full h-fit relative grid grid-cols-3 grid-rows-1 gap-2 md:gap-4">
        {items.map((item, index) => (
          <EditorialCarouselItem
            key={index}
            item={item}
            pathSection={moreLink}
          />
        ))}
      </div>
    </div>
  )
}
