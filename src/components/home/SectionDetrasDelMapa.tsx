import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Post } from '@/lib/api/wp/wp-types'
import { VerticalCard } from '../VerticalCard'
import { MapIcon } from 'lucide-react'

export default function SectionDetrasDelMapa({ items }: { items: Post[] }) {
  return (
    <section className="z-0 relative w-full min-h-fit flex flex-col ">
      <div className=" relative w-full h-full pt-20 lg:pt-0 xl:pt-14 flex items-end justify-center lg:gap-4 xl:gap-20 bg-primary-dark ">
        <Image
          className=" absolute top-0 w-full h-full object-cover object-top"
          src="/images/vector-capa-02.webp"
          alt="Vector Capa con iconos de viaje"
          fill
        />

        <Image
          className=" relative mt-10 w-5/6 h-4/6 md:w-1/2 lg:h-auto lg:max-w-[450px] xl:w-[450px] xl:h-full "
          src="/images/hombre-mapa.webp"
          alt="Hombre Viajero con Mapa"
          width={536}
          height={591}
        />

        <div className=" absolute lg:relative w-5/6 lg:w-3/5 xl:w-1/3 h-full pb-4 lg:py-14 flex flex-col items-start justify-evenly lg:items-center md:justify-center gap-6">
          <div className=" relative w-full flex flex-col items-start lg:items-center">
            <Image
              className=" w-full max-w-[150px] md:max-w-[200px] lg:w-1/2 lg:max-w-[240px] h-auto "
              src="/images/detras-del-mapa-title2.webp"
              alt="Titulo Mapa"
              width={180}
              height={137}
            />
          </div>
          <div className=" flex items-end gap-4"></div>

          <div className=" relative md:w-5/6 md:max-w-[450px] lg:max-w-[450px] bg-black/60 lg:bg-black/40 p-4 rounded-xl">
            <p className=" line-clamp-4 md:line-clamp-none text-sm lg:text-lg text-left text-pretty font-poppins font-extralight text-white ">
              En Detrás del Mapa
              <span className=" text-tertiary font-semibold ">
                {' '}
                los viajeros comparten historias únicas, curiosas y poco
                conocidas
              </span>{' '}
              de los lugares que han recorrido. Relatos que van más allá de las
              guías, mostrando el alma de cada destino a través de experiencias
              reales y sorprendentes.
            </p>
            <div className="absolute z-20 -top-8 lg:-top-16 -right-4 w-12 h-12 lg:w-20 lg:h-20  p-3 bg-secondary rounded-full">
              <MapIcon className="w-full h-full text-white " />
            </div>
          </div>
          <Link
            href={`/cultura-y-paladar/detras-del-mapa`}
            prefetch
            className="w-fit uppercase inline-flex items-center justify-center rounded-full font-semibold text-lg py-1 px-6 bg-tertiary text-black hover:bg-tertiary-dark transition-all duration-300 ease-in-out"
          >
            VER MÁS
          </Link>
        </div>
      </div>

      <div className="z-0 relative w-full h-fit pt-8 pb-10 bg-primary content-normal">
        <div className="relative w-full px-2 md:px-6 lg:px-4 max-w-screen-xl mx-auto h-1/3 -mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-6 xl:gap-10">
          {items.map((item, key) => (
            <VerticalCard
              key={key}
              item={item}
              categorySlug="cultura-y-paladar/detras-del-mapa"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
