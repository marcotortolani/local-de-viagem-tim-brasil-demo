import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import { htmlToText } from 'html-to-text'
import { REGION_TAGS } from '@/lib/constants'

import { Play } from 'lucide-react'

export const VerticalCard = ({
  item,
  categorySlug,
}: {
  item: Post
  categorySlug: string
}) => {
  const regionTag = REGION_TAGS.find((tag) => item.tags?.includes(tag.id))
  const isVideo = item?.video?.url?.includes('http') ? true : false
  let urlRedirect = ''
  
  if (isVideo) {
    urlRedirect = `${categorySlug}/videos`
  } else {
    urlRedirect = `${categorySlug}/editorial`
  }

  return (
    <Link
      href={`/${urlRedirect}/${item.slug}`}
      prefetch
      className=" w-full h-full"
    >
      <div className=" relative w-full h-full space-y-2 ">
        <div className=" relative w-full h-auto aspect-[8/11] border-4 bg-white border-white overflow-hidden rounded-3xl ">
          <Image
            className=" w-full h-full object-cover object-center rounded-xl"
            src={wpImage(item) || '/images/default.webp'}
            fill
            priority
            alt={item.title?.rendered as string}
          />
          {regionTag && (
            <span
              className=" absolute top-4 right-4 px-2 py-0.5 font-oswald italic text-sm lowercase border border-white rounded-full"
              style={{ backgroundColor: regionTag.color }}
            >
              #{regionTag?.slug}
            </span>
          )}
          <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
            {isVideo && (
              <div className=" w-14 h-14 md:w-20 md:h-20 lg:w-22 lg:h-22 p-2 md:p-3 lg:p-4 bg-black/40 rounded-full flex items-center justify-center">
                <Play className="w-full h-full ml-1 text-transparent fill-white" />
              </div>
            )}
          </div>

          <div className=" z-20 absolute bottom-0 w-full h-full px-2 pointer-events-none select-none">
            <h4
              className={` absolute bottom-3 md:bottom-5 md:left-4 w-5/6 font-oswald text-sm md:text-lg lg:text-xl text-black line-clamp-2 font-normal italic text-start  pointer-events-none select-none`}
            >
              <span className=" px-2 pr-3 bg-white/70 box-decoration-clone leading-[1.4rem] md:leading-[1.9rem] lg:leading-[2.1rem]">
                {htmlToText(item.title?.rendered as string)}
              </span>
            </h4>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const SkeletonCard = () => {
  return (
    <div className="relative w-full aspect-[4/5] bg-neutral-300 opacity-70 p-1 rounded-xl animate-pulse">
      <div className=" w-full h-full bg-neutral-700 rounded-[inherit]"></div>
      <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
        <div className=" w-14 h-14 bg-neutral-600 rounded-full"></div>
      </div>
      <p className=" absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-600 h-8 w-5/6 mx-auto"></p>
    </div>
  )
}
