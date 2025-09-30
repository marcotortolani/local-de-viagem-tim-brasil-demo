'use client'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import React from 'react'
import { Post } from '@/lib/api/wp/wp-types'
import { FavoriteEditorialSectionItem } from '@/components/favorites/FavoriteEditorialSectionItem'
import { SectionTitle } from '@/components/text/SectionTitle'

import dictionary from '@/dictionary/lang.json'

type FavoriteEditorialSectionProps = {
  title?: string
  moreLink?: string
  items: Post[]
  isRounded?: boolean
  isLarge?: boolean
  color?: string
}

export const FavoriteEditorialSection: React.FC<
  FavoriteEditorialSectionProps
> = ({ title, moreLink = '#', items = [], color = 'text-[#FFB626] ' }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <SectionTitle color={color}>{title}</SectionTitle>
        {items.length > 4 && (
          <Link
            href={moreLink}
            className="text-white text-xs md:text-[16px]  font-normal flex items-center"
          >
            {dictionary['See more']} <ChevronRight size={20} className="ml-1" />
          </Link>
        )}
      </div>

      {items.length ? (
        <Swiper
          className="relative h-full w-full mb-4 md:px-2"
          initialSlide={0}
          navigation={false}
          pagination={false}
          modules={[Navigation, Pagination, Autoplay]}
          speed={1500}
          breakpoints={{
            0: {
              slidesPerView: 2.5,
              spaceBetween: 10,
              direction: 'horizontal',
            },
            768: {
              slidesPerView: 3.15,
              spaceBetween: 15,
              direction: 'horizontal',
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 20,
              direction: 'horizontal',
            },
            1440: {
              slidesPerView: 4.2,
              spaceBetween: 20,
              direction: 'horizontal',
            },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} className=" py-3">
              <FavoriteEditorialSectionItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-white text-center bg-neutral-500 py-4 rounded-xl ">
          {dictionary['No notes available']}
        </div>
      )}
    </div>
  )
}
