import React from 'react'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/lib/constants'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { HorizontalCard2 } from '@/components/HorizontalCard2'
import { SliderVerticalPosts2 } from '@/components/inspired-by/SliderVerticalPosts2'

import dictionary from '@/dictionary/lang.json'

export default async function Page() {
  const { posts } = await getWpPosts({
    categories: CATEGORIES['destinations-of-the-month'].toString(),
    per_page: 20,
  })

  const latestPost = posts.slice(0, 2)
  const otherPosts = posts.slice(2, 20)

  if (!posts) notFound()

  return (
    <main className=" w-full h-full mt-20 pb-20 lg:pb-28 md:mt-24 px-2 lg:px-4 bg-gradient-to-b bg-primary/80 ">
      <div className=" w-full max-w-screen-xl h-full mx-auto pt-2 ">
        <Breadcrumb homeElement={dictionary['Home']} />

        <section className="relative w-full h-full min-h-[80svh] pt-2 lg:pt-8 pb-10 flex flex-col items-center gap-4 xl:gap-10 bg-repeat">
          {latestPost?.length > 0 && (
            <div className="relative w-full h-fit md:max-w-screen-sm lg:max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-4 ">
              <HorizontalCard2
                item={latestPost[0]}
                index={0}
                categorySlug="destinations-of-the-month"
              />
              <HorizontalCard2
                item={latestPost[1]}
                index={0}
                categorySlug="destinations-of-the-month"
              />
            </div>
          )}
          {otherPosts?.length > 0 && (
            <div className="relative w-full max-w-screen-2xl mx-auto pb-4 mt-6 xl:mt-0 ">
              <h4 className=" pl-4 md:pl-6 xl:pl-8 2xl:pl-10 mb-2 font-oswald text-white text-base md:text-xl xl:text-2xl">
                {dictionary['Other']}
                <span className=" ml-2 font-sign-painter text-2xl md:text-4xl xl:text-5xl font-light text-neutral-700/60">
                  {dictionary['Destinations']}
                </span>
              </h4>
              <SliderVerticalPosts2
                posts={otherPosts}
                pagination={true}
                parentSlug={'destinations-of-the-month'}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
