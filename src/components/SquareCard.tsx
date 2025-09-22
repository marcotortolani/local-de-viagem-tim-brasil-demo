import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import { htmlToText } from 'html-to-text'

import { REGION_TAGS } from '@/lib/constants'
import { PlayIcon } from './video/PlayIcon'

export const SquareCard = ({
  item,
  categorySlug,
}: {
  item: Post
  categorySlug: string
}) => {
  const regionTag = REGION_TAGS.find((tag) => item.tags?.includes(tag.id))
  const isVideo = item?.video?.url?.length ? true : false
  const currentDate = new Date()
  const recentPost =
    new Date(item.date as string) >=
    new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) // subido en los ultimos 7 dias

  let urlRedirect = ''

  if (isVideo) {
    urlRedirect = `${categorySlug}/videos`
  } else {
    urlRedirect = `${categorySlug}/editorial`
  }

  return (
    <Link href={`/${urlRedirect}/${item.slug}`} prefetch>
      <div className=" relative w-full h-auto aspect-square border-4 bg-white border-white overflow-hidden rounded-3xl ">
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
        <div className=" absolute top-0 left-0 w-full h-full px-2 pb-14 md:pb-6 flex items-end justify-start ">
          {recentPost && (
            <div className=" absolute top-4 left-4 w-fit px-2 flex items-center justify-center bg-primary rounded-full">
              <span className=" text-white">Nuevo</span>
            </div>
          )}
          <h4
            className={` absolute bottom-3 md:bottom-5 md:left-4 w-5/6 font-oswald text-sm md:text-lg lg:text-xl text-black line-clamp-2 font-normal italic text-start  pointer-events-none select-none`}
          >
            <span className=" px-2 pr-3 bg-white/70 box-decoration-clone leading-[1.4rem] md:leading-[1.9rem] lg:leading-[2.1rem]">
              {htmlToText(item.title?.rendered as string)}
            </span>
          </h4>
        </div>
        <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
          {isVideo && <PlayIcon />}
        </div>
      </div>
    </Link>
  )
}
