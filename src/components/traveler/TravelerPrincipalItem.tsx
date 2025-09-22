'use client'
import React from 'react'
import { Category } from '@/lib/api/wp/wp-types'
import Link from 'next/link'
import Image from 'next/image'

import travelerIcon from '/public/icons/corresponsales-icon.svg'

type TravelerPrincipalItemProps = {
  item: Category
}

export const TravelerPrincipalItem: React.FC<TravelerPrincipalItemProps> = ({
  item,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Link
        href={`/corresponsales/${item?.slug}`}
        prefetch
        className="w-full group flex flex-col items-center gap-2"
      >
        <div
          className={`relative w-full aspect-square overflow-hidden rounded-full `}
        >
          {item?.image ? (
            <Image
              className="group-hover:scale-110 group-active:scale-100 transition-all duration-200 ease-in-out "
              src={item?.image as string}
              fill
              alt={item?.name as string}
              style={{
                objectFit: 'cover',
              }}
            />
          ) : (
            <div className=" w-full h-full p-2 lg:p-4 overflow-hidden flex items-center justify-center bg-neutral-700 group-hover:scale-110 group-active:scale-100 transition-all duration-200 ease-in-out rounded-full">
              <Image
                className="w-2/4 h-auto "
                src={travelerIcon}
                alt={item?.name as string}
              />
            </div>
          )}
        </div>
        <h4 className="relative w-fit text-white text-[13px] leading-[auto] font-semibold md:text-xl break-words text-center">
          {item?.name}
          <div className=" absolute left-0 bg-primary/60 w-full h-0.5 scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-all duration-200 ease-in-out rounded-full"></div>
        </h4>
      </Link>
    </div>
  )
}
