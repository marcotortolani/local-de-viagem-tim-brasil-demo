import Image from 'next/image'
import React from 'react'

import { Category, Post } from '@/lib/api/wp/wp-types'
import { SliderVerticalPosts2 } from '../inspired-by/SliderVerticalPosts2'
import SeeMore from '../ui/see-more'
import { TravelerCarousel } from '../inspired-by/TravelerCarousel'

import dictionary from '@/dictionary/lang.json'

export function SectionInspiredBy({
  posts,
  travelers,
}: {
  posts: Post[]
  travelers: Category[]
}) {
  return (
    <section className=" relative w-full h-full bg-neutral-600">
      {/* Banner */}
      <div className=" relative w-full max-w-[1920px] mx-auto h-[30svh] xl:h-[50svh] min-h-[250px] lg:min-h-[450px] xl:min-h-[600px] mb-4 ">
        <Image
          className=" relative hidden sm:flex w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
          src="/images/bg-regions-2-desktop.webp"
          alt="Image background desktop version"
          fill
          priority
        />
        <Image
          className=" relative sm:hidden w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
          src="/images/bg-regions-2-mobile.webp"
          alt="Image background mobile version"
          fill
          priority
        />
        <div className=" absolute bottom-0 translate-y-0.5 w-full h-full bg-gradient-to-t from-neutral-600 via-neutral-600/50 to-transparent"></div>
        <div className=" absolute bottom-10 lg:bottom-24 xl:bottom-52 2xl:bottom-20 z-20 w-full h-full">
          <div className=" relative w-full h-full xl:px-10 xl:max-w-screen-xl xl:mx-auto flex flex-col items-center justify-end xl:items-start 2xl:justify-center">
            <div className=" w-full flex items-center justify-center xl:justify-start gap-2">
              <h2 className=" flex items-center gap-2  ">
                <span className=" font-sign-painter text-4xl md:text-5xl xl:text-6xl font-thin text-tertiary">
                  {dictionary['Inspired By']}
                </span>{' '}
                <span className=" mb-2 italic font-light font-oswald text-4xl md:text-5xl xl:text-6xl text-white">
                  {dictionary['Country']}
                </span>
              </h2>
              <div className=" relative w-12 h-12 md:w-16 md:h-16 ">
                <Image
                  className=" relative w-full object-contain "
                  src="/images/brasil-flag.webp"
                  alt={`Image Flag - ${dictionary['Country']}`}
                  fill
                />
              </div>
            </div>
            <p className="z-10 relative w-5/6 max-w-md md:max-w-screen-md xl:w-full xl:max-w-screen-xl xl:text-balance mx-auto xl:mx-0  font-poppins text-white text-center lg:text-left text-pretty text-xs md:text-lg lg:text-xl font-extralight">
              {
                dictionary[
                  'From the vibrant energy of Rio de Janeiro to the vastness of the Amazon, we invite you to'
                ]
              }{' '}
              <span className=" font-medium">
                {
                  dictionary[
                    'explore Brazil and immerse yourself in the richness of its culture, music, and breathtaking landscapes.'
                  ]
                }
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Video Banner - Inspírate en ... */}
      {/* <div className=" w-full max-w-screen-lg mx-auto -mt-10 lg:-mt-20 xl:-mt-44 2xl:-mt-72 px-4 lg:px-6">
        <VideoItem item={VIDEO_BANNER} autoPlay loop muted />
      </div> */}

      {/* Slider - Lo mas nuevo de Inspírate en ... */}
      {posts?.length > 0 && (
        <div className="relative w-full max-w-screen-2xl mx-auto pb-4 mt-6 md:mt-10 ">
          <div className=" w-full px-4 md:px-7 xl:px-10 2xl:px-12 mb-4 flex items-center justify-between">
            <h4 className=" mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl">
              {dictionary['Most recent']}
            </h4>
            <SeeMore
              moreLink="/inspired-by"
              text={dictionary['See all']}
              className="px-4 py-0 font-oswald font-semibold text-base md:text-lg xl:text-xl text-neutral-600 bg-tertiary-dark rounded-full"
            />
          </div>
          <SliderVerticalPosts2
            posts={posts.slice(0, 6)}
            pagination={true}
            parentSlug={'inspired-by'}
          />
        </div>
      )}

      {/* Slider - travelers */}
      <div className=" w-full max-w-screen-2xl mx-auto flex flex-col items-center gap-4 lg:gap-8 xl:gap-10 ">
        <div className=" w-full px-4 md:px-7 xl:px-10 flex items-center justify-between">
          <h2 className=" flex items-center gap-2  ">
            <span className=" font-sign-painter text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin text-tertiary">
              {dictionary['Meet the']}
            </span>{' '}
            <span className=" mb-2 italic font-light font-oswald text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
              {dictionary['Local Travelers']}
            </span>
          </h2>
          <SeeMore
            moreLink="/inspired-by/travelers"
            text={dictionary['See all']}
            className="px-4 py-0 font-oswald font-semibold text-base md:text-lg xl:text-xl text-neutral-600 bg-tertiary-dark rounded-full"
          />
        </div>

        <TravelerCarousel
          parentSlug={'inspired-by'}
          items={travelers}
          pagination={true}
        />
      </div>
    </section>
  )
}
