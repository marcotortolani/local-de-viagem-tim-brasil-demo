'use client'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import React from 'react'

import { Post } from '@/lib/api/wp/wp-types'

import { ShortPosterItem } from '@/components/short/ShortPosterItem'

type ShortCarouselProps = {
  items: Post[]
}

export const ShortCarousel: React.FC<ShortCarouselProps> = ({ items = [] }) => {
  return (
    <Swiper
      className="relative h-full w-full mb-4 px-4 lg:px-6"
      initialSlide={0}
      navigation={false}
      pagination={false}
      modules={[Navigation, Pagination, Autoplay]}
      speed={1500}
      breakpoints={{
        0: {
          slidesPerView: 3.25,
          spaceBetween: 5,
          direction: 'horizontal',
        },
        768: {
          slidesPerView: 3.15,
          spaceBetween: 15,
          direction: 'horizontal',
        },
        1024: {
          slidesPerView: 4.2,
          spaceBetween: 20,
          direction: 'horizontal',
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 20,
          direction: 'horizontal',
        },
        1920: {
          slidesPerView: 5,
          spaceBetween: 20,
          direction: 'horizontal',
        },
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <ShortPosterItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
