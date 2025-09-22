'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'

import { Post } from '@/lib/api/wp/wp-types'

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'
import { wpImage } from '@/lib/api/wp/wp-utils'

export const SliderRoundedPosts = ({
  posts,
  categorySlug,
}: {
  posts: Post[]
  categorySlug: string
}) => {
  return (
    <div className=" relative w-full max-w-screen-2xl mx-auto h-fit px-2 md:px-2 ">
      <Swiper
        className="relative h-full w-full md:px-6 lg:px-9 "
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
            slidesPerView: 2.5,
            spaceBetween: 20,
            direction: 'horizontal',
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
            direction: 'horizontal',
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
            direction: 'horizontal',
          },
          1920: {
            slidesPerView: 5,
            spaceBetween: 40,
            direction: 'horizontal',
          },
          2054: {
            slidesPerView: 5,
            spaceBetween: 60,
            direction: 'horizontal',
          },
        }}
      >
        <div className=" absolute top-0 left-0 w-full h-full hidden md:flex ">
          <ArrowLeftCircleIcon className="swiper-button-prev -translate-x-2 -translate-y-6 text-white" />
          <ArrowRightCircleIcon className="swiper-button-next translate-x-2 -translate-y-6 text-white" />
        </div>
        {posts.map((post, index) => (
          <SwiperSlide key={index} className="h-full ">
            <VerticalCard item={post} categorySlug={categorySlug} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export const VerticalCard = ({
  item,
  categorySlug,
}: {
  item: Post
  categorySlug: string
}) => {
  return (
    <Link href={`/${categorySlug}/${item.slug}`} prefetch>
      <div className=" relative w-full h-full flex flex-col items-center gap-4 ">
        <div className=" relative w-full h-auto aspect-square border-8 lg:border-[14px] bg-white border-white overflow-hidden rounded-full ">
          <Image
            className=" w-full h-full object-cover object-center rounded-xl"
            src={wpImage(item) || '/images/default.webp'}
            fill
            alt={item.title?.rendered as string}
          />
          <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
            <span className="w-fit uppercase inline-flex items-center justify-center rounded-full font-semibold text-lg py-0.5 px-6 bg-secondary-dark text-white hover:bg-secondary transition-all duration-300 ease-in-out">
              VER
            </span>
          </div>
        </div>
        <p className=" relative w-fit px-4 py-1 font-oswald bg-tertiary text-black text-base text-center md:text-lg lg:text-xl font-normal line-clamp-1 rounded-full">
          {item.title?.rendered}
        </p>
      </div>
    </Link>
  )
}
