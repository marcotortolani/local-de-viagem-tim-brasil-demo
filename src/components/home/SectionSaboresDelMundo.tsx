import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Post } from '@/lib/api/wp/wp-types'
import { SliderRoundedPosts } from '../SliderRoundedPosts'

export default function SectionSaboresDelMundo({ items }: { items: Post[] }) {
  return (
    <section className="z-0 relative w-full 1h-[90vh] min-h-fit py-8 md:py-20 bg-secondary-dark flex flex-col gap-10 lg:gap-20    ">
      <div className=" relative w-full max-w-screen-xl px-2 mx-auto h-fit ">
        <div className="z-0 relative w-full h-60 md:h-fit overflow-hidden shadow-lg shadow-black/60 bg-white border-4 border-white rounded-2xl  ">
          <Image
            className=" relative w-auto md:w-full h-full md:h-auto rounded-[inherit] object-cover object-center "
            src="/images/hd/bg-sabores-del-mundo-hd.webp"
            alt="Image banner desktop version"
            width={1398}
            height={627}
          />
          <div className=" absolute top-0 z-20 w-full h-full bg-black/30 rounded-[inherit]"></div>
        </div>

        <div className=" z-20 absolute top-0 md:top-0 left-0 right-0 w-full h-full flex flex-col items-center justify-between md:justify-around lg:justify-center lg:gap-10 ">
          <h2 className=" font-oswald text-3xl md:text-4xl lg:text-6xl text-white">
            Sabores del Mundo
          </h2>
          <Image
            className=" w-3/4 max-w-[200px] md:max-w-[400px] h-auto "
            src="/images/earth-globes.webp"
            alt="Image Earth Globes"
            width={625}
            height={198}
          />
          <p className=" z-20 w-full md:w-1/2 max-w-[450px] text-balance line-clamp-4 md:line-clamp-none text-base lg:text-xl tracking-wide text-center font-oswald font-light text-white ">
            Bienvenidos a{' '}
            <span className=" font-semibold ">Sabores del Mundo</span>, donde
            cada receta te transporta a un rincón diferente del planeta.
          </p>
          <Link
            href={`/cultura-y-paladar/sabores-del-mundo`}
            prefetch
            className="  w-fit uppercase inline-flex items-center justify-center rounded-full font-semibold text-lg mb-2 lg:mb-0 py-1 px-6 bg-tertiary text-black hover:bg-tertiary-dark transition-all duration-300 ease-in-out"
          >
            VER MÁS
          </Link>
        </div>
      </div>

      <SliderRoundedPosts posts={items} categorySlug="cultura-y-paladar/sabores-del-mundo" />
    </section>
  )
}
