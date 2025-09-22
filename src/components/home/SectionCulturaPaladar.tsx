import React from 'react'
import { BannerGridVideo } from '../BannerGridVideo'
import SeeMore from '../ui/see-more'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { CATEGORIES } from '@/lib/constants'
import { VerticalCard } from '../VerticalCard'
import Image from 'next/image'
import { SliderVerticalPosts2 } from '../inspirate-en-venezuela/SliderVerticalPosts2'

const ITEMS_GRID_PAISAJES = {
  video: '/videos/grid-cultura-y-paladar/cultura-y-paladar-video.mp4',
  videoFrame:
    '/images/grid-cultura-y-paladar/cultura-y-paladar-preview-video.webp',
  imageH:
    '/images/grid-cultura-y-paladar/cultura-y-paladar-horizontal-grid.webp',
  imageV: '/images/grid-cultura-y-paladar/cultura-y-paladar-vertical-grid.webp',
}

export default async function SectionCulturaPaladar() {
  const sabores_del_mundo = await getWpPosts({
    categories: CATEGORIES['sabores-del-mundo'].toString(),
    per_page: 6,
  })

  const detras_del_mapa = await getWpPosts({
    categories: CATEGORIES['detras-del-mapa'].toString(),
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
                Descubre
              </span>{' '}
              <span className=" italic font-normal font-oswald text-4xl md:text-5xl xl:text-6xl -mt-3 lg:pb-0 lg:pl-2 text-white">
                Cultura y Paladar
              </span>
            </h2>
            <SeeMore
              moreLink="/cultura-y-paladar"
              text="Ver todo"
              className="px-4 py-0 lg:pb-1 font-oswald font-normal text-base md:text-lg lg:text-xl text-white bg-tertiary rounded-full"
            />
          </div>
        </BannerGridVideo>
      </div>

      {/* Slider - Lo mas nuevo de Sabores del Mundo */}
      {sabores_del_mundo.posts.length > 0 && (
        <div className="relative w-full max-w-screen-2xl mx-auto pb-4 mt-6 xl:mt-0 ">
          <h4 className=" pl-4 md:pl-6 xl:pl-8 2xl:pl-10 mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl">
            Lo más nuevo de
            <span className=" ml-2 font-sign-painter text-2xl md:text-4xl xl:text-5xl font-light text-neutral-700/60">
              Sabores del mundo
            </span>
          </h4>
          <SliderVerticalPosts2
            posts={sabores_del_mundo.posts.slice(0, 6)}
            pagination={true}
            parentSlug={'cultura-y-paladar'}
          />
        </div>
      )}

      {/* Grid - Lo mas nuevo de Detras del mapa */}
      {detras_del_mapa.posts.length > 0 && (
        <div className="z-10 relative w-full max-w-screen-2xl mx-auto px-4 pb-4 mt-0 ">
          <h4 className=" mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl">
            Lo último de
            <span className=" ml-2 font-sign-painter text-2xl md:text-4xl xl:text-5xl font-light text-neutral-700/60">
              Detrás del mapa
            </span>
          </h4>
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 lg:gap-4 xl:gap-8">
            {detras_del_mapa.posts.slice(0, 4).map((item, key) => (
              <VerticalCard
                item={item}
                key={key}
                categorySlug={'cultura-y-paladar'}
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
