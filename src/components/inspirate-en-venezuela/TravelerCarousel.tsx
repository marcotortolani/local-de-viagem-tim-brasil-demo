'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'

import { Category } from '@/lib/api/wp/wp-types'
import { TravelerItemsCarousel } from './TravelerItemsCarousel'

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'

type TravelerCarouselSectionProps = {
  items: Category[]
  pagination?: boolean
  navigation?: boolean
}

export const TravelerCarousel: React.FC<TravelerCarouselSectionProps> = ({
  items = [],
  pagination,
  navigation,
}) => {
  return (
    <Swiper
      className="relative h-full w-full mb-4 px-4 lg:px-8 pb-10"
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
          slidesPerView: 4.1,
          spaceBetween: 5,
          direction: 'horizontal',
          centeredSlides: false,
          // centeredSlidesBounds: true,
        },
        768: {
          slidesPerView: 4.2,
          spaceBetween: 15,
          direction: 'horizontal',
        },
        1024: {
          slidesPerView: 5.2,
          spaceBetween: 20,
          direction: 'horizontal',
        },
        1440: {
          slidesPerView: 5.2,
          spaceBetween: 60,
          direction: 'horizontal',
        },
        1920: {
          slidesPerView: 7,
          spaceBetween: 40,
          direction: 'horizontal',
        },
      }}
    >
      {navigation && (
        <ArrowLeftCircleIcon className=" swiper-button-prev text-white" />
      )}

      {items.map((category, index) => (
        <SwiperSlide key={index} className="h-full ">
          <TravelerItemsCarousel category={category} />
        </SwiperSlide>
      ))}
      {navigation && (
        <ArrowRightCircleIcon className=" swiper-button-next text-white" />
      )}
    </Swiper>
  )
}
