'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'

import { Post } from '@/lib/api/wp/wp-types'

import { ArrowLeftCircleIcon, ArrowRightCircleIcon, Play } from 'lucide-react'

import Image from 'next/image'
import { wpImage } from '@/lib/api/wp/wp-utils'
import Link from 'next/link'

export const SliderBigNavigation = ({ posts }: { posts: Post[] }) => {
  return (
    <div className=" relative w-full h-full mb-4 px-2 md:px-4 lg:px-4 ">
      <Swiper
        className="relative h-full w-full lg:px-10 "
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
            slidesPerView: 1,
            spaceBetween: 5,
            direction: 'horizontal',
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 15,
            direction: 'horizontal',
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
            direction: 'horizontal',
          },
          1920: {
            slidesPerView: 1,
            spaceBetween: 40,
            direction: 'horizontal',
          },
          2054: {
            slidesPerView: 1,
            spaceBetween: 60,
            direction: 'horizontal',
          },
        }}
      >
        <ArrowLeftCircleIcon className="swiper-button-prev -translate-x-2 stroke-black" />
        {posts.slice(0, 3).map((post, index) => (
          <SwiperSlide key={index} className="h-full ">
            <Link
              href={`/por-el-mundo/recorriendo-el-mundo/${post.slug}`}
              prefetch
              className="relative w-full h-full"
            >
              <div className=" relative w-full h-auto aspect-video overflow-hidden rounded-2xl ">
                <Image
                  className=" w-full h-full object-cover object-center rounded-xl"
                  src={wpImage(post) || '/images/default.webp'}
                  fill
                  alt={post.title?.rendered as string}
                />
                <div className="absolute top-0 left-0 w-full h-full pt-10 lg:pt-20 xl:pt-32 flex flex-col items-center justify-center gap-2 md:gap-6 lg:gap-10 bg-black/30">
                  <div className=" w-14 h-14 md:w-20 md:h-20 lg:w-28 lg:h-28 p-1 md:p-2 lg:p-3 border-4 md:border-8 lg:border-[12px] border-white rounded-full flex items-center justify-center">
                    <Play className="w-full h-full ml-1 text-transparent fill-white" />
                  </div>
                  <p className=" relative w-2/3 font-oswald text-white text-lg md:text-3xl lg:text-5xl  xl:text-[4rem] xl:leading-[4.5rem] font-normal text-center ">
                    {post.title?.rendered}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <ArrowRightCircleIcon className="swiper-button-next translate-x-2 stroke-black" />
      </Swiper>
    </div>
  )
}
