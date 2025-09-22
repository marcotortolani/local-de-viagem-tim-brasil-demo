import React from 'react'
import Image from 'next/image'
import Default from '/public/images/default.webp'
import { Post } from '@/lib/api/wp/wp-types'
import Link from 'next/link'
import { wpImage } from '@/lib/api/wp/wp-utils'

type EditorialCarouselSectionItemProps = {
  item: Post
}

export const EditorialCarouselSectionItem: React.FC<
  EditorialCarouselSectionItemProps
> = ({ item }) => {
  const image = wpImage(item) || Default

  return (
    <div className="flex justify-center flex-col w-auto">
      <Link href={`/contenido/editorial/${item?.slug}`} prefetch>
        <div className="relative mb-2  h-[140px] w-full  md:h-[300px] lg:h-[350px]">
          <Image
            className="rounded-[5px]"
            src={image}
            fill
            alt={item?.title?.rendered as string}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>
      <Link href={`/contenido/editorial/${item?.slug}`} prefetch>
        <div className="text-white text-[11px] md:text-[16px] font-medium whitespace-pre-line text-left">
          {item?.title?.rendered}
        </div>
      </Link>
    </div>
  )
}
