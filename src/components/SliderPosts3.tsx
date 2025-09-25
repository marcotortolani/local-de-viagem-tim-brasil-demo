'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'
import '../app/(root)/(categories)/around-the-world/style.css'
import { Post } from '@/lib/api/wp/wp-types'
import { SquareCardDescription } from './SquareCardDescription'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'

export const SliderPosts3 = ({
  posts,
  categorySlug = '',
  pagination = true,
  navigation = false,
}: {
  posts: Post[]
  categorySlug?: string
  pagination?: boolean
  navigation?: boolean
}) => {
  return (
    <div className=" relative w-full h-full mb-4 md:mb-0 lg:mb-12  px-4 lg:px-4 ">
      <Swiper
        className="relative h-full w-full pb-14"
        initialSlide={0}
        navigation={
          navigation
            ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            : false
        }
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
            slidesPerView: 3,
            spaceBetween: 60,
            direction: 'horizontal',
          },
          2054: {
            slidesPerView: 4,
            spaceBetween: 60,
            direction: 'horizontal',
          },
        }}
      >
        {navigation && (
          <ArrowLeftCircleIcon className="swiper-button-prev -translate-x-2 -translate-y-4 text-white" />
        )}
        {posts.map((post, index) => (
          <SwiperSlide key={index} className="h-full ">
            <SquareCardDescription item={post} categorySlug={categorySlug} />
          </SwiperSlide>
        ))}
        {navigation && (
          <ArrowRightCircleIcon className="swiper-button-next translate-x-2 -translate-y-4 text-white" />
        )}
      </Swiper>
    </div>
  )
}
