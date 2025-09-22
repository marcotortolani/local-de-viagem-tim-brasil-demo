import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'

import { Play } from 'lucide-react'
import { htmlToText } from 'html-to-text'

export const HorizontalCard = ({
  item,
  index,
  categorySlug,
  isVideo = false,
}: {
  item: Post
  index: number
  categorySlug: string
  isVideo?: boolean
}) => {
  return (
    <Link
      href={`/${categorySlug}/${item.slug}`}
      prefetch
      className={`${index === 2 ? ' col-span-2  lg:col-span-1 ' : ''} w-full h-full`}
    >
      <div className={` relative w-full h-full space-y-2`}>
        <div className=" relative w-full h-auto aspect-video border-4 md:border-8 lg:border-[10px] bg-white border-white overflow-hidden rounded-2xl ">
          <Image
            className=" w-full h-full object-cover object-center rounded-xl"
            src={wpImage(item) || '/images/default.webp'}
            fill
            alt={item.title?.rendered as string}
          />
          <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
            {isVideo ? (
              <div className="w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center border-4 md:border-8 border-white rounded-full">
                <Play className="w-8 h-8 lg:w-12 lg:h-12 text-transparent fill-white" />
              </div>
            ) : (
              <span className="w-fit uppercase inline-flex items-center justify-center rounded-full font-semibold text-sm md:text-lg py-0.5 px-6 bg-tertiary text-black hover:bg-tertiary-dark transition-all duration-300 ease-in-out">
                VER
              </span>
            )}
          </div>
        </div>
        <p className="  relative ml-2 font-oswald text-black text-base md:text-xl lg:text-2xl font-normal line-clamp-2 text-pretty">
          {htmlToText(item.title?.rendered as string)}
        </p>
      </div>
    </Link>
  )
}
