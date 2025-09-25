'use client'
import React from 'react'
import Image from 'next/image'
import Default from '/public/images/default.webp'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { SECONDARY_DARK_COLOR } from '@/lib/constants'
import { useFavoriteStore } from '@/lib/modules/favorite/favorite-stores'
import { htmlToText } from 'html-to-text'
import { PlayIcon } from '../video/PlayIcon'

type FavoriteVideoCarouselSectionItemProps = {
  item: Post
}

export const FavoriteVideoSectionItem: React.FC<
  FavoriteVideoCarouselSectionItemProps
> = ({ item }) => {
  const image = wpImage(item)
  const { removeVideo } = useFavoriteStore()

  return (
    <div className="flex justify-center flex-col w-auto relative border-4 md:border-8 border-white rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out">
      <Link href={`/favorites/videos/${item.slug}`} prefetch>
        <div
          className={`relative h-[178px]  md:h-[300px] lg:h-[350px] w-full flex items-center justify-center`}
        >
          <Image
            className={''}
            src={image || Default}
            fill
            alt={item.title?.rendered as string}
            style={{
              objectFit: 'cover',
            }}
          />
          <div className="bg-black/30 absolute top-0 z-1 w-full h-full px-2 pb-2 flex items-end hover:bg-transparent transition-all duration-300 ease-in-out ">
            <p className="px-2 bg-white text-black text-[11px] font-medium md:text-[16px] whitespace-pre-line text-left line-clamp-2">
              {htmlToText(item.title?.rendered as string)}
            </p>
          </div>
          <PlayIcon />
        </div>
      </Link>
      <div
        className="absolute z-50 right-0 mt-2 mr-2 top-2 hover:cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out hover:animate-pulse"
        onClick={() => removeVideo(item.id as number)}
      >
        <Heart
          color={SECONDARY_DARK_COLOR}
          fill={SECONDARY_DARK_COLOR}
          className=" w-6 h-6  lg:w-8 lg:h-8"
        />
      </div>
    </div>
  )
}
