import Default from '/public/images/default.webp'
import Image from 'next/image'
import React from 'react'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import Link from 'next/link'

type EditorialCarouselItemProps = {
  item: Post
  pathSection?: string
}

export const EditorialCarouselItem2: React.FC<EditorialCarouselItemProps> = ({
  item,
  pathSection = '/',
}) => {
  const image = wpImage(item) || Default
  return (
    <div className="flex flex-col">
      <Link href={`${pathSection}/${item.slug}`} prefetch className="mb-2">
        <div
          className={`relative aspect-square h-[113px] md:h-[300px] lg:h-[350px] w-full flex items-center justify-center`}
        >
          <Image
            className="rounded-lg"
            src={image}
            fill
            alt={item.title?.rendered as string}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <p className="text-white text-[11px] md:text-[16px] font-medium whitespace-pre-line line-clamp-3 text-left">
          {item?.title?.rendered}
        </p>
      </Link>
    </div>
  )
}
