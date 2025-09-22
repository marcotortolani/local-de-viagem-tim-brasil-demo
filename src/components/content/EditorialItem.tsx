'use client'
import React from 'react'
import Image from 'next/image'
import Default from '/public/images/default.webp'
import { Post } from '@/lib/api/wp/wp-types'
import Link from 'next/link'
import { wpImage } from '@/lib/api/wp/wp-utils'

type EditorialItemProps = {
  item: Post
  url?: string
}

export const EditorialItem: React.FC<EditorialItemProps> = ({ item, url }) => {
  const image = wpImage(item)

  return (
    <div>
      <Link href={url || ''} prefetch>
        <div className="relative mx-auto h-[169px] md:h-[300px] lg:h-[350px] md:w-full rounded-sm mb-2">
          <Image
            className={`rounded-lg`}
            src={image || Default}
            fill
            priority
            sizes="(min-width: 180px), 80vw, 100vw"
            alt={item?.title?.rendered as string}
            style={{
              objectFit: 'cover',
              animationDuration: `${4000 + 5000}ms`,
            }}
          />
        </div>
        <div className="text-white text-[10px]  md:text-base  font-medium  whitespace-pre-line text-left line-clamp-3">
          {item?.title?.rendered}
        </div>
      </Link>
    </div>
  )
}
