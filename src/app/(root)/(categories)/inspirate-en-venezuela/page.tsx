import React from 'react'
import Image from 'next/image'

import Breadcrumb from '@/components/ui/Breadcrumb'
import { SectionRegiones } from '@/components/inspirate-en-venezuela/SectionRegiones'
import { SectionPaisajes } from '@/components/inspirate-en-venezuela/SectionPaisajes'
import { SectionViajeros } from '@/components/inspirate-en-venezuela/SectionViajeros'
import { SectionItinerarios } from '@/components/inspirate-en-venezuela/SectionItinerarios'

import "@/components/inspirate-en-venezuela/style.css"

export default async function Page() {

  return (
    <main className=" w-full h-full mt-20 md:mt-24 bg-tertiary flex flex-col items-center justify-center">
      <section className=" relative w-full h-[40svh] min-h-[350px] lg:h-[50svh] ">
        <div className="  absolute bottom-0 left-0 w-full h-full bg-no-repeat ">
          <Image
            className=" relative hidden sm:flex w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
            src="/images/hd/bg-inspirate-venezuela.webp"
            alt="Image background desktop version"
            fill
            priority
          />
          <Image
            className=" relative sm:hidden w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
            src="/images/hd/bg-inspirate-venezuela-mobile.webp"
            alt="Image background desktop version"
            fill
            priority
          />
        </div>

        <div className=" z-10 absolute top-0 left-0 w-full h-full flex justify-center xl:justify-end ">
          <div className="w-full max-w-screen-lg h-full pb-4 lg:pb-8 flex flex-col items-center justify-between xl:items-start gap-4 ">
            <div className="z-10 relative w-5/6 md:w-1/2 lg:w-2/3 h-2/3 pb-8 xl:pb-0 flex flex-col items-center justify-center 2xl:items-start 2xl:justify-end ">
              <div className="z-10 relative w-full h-3/5 lg:h-2/3 2xl:h-4/5 flex items-end ">
                <Image
                  className="lg:hidden relative w-full h-auto object-contain "
                  src="/images/inspirate-venezuela-title-mobile.webp"
                  alt="Image Title Inspirate en Venezuela"
                  fill
                  priority
                />
                <Image
                  className="hidden lg:flex relative w-full h-auto object-contain "
                  src="/images/inspirate-venezuela-title-desktop.webp"
                  alt="Image Title Inspirate en Venezuela"
                  fill
                  priority
                />
              </div>
            </div>
            <p className="z-10 relative w-5/6 max-w-md md:max-w-screen-md 2xl:max-w-xl mx-auto lg:mx-20 font-poppins text-white text-center lg:text-left text-pretty text-xs md:text-lg lg:text-xl font-extralight">
              Desde las imponentes montañas de los Andes hasta las playas de
              arena blanca del Caribe, te invitamos a{' '}
              <span className=" font-medium">
                explorar cada rincón de Venezuela y a sumergirte en la riqueza
                de su cultura y sus paisajes
              </span>
              .
            </p>
          </div>

          <div className="z-0 absolute bottom-0 w-full h-1/2 md:h-1/3 xl:h-1/2 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className=" hidden lg:flex">
          <Breadcrumb homeElement="Inicio" />
        </div>
        <div className=" absolute bottom-0 left-0 translate-x-1/2 md:translate-x-3/4 lg:translate-x-1/4 w-1/2 h-1/2 md:w-1/3 md:h-3/4 ">
          <Image
            className="relative w-auto h-full object-contain object-bottom md:object-left lg:object-bottom"
            src="/images/pareja-jovenes-turistas-equipo.webp"
            alt="Image banner desktop version"
            fill
            priority
          />
        </div>
      </section>

      <SectionRegiones parentSlug="inspirate-en-venezuela" />
      <SectionPaisajes parentSlug="inspirate-en-venezuela" />
      <SectionViajeros />
      <SectionItinerarios parentSlug="inspirate-en-venezuela" />
    </main>
  )
}
