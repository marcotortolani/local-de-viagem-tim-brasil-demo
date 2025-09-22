'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'

type Props = {
  item?: Post
  flag?: string
  title?: string
}

export const Banner2: React.FC<Props> = ({ item, flag, title }) => {
  const image = wpImage(item) || '/images/default.webp'

  return (
    <div className="relative w-full h-[196px] md:h-auto aspect-[3/1] xl:aspect-[4/1] mb-2">
      <Image
        className="rounded-lg"
        src={image}
        alt="logo"
        fill
        style={{
          objectFit: 'cover',
        }}
      />
      <div className="absolute w-full h-full top-0 p-4 md:px-6 xl:px-10 xl:py-6 flex flex-col justify-around bg-gradient-to-r from-black/90 via-black/70 to-transparent xl:via-black/60 left-0">
        <div className="z-0 flex items-center mb-2">
          <div className="relative z-20 h-7 w-7 lg:h-9 lg:w-9 overflow-hidden border bg-black border-white rounded-full">
            <Image
              className="w-auto h-full rounded-full z-10 "
              src={flag || '/images/placeholder-flag.webp'}
              alt="Flag Image"
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
          <h3 className="bg-primary -z-10 relative -left-2 pl-6 pr-4 text-white font-semibold text-[11px] lg:text-base text-nowrap flex items-center rounded-r-full">
            {title}
          </h3>
        </div>

        <div className="mb-2">
          <h4 className="text-white font-semibold text-xl md:text-3xl xl:text-4xl">
            {item?.title?.rendered || ''}
          </h4>
          {item?.content?.rendered && (
            <p className=" w-3/5 max-w-[300px] text-[10px] md:text-xs leading-3 text-white/80 font-light line-clamp-3">
              {
                item?.content?.rendered
                  .split('\n')[0]
                  .split('>')[1]
                  .split('<')[0]
              }
            </p>
          )}
        </div>
        <Link
          href={`/recorriendo-venezuela/${item?.slug}`}
          className="w-fit px-8 py-1 text-[12px] lg:text-base font-light bg-secondary rounded-full flex justify-center text-white items-center"
        >
          VER AHORA
        </Link>
      </div>
    </div>
  )
}
