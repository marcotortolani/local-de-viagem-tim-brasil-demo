import React from 'react'
import { BannerGridVideo } from '../BannerGridVideo'
import SeeMore from '../ui/see-more'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { CATEGORIES, GRID_VIDEOS } from '@/lib/constants'
import { VerticalCard } from '../VerticalCard'
import Image from 'next/image'
import { SliderVerticalPosts2 } from '../inspired-by/SliderVerticalPosts2'

import dictionary from '@/dictionary/lang.json'

const ITEMS_GRID_PAISAJES = {
  vimeoVideo: GRID_VIDEOS['landscapes'],
  videoFrame:
    '/images/grid-cultura-y-paladar/cultura-y-paladar-preview-video.webp',
  imageH:
    '/images/grid-cultura-y-paladar/cultura-y-paladar-horizontal-grid.webp',
  imageV:
    '/images/grid-cultura-y-paladar/cultura-y-paladar-vertical-grid.webp',
}

export default async function SectionCultureAndFlavor() {
  const flavors_of_the_world = await getWpPosts({
    categories: CATEGORIES['flavors-of-the-world'].toString(),
    per_page: 6,
  })

  const behind_the_map = await getWpPosts({
    categories: CATEGORIES['behind-the-map'].toString(),
  })

  return (
    <section className=" relative w-full h-full bg-tertiary pt-4 -my-0.5">
      {/* Banner Grid */}
      <div className=" w-full md:px-4 lg:max-w-screen-xl mx-auto xl:py-4 2xl:py-8">
        <BannerGridVideo
          items={ITEMS_GRID_PAISAJES}
          videoPosition="bottom-right"
          colorLines="bg-tertiary"
          colorOutline="outline-tertiary"
          colorBorder="border-tertiary"
        >
          <div className=" absolute bottom-0 w-full h-2/3 pl-4 md:pl-6 lg:px-8 pb-4 md:pb-8 bg-gradient-to-b from-transparent via-black/40 to-black/90 flex flex-col items-start justify-end lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className=" flex flex-col items-start md:gap-1">
              <span className=" font-sign-painter text-4xl md:text-5xl xl:text-6xl font-light text-tertiary">
                {dictionary['Discover']}
              </span>{' '}
              <span className=" italic font-normal font-oswald text-4xl md:text-5xl xl:text-6xl -mt-3 lg:pb-0 lg:pl-2 text-white">
                {dictionary['Culture and Flavor']}
              </span>
            </h2>
            <SeeMore
              moreLink="/culture-and-flavor"
              text={dictionary['See more']}
              className="px-4 py-0 lg:pb-1 font-oswald font-normal text-base md:text-lg lg:text-xl text-white bg-tertiary rounded-full"
            />
          </div>
        </BannerGridVideo>
      </div>

      {/* Slider - Lo mas nuevo de Sabores del Mundo */}
      {flavors_of_the_world?.posts.length > 0 && (
        <div className="relative w-full max-w-screen-2xl mx-auto pb-4 mt-6 xl:mt-0 ">
          <h4 className=" pl-4 md:pl-6 xl:pl-8 2xl:pl-10 mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl">
            {dictionary['Most recent of']}
            <span className=" ml-2 font-sign-painter text-2xl md:text-4xl xl:text-5xl font-light text-neutral-700/60">
              {dictionary['Flavors of the world']}
            </span>
          </h4>
          <SliderVerticalPosts2
            posts={flavors_of_the_world.posts.slice(0, 6)}
            pagination={true}
            parentSlug={'culture-and-flavor'}
          />
        </div>
      )}

      {/* Grid - Lo mas nuevo de Detras del mapa */}
      {behind_the_map?.posts.length > 0 && (
        <div className="z-10 relative w-full max-w-screen-2xl mx-auto px-4 pb-4 mt-0 ">
          <h4 className=" mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl">
            {dictionary['The latest from']}
            <span className=" ml-2 font-sign-painter text-2xl md:text-4xl xl:text-5xl font-light text-neutral-700/60">
              {dictionary['Behing the map']}
            </span>
          </h4>
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 lg:gap-4 xl:gap-8">
            {behind_the_map?.posts
              .slice(0, 4)
              .map((item, key) => (
                <VerticalCard
                  item={item}
                  key={key}
                  categorySlug={'culture-and-flavor'}
                />
              ))}
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="z-0 relative w-full max-w-[1920px] mx-auto h-[15svh] lg:h-[20svh] xl:h-[25svh] min-h-[120px] xl:min-h-[300px] lg:-mt-10 xl:-mt-14 2xl:-mt-20">
        <Image
          className=" relative hidden sm:flex w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
          src="/images/bg-banner-cultura-y-paladar-desktop.webp"
          alt="Image background desktop version"
          fill
          priority
        />
        <Image
          className=" relative sm:hidden w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
          src="/images/bg-banner-cultura-y-paladar-mobile.webp"
          alt="Image background mobile version"
          fill
          priority
        />
        <div className=" absolute top-0 -translate-y-0.5 w-full h-1/3 bg-gradient-to-b from-tertiary via-tertiary/70 to-transparent"></div>
        <div className=" absolute bottom-0 translate-y-0.5 w-full h-1/3 bg-gradient-to-t from-neutral-600 via-neutral-600/60 to-transparent"></div>
      </div>
    </section>
  )
}
