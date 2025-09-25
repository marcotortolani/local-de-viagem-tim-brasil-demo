import React from 'react'
import Image from 'next/image'
import Default from '/public/images/default.webp'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import Link from 'next/link'
import { htmlToText } from 'html-to-text'

import { PlayIcon } from '../video/PlayIcon'

type SearchItemProps = {
  item: Post
}

export const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  const image = wpImage(item)

  const editorialRoute = item.video.url ? 'videos' : 'editorial'

  return (
    <div className="flex justify-center flex-col w-auto relative border-4 border-white rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out">
      <Link href={`/content/${editorialRoute}/${item.slug}`} prefetch>
        <div className="relative h-[184px] w-full md:h-[300px] rounded-sm">
          <Image
            className="rounded-sm"
            src={image || Default}
            fill
            priority
            sizes="(min-width: 180px), 80vw, 100vw"
            alt={item.title?.rendered as string}
            style={{
              objectFit: 'cover',
              animationDuration: `${4000 + 5000}ms`,
            }}
          />
          <div className="bg-black bg-opacity-30 absolute top-0 z-1 w-full h-full px-2 pb-2 flex items-end ">
            <p className="px-2 bg-white text-black text-[11px] font-medium md:text-[16px] whitespace-pre-line text-left line-clamp-2">
              {htmlToText(item.title?.rendered as string)}
            </p>
          </div>
        </div>
        <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
          {editorialRoute === 'videos' && <PlayIcon />}
        </div>
      </Link>
    </div>
  )
}
