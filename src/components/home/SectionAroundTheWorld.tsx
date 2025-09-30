import React from 'react'
import { BannerGridVideo } from '../BannerGridVideo'
import SeeMore from '../ui/see-more'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { CATEGORIES, GRID_VIDEOS } from '@/lib/constants'
import { VerticalCard } from '../VerticalCard'
import Image from 'next/image'

import dictionary from '@/dictionary/lang.json'

const ITEMS_GRID_POR_EL_MUNDO = {
  vimeoVideo: GRID_VIDEOS['around-the-world'],
  videoFrame: '/images/grid-por-el-mundo/por-el-mundo-video-preview.webp',
  imageH: '/images/grid-por-el-mundo/por-el-mundo-horizontal-grid.webp',
  imageV: '/images/grid-por-el-mundo/por-el-mundo-vertical-grid.webp',
}

export default async function SectionAroundTheWorld() {
  const traveling_the_world = await getWpPosts({
    categories: CATEGORIES['traveling-the-world'].toString(),
  })

  const destinations = await getWpPosts({
    categories: CATEGORIES['destinations'].toString(),
  })

  return (
    <section className=" relative w-full h-full bg-primary-dark -my-0.5">
      {/* Banner Grid */}
      <div className=" w-full md:px-4 lg:max-w-screen-xl mx-auto xl:py-4 2xl:py-8">
        <BannerGridVideo
          items={ITEMS_GRID_POR_EL_MUNDO}
          videoPosition="bottom-right"
          colorLines="bg-primary-dark"
          colorOutline="outline-primary-dark"
          colorBorder="border-primary-dark"
        >
          <div className=" absolute bottom-0 w-full h-2/3 pl-4 md:pl-6 lg:px-8 pb-4 md:pb-8 bg-gradient-to-b from-transparent via-black/40 to-black/90 flex flex-col items-start justify-end lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className=" flex flex-col items-start md:gap-1">
              <span className=" font-sign-painter text-4xl md:text-5xl xl:text-6xl font-light text-primary-light">
                {dictionary['Discover']}
              </span>{' '}
              <span className=" italic font-normal font-oswald text-4xl md:text-5xl xl:text-6xl -mt-3 lg:pb-0 lg:pl-2 text-white">
                {dictionary['Around the World']}
              </span>
            </h2>
            <SeeMore
              moreLink="/around-the-world"
              text={dictionary['See all']}
              className="px-4 py-0 lg:pb-1 font-oswald font-semibold text-base md:text-lg lg:text-xl text-white bg-primary-light rounded-full"
            />
          </div>
        </BannerGridVideo>
      </div>

      {/* Grid - Ultimos videos de Reocorriendo el mundo */}
      {traveling_the_world.posts.length > 0 && (
        <div className="relative w-full max-w-screen-2xl mx-auto px-4 pb-4 mt-6 ">
          <h4 className=" mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl ">
            {dictionary['Latest videos of']}
            <span className=" ml-2 font-sign-painter text-2xl md:text-4xl xl:text-5xl font-light text-primary-light">
              {dictionary['Traveling the world']}
            </span>
          </h4>
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 lg:gap-5 xl:gap-8">
            {traveling_the_world.posts.slice(0, 4).map((item, key) => (
              <VerticalCard
                item={item}
                key={key}
                categorySlug={'around-the-world'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid - Lo mas nuevo de destinations */}
      {destinations.posts.length > 0 && (
        <div className="z-10 relative w-full max-w-screen-2xl mx-auto px-4 pb-4 mt-6 ">
          <h4 className=" mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl ">
            {dictionary['Most recent of']}
            <span className=" ml-2 font-sign-painter text-2xl md:text-4xl xl:text-5xl font-light text-primary-light">
              {dictionary['Destinations']}
            </span>
          </h4>
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 lg:gap-5 xl:gap-8">
            {destinations.posts.slice(0, 4).map((item, key) => (
              <VerticalCard
                item={item}
                key={key}
                categorySlug={'around-the-world'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="z-0 relative w-full max-w-[1920px] mx-auto h-[25svh] xl:h-[40svh] min-h-[200px] -mt-24 md:-mt-20 ">
        <Image
          className=" relative hidden sm:flex w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
          src="/images/bg-banner-por-el-mundo-desktop.webp"
          alt="Image background desktop version"
          fill
          priority
        />
        <Image
          className=" relative sm:hidden w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
          src="/images/bg-banner-por-el-mundo-mobile.webp"
          alt="Image background mobile version"
          fill
          priority
        />
        <div className=" absolute top-0 -translate-y-0.5 w-full h-1/3 bg-gradient-to-b from-primary-dark via-primary-dark/60 to-transparent"></div>
        <div className=" absolute bottom-0 translate-y-0.5 w-full h-1/3 bg-gradient-to-t from-tertiary via-tertiary/60 to-transparent"></div>
      </div>
    </section>
  )
}
