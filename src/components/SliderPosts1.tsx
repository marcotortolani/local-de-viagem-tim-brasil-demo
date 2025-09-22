'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'
import '../app/(root)/(categories)/por-el-mundo/style.css'

import { Post } from '@/lib/api/wp/wp-types'

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'

import { SquareCard } from './SquareCard'

export const SliderPosts1 = ({
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
    <div className=" relative w-full h-full mb-0 md:mb-4 lg:mb-12 xl:px-4 ">
      <Swiper
        className="relative h-full w-full pb-14 "
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
            slidesPerView: 2.5,
            spaceBetween: 25,
            direction: 'horizontal',
            centeredSlides: true,
            centeredSlidesBounds: true,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            direction: 'horizontal',
          },
          1920: {
            slidesPerView: 4,
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
        {navigation && (
          <ArrowLeftCircleIcon className="swiper-button-prev -translate-x-2 -translate-y-4 text-white" />
        )}
        {posts.map((post, index) => (
          <SwiperSlide key={index} className="h-full ">
            <SquareCard item={post} categorySlug={categorySlug} />
          </SwiperSlide>
        ))}
        {navigation && (
          <ArrowRightCircleIcon className="swiper-button-next translate-x-2 -translate-y-4 text-white" />
        )}
      </Swiper>
    </div>
  )
}
