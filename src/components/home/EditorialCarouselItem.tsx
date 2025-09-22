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

export const EditorialCarouselItem: React.FC<EditorialCarouselItemProps> = ({
  item,
  pathSection = '/',
}) => {
  const image = wpImage(item) || Default
  return (
    <Link
      href={`${pathSection}${item.slug}`}
      prefetch
      className=" w-full h-full"
    >
      <div className="w-full mb-2">
        <div
          className={`relative aspect-square lg:aspect-video w-full flex items-center justify-center`}
        >
          <Image
            className="rounded-2xl w-full h-full"
            src={image}
            fill
            alt={item.title?.rendered as string}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <p className="px-1 mt-1 text-white/80 text-[10px] md:text-[16px] line-clamp-2 font-light whitespace-pre-line text-left">
          {item?.title?.rendered}
        </p>
      </div>
    </Link>
  )
}
