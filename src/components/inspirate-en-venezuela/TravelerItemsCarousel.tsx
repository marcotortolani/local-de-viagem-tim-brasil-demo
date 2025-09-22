'use client'
import React from 'react'
import Image from 'next/image'
import { Category } from '@/lib/api/wp/wp-types'
import Default from '/public/images/default.webp'
import Link from 'next/link'

type TravelerItemsCarouselProps = {
  category: Category
}

export const TravelerItemsCarousel: React.FC<TravelerItemsCarouselProps> = ({
  category,
}) => {
  const name = category?.name?.replaceAll('-', ' ')

  return (
    <Link href={`/inspirate-en-venezuela/viajeros/${category?.slug}`} prefetch>
      <div className="w-full h-full flex flex-col items-center gap-2">
        <div
          className={`relative w-full aspect-square overflow-hidden border-2 xl:border-4 border-solid border-white rounded-full `}
        >
          <Image
            className=" "
            src={(category?.image as string) || Default}
            fill
            priority
            alt={category?.name as string}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="z-20 relative w-5/6 bg-white1 rounded-md">
          <span className="  text-white text-xs text-wrap line-clamp-2 leading-[auto] font-poppins font-light tracking-wide md:text-lg text-center">
            {name}
          </span>
        </div>
      </div>
    </Link>
  )
}
