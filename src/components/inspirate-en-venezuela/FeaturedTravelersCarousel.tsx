'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'
import './style.css'

import { Category } from '@/lib/api/wp/wp-types'
import Default from '/public/images/default.webp'

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'

type TravelerCarouselSectionProps = {
  items: Category[]
  pagination?: boolean
  navigation?: boolean
}

export const FeaturedTravelersCarousel: React.FC<
  TravelerCarouselSectionProps
> = ({ items = [], pagination, navigation }) => {
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
          slidesPerView: 2.25,
          spaceBetween: 10,
          direction: 'horizontal',
          centeredSlides: false,
          //  centeredSlidesBounds: true,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 15,
          direction: 'horizontal',
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
          direction: 'horizontal',
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 60,
          direction: 'horizontal',
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 40,
          direction: 'horizontal',
        },
      }}
    >
      {navigation && (
        <ArrowLeftCircleIcon className=" swiper-button-prev text-white" />
      )}

      {items.map((category, index) => (
        <SwiperSlide key={index} className="h-full mb-6">
          <FeaturedTravelerItem category={category} />
        </SwiperSlide>
      ))}
      {navigation && (
        <ArrowRightCircleIcon className=" swiper-button-next text-white" />
      )}
    </Swiper>
  )
}

export const FeaturedTravelerItem = ({ category }: { category: Category }) => {
  const name = category?.name?.replaceAll('-', ' ')

  return (
    <Link href={`/inspired-by/travelers/${category?.slug}`} prefetch>
      <div className="w-full h-full flex flex-col items-center gap-2">
        <div
          className={`relative w-full aspect-[5/6] overflow-hidden border-2 lg:border-4 border-solid border-tertiary rounded-3xl `}
        >
          <Image
            className=" "
            src={(category?.image as string) || Default}
            fill
            priority
            alt={category?.name as string}
            style={{
              objectFit: 'cover',
            }}
          />
          <div className="z-20 absolute w-full h-full pb-5 md:pb-10 flex items-end justify-center bg-gradient-to-b from-transparent via-transparent to-black/40">
            <span className="  text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-wrap line-clamp-1 leading-normal font-oswald tracking-wide text-center">
              {name}
            </span>
          </div>
        </div>
        <span className=" z-20 absolute bottom-0.5 translate-y-1/2 bg-tertiary px-6 py-1 uppercase text-neutral-700 text-sm md:text-base font-oswald font-semibold text-center rounded-full">
          Ver más
        </span>
      </div>
    </Link>
  )
}
