import Default from '/public/images/default.webp'
import Image from 'next/image'
import React from 'react'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import Link from 'next/link'

type EditorialCarouselItemProps = {
  item: Post
  category: string
}

export const EditorialCarouselItem3: React.FC<EditorialCarouselItemProps> = ({
  item,
  category,
}) => {
  const image = wpImage(item) || Default
  return (
    <div className="flex flex-col">
      <Link href={`${category}/${item.slug}`} prefetch className="mb-2">
        <div
          className={`relative aspect-square h-[158px] md:h-[300px] lg:h-[350px] w-full flex items-center justify-center`}
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
        <div className="text-white text-[11px] md:text-[16px] font-medium whitespace-pre-line text-left line-clamp-3">
          {item?.title?.rendered}
        </div>
      </Link>
    </div>
  )
}
