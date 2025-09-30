import React from 'react'
import Image from 'next/image'
import { SectionDestinations } from '@/components/around-the-world/SectionDestinations'
import { SectionTravelingTheWorld } from '@/components/around-the-world/SectionTravelingTheWorld'
import Breadcrumb from '@/components/ui/Breadcrumb'

import dictionary from '@/dictionary/lang.json'

export default async function Page() {
  return (
    <main className=" w-full h-full mt-20 md:mt-24 bg-quaternary flex flex-col items-center justify-center">
      <section className=" relative w-full h-[40svh] min-h-[350px] lg:h-[50svh]">
        <div className="  absolute bottom-0.5 left-0 w-full h-full bg-no-repeat ">
          <Image
            className=" relative hidden sm:flex w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
            src="/images/hd/bg-por-el-mundo.webp"
            alt="Image background desktop version"
            fill
          />
          <Image
            className=" relative sm:hidden w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
            src="/images/hd/bg-por-el-mundo-mobile.webp"
            alt="Image background desktop version"
            fill
          />
        </div>

        <div className=" z-10 absolute bottom-0 left-0 w-full h-full flex justify-center lg:items-end xl:justify-end  ">
          <div className="z-20 relative w-full max-w-screen-xl mx-auto h-full lg:h-fit pb-4  flex flex-col items-center justify-end xl:flex-row lg:items-center xl:justify-center gap-4 xl:gap-8 ">
            <h2 className=" flex items-end lg:items-center  gap-2 ">
              <span className=" font-sign-painter text-4xl md:text-5xl xl:text-6xl font-light text-neutral-700">
                {dictionary['Traveling']}
              </span>{' '}
              <span className=" mb-2 italic font-normal font-oswald text-4xl lg:text-5xl xl:text-6xl text-white">
                {dictionary['Around the World']}
              </span>
            </h2>
            <div className="z-10 relative w-[95%] sm:max-w-md md:max-w-screen-md 2xl:max-w-2xl px-8 py-4 lg:px-10 xl:px-12 bg-black/50 rounded-3xl">
              <p className=" font-oswald italic text-white text-base md:text-xl lg:text-2xl font-extralight">
                {
                  dictionary[
                    'From the majestic cities of Europe to the exotic beaches of Southeast Asia'
                  ]
                }
                ,{' '}
                <span className=" not-italic font-normal">
                  {
                    dictionary[
                      'We invite you to discover the most fascinating corners of the world, and to be amazed by the diversity of cultures, flavors, and breathtaking landscapes.'
                    ]
                  }
                </span>
              </p>
            </div>
          </div>

          <div className="z-0 absolute top-0 w-full h-2/3 md:h-1/3 xl:h-1/2 bg-gradient-to-b from-primary-dark to-transparent"></div>
          <div className="z-0 absolute bottom-0 w-full h-2/3 xl:h-3/4 bg-gradient-to-t from-quaternary to-transparent"></div>
        </div>

        <div className=" hidden lg:flex">
          <Breadcrumb homeElement={dictionary['Home']} />
        </div>
      </section>

      <SectionDestinations parentSlug="around-the-world" />
      <SectionTravelingTheWorld parentSlug="around-the-world" />
    </main>
  )
}
