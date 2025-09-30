'use client'
import { useState, FC, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ValidationContext } from '@/providers/validation-provider'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { getParagraphText } from '@/lib/utils'
import { htmlToText } from 'html-to-text'
import { Category, Post } from '@/lib/api/wp/wp-types'

import Default from '/public/images/default.webp'
import BannerSuscription from './BannerSuscription'
import { mergePostCategories } from '@/lib/modules/post/post-utils'

import dictionary from '@/dictionary/lang.json'

type CarouselHomeProps = {
  posts: Post[]
  categories: Category[]
}

export const CarouselHome: FC<CarouselHomeProps> = ({ posts, categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { userEnabled } = useContext(ValidationContext)

  // Generador de números pseudo-aleatorios con seed
  function seededRandom(seed: number) {
    const a = 1664525
    const c = 1013904223
    const m = Math.pow(2, 32)

    return function () {
      seed = (a * seed + c) % m
      return seed / m
    }
  }

  function shuffleByDate<T>(array: T[], date?: Date): T[] {
    const targetDate = date || new Date()

    // Usar directamente los números de la fecha como parte del seed
    const day = targetDate.getDate()
    const month = targetDate.getMonth() + 1
    const year = targetDate.getFullYear()

    // Combinar de forma que fechas cercanas den resultados muy diferentes
    const seed = year * 10000 + month * 100 + day + array.length * 7919

    const random = seededRandom(seed)

    const shuffled = [...array]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
  }

  const slidesShuffle = shuffleByDate(posts) || []
  const slides = mergePostCategories(slidesShuffle, categories).slice(0, 5)

  if (!posts.length) return null

  return (
    <div className="relative w-full h-full">
      <div className="z-20 absolute top-20 md:top-0 w-full h-20 pb-6 bg-gradient-to-b from-primary-dark to-transparent flex items-center justify-center">
        <p className=" font-poppins font-extralight uppercase text-sm sm:text-base md:text-lg xl:text-xl text-white ">
          {dictionary['The world is just one']}{' '}
          <span className=" font-medium text-tertiary">
            {dictionary['Click Away!']}
          </span>
        </p>
      </div>
      <Swiper
        className="h-[90svh] max-h-[700px] xl:min-h-[800px] w-full overflow-hidden"
        initialSlide={0}
        navigation={false}
        pagination
        modules={[Navigation, Pagination, Autoplay]}
        speed={3000}
        autoplay
        loop
        onSlideChange={(el) => setCurrentIndex(el.realIndex)}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            direction: 'horizontal',
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            direction: 'horizontal',
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            direction: 'horizontal',
          },
          1440: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            direction: 'horizontal',
          },
          1920: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            direction: 'horizontal',
          },
          2560: {
            slidesPerView: 2,
            spaceBetween: 50,
            centeredSlides: true,
            direction: 'horizontal',
          },
        }}
      >
        {slides?.map(({ title, featured_image, slug, excerpt, video }, i) => {
          const urlImage = featured_image?.length ? featured_image[0] : Default
          const postType = video?.url ? 'videos' : 'editorial'
          // const category =
          //   full_categories?.length > 1
          //     ? full_categories[0]
          //     : full_categories[0]

          return (
            <SwiperSlide key={i}>
              <div className="relative mx-auto w-full h-full  flex flex-col items-center justify-center md:rounded-xl ">
                <div className="relative top-0 w-full h-full md:pb-32 lg:pb-48 overflow-hidden flex justify-center items-center">
                  <Image
                    className={`relative w-full h-auto md:rounded-[inherit] ${currentIndex === i ? 'animation-slide-image' : ''}`}
                    src={urlImage}
                    fill
                    priority={!i}
                    sizes="(min-width: 180px), 80vw, 100vw"
                    alt={title?.rendered as string}
                    style={{
                      objectFit: 'cover',
                      animationDuration: `${8000 + 5000}ms`,
                    }}
                  />
                  <div className="z-50 absolute w-full max-w-screen-xl h-full pt-20 md:pt-28 lg:pt-36 lg:px-10 xl:px-0 flex flex-col items-center lg:items-start justify-center ">
                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 place-content-center lg:gap-6  ">
                      <div className="relative w-5/6 md:w-3/4 md:max-w-[450px] mx-auto lg:w-full lg:max-w-none h-fit xl:min-h-[400px] 2xl:min-h-[450px] bg-black/30 p-6 py-6 rounded-xl xl:rounded-2xl">
                        <h4
                          className={` absolute top-0 -left-2 w-fit text-white bg-primary text-base px-3 flex items-center mb-2 rounded-full`}
                          // style={{ background: getCategoryColor(categories) }}
                        >
                          {/* {category.name} */}
                          {dictionary['Inspired By Brazil']}
                        </h4>
                        <h3 className="w-full mb-2 text-white text-left text-5xl md:text-6xl lg:text-[4rem] leading-[1.2] lg:leading-[1.28] line-clamp-2 md:line-clamp-3 lg:line-clamp-2 font-oswald font-normal">
                          {htmlToText(title?.rendered || '')}
                        </h3>
                        {excerpt?.rendered && (
                          <p className=" line-clamp-4 md:line-clamp-none text-sm lg:text-lg text-left text-pretty font-poppins font-light text-white ">
                            {getParagraphText(excerpt?.rendered || '')}
                          </p>
                        )}
                      </div>

                      <div className="hidden lg:block relative w-full h-full border-white border-2 shadow-black/40 shadow-lg rounded-xl xl:rounded-2xl overflow-hidden ">
                        <Image
                          className={`relative w-full h-full object-cover `}
                          src={urlImage}
                          fill
                          priority={!i}
                          alt={title?.rendered as string}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/content/${postType}/${slug}`}
                      prefetch
                      className="w-fit py-1 px-6 lg:ml-6 mt-6 lg:mt-8 uppercase inline-flex items-center justify-center rounded-full font-semibold text-lg bg-tertiary text-black hover:bg-tertiary-dark transition-all duration-300 ease-in-out"
                    >
                      {dictionary['See more']}
                    </Link>
                  </div>

                  <div className="bg-gradient-to-t from-transparent via-transparent to-black/70 md:from-black/30 md:via-black/30 md:to-black/30 absolute z-1 w-full h-full top-0 md:rounded-[inherit]"></div>
                  {/* <div className="md:hidden bg-gradient-to-b from-transparent via-black/50 to-black absolute z-1 w-full h-full top-0 md:rounded-[inherit]"></div> */}
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {!userEnabled && <BannerSuscription />}
    </div>
  )
}
