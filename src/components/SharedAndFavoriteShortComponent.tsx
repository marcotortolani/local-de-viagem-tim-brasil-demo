'use client'
import { Heart } from 'lucide-react'
import React from 'react'
import { Post, Tag } from '@/lib/api/wp/wp-types'
import { useFavoriteStore } from '@/lib/modules/favorite/favorite-stores'
import { Shared } from '@/components/Shared'
import { PRIMARY_COLOR } from '@/lib/constants'

type SharedAndFavoriteShortComponentProps = {
  item?: Post
  tags: Tag[]
}

export const SharedAndFavoriteShortComponent: React.FC<
  SharedAndFavoriteShortComponentProps
> = ({ item, tags = [] }) => {
  const { shorts, addShort, removeShort } = useFavoriteStore()
  return (
    <div className="flex relative">
      <div className=" cursor-pointer mr-3 relative">
        <Heart
          // color={PRIMARY_COLOR}
          color={'#fff'}
          fill={shorts.includes(item?.id as number) ? PRIMARY_COLOR : 'none'}
          onClick={() =>
            shorts.includes(item?.id as number)
              ? removeShort(item?.id as number)
              : addShort(item?.id as number)
          }
        />
      </div>
      <Shared
        tags={tags}
        item={item}
        currentUrl={`/shorts/${item?.id as number}`}
        fill={'fill-white'}
      />
    </div>
  )
}
