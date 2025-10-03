import Image from 'next/image'
import React from 'react'
import { TravelerCarousel } from './TravelerCarousel'
import { getWpCategories } from '@/lib/api/wp/wp-actions'
import { CATEGORIES } from '@/lib/constants'
import SeeMore from '../ui/see-more'

import dictionary from '@/dictionary/lang.json'

type Props = {
  parentSlug: string
  travelersType?: 'local' | 'international' | undefined
}

export async function SectionTravelersSlider({
  parentSlug,
  travelersType = undefined,
}: Props) {
  const travelersParent = !travelersType
    ? CATEGORIES['travelers']
    : travelersType === 'local'
      ? CATEGORIES['local-travelers']
      : CATEGORIES['international-travelers']

  const { categories: travelers } = await getWpCategories({
    parent: travelersParent,
    per_page: 100,
  })

//  if (!travelers.length) return null

  return (
    <section
      className={`${travelersType === 'local' ? 'bg-neutral-600' : 'bg-neutral-600/30'} relative w-full h-full `}
    >
      {travelersType === 'local' ? (
        <div className=" relative w-full max-w-[1920px] mx-auto h-[25svh] xl:h-[50svh] min-h-[160px] mb-4 ">
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
          <div className=" absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-neutral-600 to-transparent"></div>
          <div className=" absolute bottom-0 translate-y-2 lg:translate-y-4 z-20 w-full h-full flex items-end justify-around ">
            <h2 className=" flex items-center gap-2  ">
              <span className="mt-1 font-sign-painter text-4xl lg:text-5xl xl:text-6xl font-thin text-tertiary">
                {dictionary['Meet the']}
              </span>{' '}
              <span className=" italic font-light font-oswald text-4xl lg:text-5xl xl:text-6xl text-white">
                {dictionary['Local Travelers']}
              </span>
            </h2>
            <SeeMore
              moreLink={`/${parentSlug}/travelers`}
              text={dictionary['See all']}
              className=" px-2 md:px-4 py-0 font-oswald font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-neutral-600 bg-tertiary-dark rounded-full"
            />
          </div>
        </div>
      ) : (
        <div className=" relative w-full max-w-[1920px] mx-auto min-h-[160px] mb-4 ">
          {/* <div className=" absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-neutral-600 to-transparent"></div> */}
          <div className=" absolute bottom-0 translate-y-2 lg:translate-y-4 z-20 w-full h-full flex items-end justify-around ">
            <h2 className=" flex items-center gap-2  ">
              <span className="mt-1 font-sign-painter text-4xl lg:text-5xl xl:text-6xl font-thin text-tertiary">
                {dictionary['Meet the']}
              </span>{' '}
              <span className=" italic font-light font-oswald text-4xl lg:text-5xl xl:text-6xl text-white">
                {dictionary['International Travelers']}
              </span>
            </h2>
            <SeeMore
              moreLink={`/${parentSlug}/travelers`}
              text={dictionary['See all']}
              className=" px-2 md:px-4 py-0 font-oswald font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-neutral-600 bg-tertiary-dark rounded-full"
            />
          </div>
        </div>
      )}
      <div className="relative w-full max-w-screen-2xl mx-auto h-full my-8 lg:my-12">
        <TravelerCarousel
          parentSlug={parentSlug}
          items={travelers?.slice(0, 12)}
          pagination={true}
          navigation={false}
        />
      </div>
      {travelersType === 'local' && (
        <div className=" absolute bottom-0 w-full h-3/4 xl:h-2/5 ">
          <Image
            className=" relative w-auto h-full object-cover object-bottom opacity-50 xl:opacity-40 "
            src="/images/bg-city-map-pattern.webp"
            alt="Image background City Map Pattern"
            fill
            priority
          />
        </div>
      )}
    </section>
  )
}
