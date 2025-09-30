import React from 'react'
import { CarouselHome } from '@/components/home/CarouselHome'
import { getWpCategories, getWpPosts } from '@/lib/api/wp/wp-actions'

import { Category } from '@/lib/api/wp/wp-types'

import { CATEGORIES } from '@/lib/constants'
import { SectionInspiredBy } from '@/components/home/SectionInspiredBy'
import { ShortCarousel } from '@/components/short/ShortCarousel'
import SectionAroundTheWorld from '@/components/home/SectionAroundTheWorld'
import SectionCultureAndFlavor from '@/components/home/SectionCultureAndFlavor'
import SectionChecklist from '@/components/home/SectionChecklist'

import dictionary from '@/dictionary/lang.json'

export default async function Page() {
  const { categories } = await getWpCategories({ per_page: 100 })

  const inspired_by = await getWpPosts({
    categories: CATEGORIES['inspired-by'].toString(),
  })

  const travelers = categories.filter(
    (category: Category) => category.parent === CATEGORIES['travelers'],
  )

  const shorts = await getWpPosts({
    categories: CATEGORIES['shorts'].toString(),
    per_page: 6,
  })

  return (
    <div className="relative md:mt-[6rem] ">
      <div className=" -mb-1 ">
        <CarouselHome
          posts={inspired_by?.posts || []}
          categories={categories}
        />
      </div>

      <SectionInspiredBy
        posts={inspired_by.posts}
        travelers={travelers.slice(0, 12)}
      />

      {/* Shorts */}
      <section className="relative w-full h-fit pt-4 pb-10 -my-0.5 md:-my-1">
        <div className="z-0 absolute top-0 left-0 w-full h-full">
          <div className=" w-full h-2/5 bg-neutral-600 "></div>
          <div className="  w-full h-3/5 -mt-0.5 bg-gradient-to-t from-primary-dark to-neutral-600"></div>
        </div>
        <div className=" z-10 relative w-full max-w-screen-2xl mx-auto  ">
          <div className="w-full px-4 md:px-5 lg:px-6 md:mb-2 lg:mb-4">
            <h2 className=" flex items-center gap-2  ">
              <span className=" font-sign-painter text-3xl md:text-4xl  lg:text-5xl xl:text-6xl font-thin text-tertiary">
                {dictionary['Discover']}
              </span>{' '}
              <span className=" mb-2 italic font-light font-oswald text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
                {dictionary['Shorts']}
              </span>
            </h2>
          </div>
          <ShortCarousel items={shorts?.posts} />
        </div>
      </section>

      <SectionAroundTheWorld />
      <SectionCultureAndFlavor />
      <SectionChecklist />

      <div className=" w-full h-20 bg-neutral-600"></div>
    </div>
  )
}
