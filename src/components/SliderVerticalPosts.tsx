'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'

import { Post } from '@/lib/api/wp/wp-types'

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'
import { VerticalCard } from './VerticalCard'

export const SliderVerticalPosts = ({
  posts,
  pagination = false,
  parentSlug = '',
}: {
  posts: Post[]
  pagination?: boolean
  parentSlug?: string
}) => {

  return (
    <div className=" relative w-full h-full mb-4 md:mb-8 lg:mb-12 px-4 lg:px-4 ">
      <Swiper
        className="relative h-full w-full px-10 md:px-6 lg:px-9 "
        initialSlide={0}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={pagination}
        modules={[Navigation, Pagination, Autoplay]}
        speed={1500}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            direction: 'horizontal',
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
            direction: 'horizontal',
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            direction: 'horizontal',
          },
          1920: {
            slidesPerView: 5,
            spaceBetween: 60,
            direction: 'horizontal',
          },
          2054: {
            slidesPerView: 5,
            spaceBetween: 60,
            direction: 'horizontal',
          },
        }}
      >
        <ArrowLeftCircleIcon className="swiper-button-prev -translate-x-2 -translate-y-4 text-white" />
        {posts.map((post, index) => (
          <SwiperSlide key={index} className="h-full ">
            <VerticalCard item={post} categorySlug={parentSlug} />
          </SwiperSlide>
        ))}
        <ArrowRightCircleIcon className="swiper-button-next translate-x-2 -translate-y-4 text-white" />
      </Swiper>
    </div>
  )
}
