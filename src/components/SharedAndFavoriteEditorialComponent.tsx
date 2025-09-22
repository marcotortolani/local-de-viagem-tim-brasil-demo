'use client'
import { Heart } from 'lucide-react'
import React from 'react'
import { Post, Tag } from '@/lib/api/wp/wp-types'
import { useFavoriteStore } from '@/lib/modules/favorite/favorite-stores'
import { PRIMARY_COLOR } from '@/lib/constants'
// import { getCategoryColor } from '@/lib/modules/category/category-utils'
import { Shared } from '@/components/Shared'

type SharedAndFavoriteEditorialComponentProps = {
  item: Post
  tags?: Tag[]
}

export const SharedAndFavoriteEditorialComponent: React.FC<
  SharedAndFavoriteEditorialComponentProps
> = ({ item, tags = [] }) => {
  const { addEditorial, editorial, removeEditorial } = useFavoriteStore()
  // const { full_categories } = item
  // const category = (full_categories || []).length ? full_categories[0] : null

  return (
    <div className=" flex justify-between items-center gap-2">
      {/* <div
        className="uppercase text-white text-[12px] px-2 flex items-center"
        style={{ backgroundColor: getCategoryColor(item.categories) }}>{category?.name}</div> */}
      <div className="flex items-center justify-center gap-2">
        <div className="mr-2 cursor-pointer">
          <Heart
            color={PRIMARY_COLOR}
            fill={
              editorial.includes(item?.id as number) ? PRIMARY_COLOR : 'none'
            }
            onClick={() =>
              editorial.includes(item?.id as number)
                ? removeEditorial(item?.id as number)
                : addEditorial(item?.id as number)
            }
          />
        </div>
        <Shared tags={tags} item={item} />
      </div>
    </div>
  )
}
