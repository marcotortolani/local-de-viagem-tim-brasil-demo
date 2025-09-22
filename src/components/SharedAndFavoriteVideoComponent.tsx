'use client'
import { Heart } from 'lucide-react'
import React from 'react'
import { Post, Tag } from '@/lib/api/wp/wp-types'
import { useFavoriteStore } from '@/lib/modules/favorite/favorite-stores'
import { PRIMARY_COLOR } from '@/lib/constants'
import { Shared } from '@/components/Shared'

type SharedAndFavoriteVideoComponentProps = {
  item: Post;
  tags: Tag[]
}

export const SharedAndFavoriteVideoComponent: React.FC<
  SharedAndFavoriteVideoComponentProps
> = ({ item, tags }) => {
  const { addVideo, videos, removeVideo } = useFavoriteStore()
  // const { full_categories } = item
  // const category = full_categories[0]

  return (
    <div className="flex justify-between items-center">
      {/* <div
        className="uppercase text-white text-[12px] bg-[#5EA5A5] px-2 flex items-center">{category.name}</div> */}
      <div className="flex">
        <div className="mr-2 cursor-pointer">
          <Heart
            color={PRIMARY_COLOR}
            fill={videos.includes(item?.id as number) ? PRIMARY_COLOR : 'none'}
            onClick={() =>
              videos.includes(item?.id as number)
                ? removeVideo(item?.id as number)
                : addVideo(item?.id as number)
            }
          />
        </div>
        <Shared item={item} tags={tags} />
      </div>
    </div>
  )
}
