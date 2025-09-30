import React from 'react'
import { BannerGridVideo } from '../BannerGridVideo'
import SeeMore from '../ui/see-more'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { CATEGORIES, GRID_VIDEOS } from '@/lib/constants'
import { SliderVerticalPosts2 } from '../inspired-by/SliderVerticalPosts2'

import dictionary from '@/dictionary/lang.json'

const ITEMS_GRID_CHECKLIST = {
  vimeoVideo: GRID_VIDEOS['checklist'],
  videoFrame: '/images/grid-checklist/checklist-preview-video.webp',
  imageH: '/images/grid-checklist/checklist-horizontal-grid.webp',
  imageV: '/images/grid-checklist/checklist-vertical-grid.webp',
}

export default async function SectionChecklist() {
  const checklist = await getWpPosts({
    categories: CATEGORIES['checklist'].toString(),
    per_page: 6,
  })

  return (
    <section className=" relative w-full h-full bg-neutral-600 pt-4 -my-0.5">
      {/* Banner Grid */}
      <div className=" w-full md:px-4 lg:max-w-screen-xl mx-auto xl:pt-4 2xl:pt-8">
        <BannerGridVideo
          items={ITEMS_GRID_CHECKLIST}
          videoPosition="bottom-right"
          colorLines="bg-neutral-600"
          colorOutline="outline-neutral-600"
          colorBorder="border-neutral-600"
        >
          <div className=" absolute bottom-0 w-full h-2/3 pl-4 md:pl-6 lg:px-8 pb-4 md:pb-8 bg-gradient-to-b from-transparent via-black/40 to-black/90 flex flex-col items-start justify-end lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className=" flex flex-col items-start md:gap-1">
              <span className=" font-sign-painter text-4xl  md:text-5xl xl:text-6xl font-light text-tertiary">
                {dictionary['Discover']}
              </span>{' '}
              <span className=" italic font-normal font-oswald text-4xl md:text-5xl xl:text-6xl -mt-3 lg:pb-0 lg:pl-2 text-white">
                {dictionary['Checklist']}
              </span>
            </h2>
            <SeeMore
              moreLink="/checklist"
              text={dictionary['See more']}
              className="px-4 py-0 lg:pb-1 font-oswald font-semibold text-base md:text-lg xl:text-xl text-white bg-tertiary rounded-full"
            />
          </div>
        </BannerGridVideo>
      </div>

      {/* Slider - Lo mas nuevo de Sabores del Mundo */}
      {checklist?.posts.length > 0 && (
        <div className="relative w-full max-w-screen-2xl mx-auto pb-4 mt-6 md:mt-10">
          <h4 className=" pl-4 md:pl-6 xl:pl-8 2xl:pl-10 mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl">
            {dictionary['Most recent of']}
            <span className=" ml-2 font-sign-painter text-2xl md:text-4xl xl:text-5xl font-light text-tertiary">
              {dictionary['Checklist']}
            </span>
          </h4>
          <SliderVerticalPosts2
            posts={checklist.posts.slice(0, 6)}
            pagination={true}
            parentSlug={'checklist'}
          />
        </div>
      )}
    </section>
  )
}
