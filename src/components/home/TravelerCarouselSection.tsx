'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'

import { Category } from '@/lib/api/wp/wp-types'
import { TravelerCarouselSectionItem } from '@/components/home/TravelerCarouselSectionItem'

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'

type TravelerCarouselSectionProps = {
  items: Category[]
}

export const TravelerCarouselSection: React.FC<
  TravelerCarouselSectionProps
> = ({ items = [] }) => {
  return (
    <div className=" z-0 relative w-full max-w-screen-3xl mx-auto h-full overflow-hidden pt-20  ">
      <div className="absolute top-0 z-0 w-full h-full  ">
        <Image
          className="w-auto h-full object-cover object-center"
          src="/images/bg-viajeros.webp"
          alt="Image banner chatbot desktop version"
          fill
        />
      </div>
      <div className="relative w-full max-w-screen-2xl mx-auto h-full flex flex-col items-center">
        <Swiper
          className="relative h-full w-full mb-4 lg:px-8 xl:px-14"
          initialSlide={0}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={false}
          modules={[Navigation, Pagination, Autoplay]}
          speed={1500}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 5,
              direction: 'horizontal',
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 15,
              direction: 'horizontal',
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
              direction: 'horizontal',
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 60,
              direction: 'horizontal',
            },
          }}
        >
          <ArrowLeftCircleIcon className=" swiper-button-prev text-white" />
          
          {items.map((category, index) => (
            <SwiperSlide key={index} className="h-full px-2 md:px-4 ">
              <TravelerCarouselSectionItem category={category} />
            </SwiperSlide>
          ))}
          <ArrowRightCircleIcon className=" swiper-button-next text-white" />
        </Swiper>
        <p className="z-20 relative h-16 mt-10 font-poppins text-xl md:text-2xl xl:text-4xl text-white text-center">
          Conoce a
          <span className="font-semibold text-tertiary">
            {' '}
            Nuestros Viajeros
          </span>
        </p>
      </div>
    </div>
  )
}
