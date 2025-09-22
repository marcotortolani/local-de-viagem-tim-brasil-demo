import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'

import { htmlToText } from 'html-to-text'
import { PlayIcon } from './video/PlayIcon'
import { REGION_TAGS } from '@/lib/constants'

export const HorizontalCard2 = ({
  item,
  index,
  categorySlug,
}: {
  item: Post
  index: number
  categorySlug: string
}) => {
  const regionTag = REGION_TAGS.find((tag) => item.tags?.includes(tag.id))
  const isVideo = item?.video?.url?.length ? true : false

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
      className={`${index === 2 ? ' col-span-2  lg:col-span-1 ' : ''} w-full h-full hover:scale-[102%] transition-all duration-200 ease-in-out`}
    >
      <div className={` relative w-full h-full space-y-2`}>
        <div className=" relative w-full h-auto aspect-video border-4 bg-white border-white overflow-hidden rounded-2xl shadow-md shadow-black/60 ">
          <Image
            className=" w-full h-full object-cover object-center rounded-xl"
            src={wpImage(item) || '/images/default.webp'}
            fill
            alt={item.title?.rendered as string}
          />
          <span
            className={`${isVideo ? 'bg-secondary' : 'bg-tertiary'} absolute top-4 left-4 px-2 py-0.5 lg:px-4 font-oswald italic text-sm lg:text-base border border-white rounded-full`}
          >
            {isVideo ? 'Video' : 'Editorial'}
          </span>
          {regionTag && (
            <span
              className=" absolute top-4 right-4 px-2 py-0.5 lg:px-4 font-oswald italic text-sm lg:text-base lowercase border border-white rounded-full"
              style={{ backgroundColor: regionTag.color }}
            >
              #{regionTag?.slug}
            </span>
          )}

          <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
            {isVideo && <PlayIcon />}
          </div>
          <div className=" z-20 absolute bottom-0 w-full h-full px-2 pointer-events-none select-none">
            <h4
              className={` absolute bottom-3 md:bottom-5 md:left-5 w-5/6 font-oswald text-base md:text-xl lg:text-2xl xl:text-3xl text-black line-clamp-2 font-medium text-start  pointer-events-none select-none`}
            >
              <span className=" px-2 pr-6 bg-white/80 box-decoration-clone leading-[1.2rem] md:leading-[1.9rem] lg:leading-[2.5rem]">
                {htmlToText(item.title?.rendered as string)}
              </span>
            </h4>
          </div>
        </div>
      </div>
    </Link>
  )
}
