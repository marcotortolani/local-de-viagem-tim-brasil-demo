import Default from '/public/images/default.webp'
import Image from 'next/image'
import React from 'react'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import Link from 'next/link'
import { Play } from 'lucide-react'

type ShortPosterItemProps = {
  item: Post
}

export const ShortPosterItem: React.FC<ShortPosterItemProps> = ({ item }) => {
  const image = wpImage(item) || Default

  return (
    <Link href={`/shorts/${item.slug}`} prefetch>
      <div
        className={`relative aspect-[9/14] w-full flex items-center justify-center border-2 border-white rounded-2xl overflow-hidden`}
      >
        <Image
          className=""
          src={image}
          fill
          alt={item.title?.rendered as string}
          style={{
            objectFit: 'cover',
          }}
        />
        <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
          <div className=" w-14 h-14 md:w-20 md:h-20 lg:w-22 lg:h-22 p-2 md:p-3 lg:p-4 bg-black/40 rounded-full flex items-center justify-center">
            <Play className="w-full h-full ml-1 text-transparent fill-white" />
          </div>
        </div>
      </div>
    </Link>
  )
}
