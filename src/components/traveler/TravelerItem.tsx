import React from 'react'
import Image from 'next/image'
import Default from '/public/images/default.webp'
import { Category, Post } from '@/lib/api/wp/wp-types'
import Link from 'next/link'
import { wpImage } from '@/lib/api/wp/wp-utils'

type TravelerItemProps = {
  item: Post
  category: Category
}

export const TravelerItem: React.FC<TravelerItemProps> = ({
  item,
  category,
}) => {
  const image = wpImage(item)

  return (
    <Link href={`/corresponsales/${category.slug}/${item?.slug}`} prefetch>
      <div className="relative w-full aspect-[9/14] mb-2 rounded-sm md:rounded-lg">
        <Image
          className={`rounded-[inherit]`}
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
      <div className="capitalize text-white text-[11.3px]  md:text-xl  font-medium  whitespace-pre-line text-left line-clamp-3">
        {/* {item?.title?.rendered} */}
        {item?.title?.rendered.replace('&#038;', '&')}
      </div>
    </Link>
  )
}
