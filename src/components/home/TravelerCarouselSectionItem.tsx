'use client'
import React from 'react'
import Image from 'next/image'
import { Category } from '@/lib/api/wp/wp-types'
import Default from '/public/images/default.webp'
import Link from 'next/link'

type TravelerCarouselSectionItemProps = {
  category: Category
}

export const TravelerCarouselSectionItem: React.FC<
  TravelerCarouselSectionItemProps
> = ({ category }) => {
  const name = category?.name?.replaceAll('-', ' ')

  return (
    <Link href={`/inspired-by/travelers/${category?.slug}`} prefetch>
      <div className="w-full h-full  space-y-2">
        <div
          className={`relative mb-1 aspect-[3/5] overflow-hidden border-8 md:border-[12px] lg:border-[20px] border-solid border-white rounded-full `}
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
        <div className="z-0 relative w-fit mx-auto h-fit bg-white rounded-md">
          <span className=" z-20 relative px-4 py-1 text-black text-xs text-wrap line-clamp-1 leading-[auto] uppercase font-oswald tracking-wide md:text-lg break-all text-center">
            {name}
          </span>
        </div>
      </div>
    </Link>
  )
}
