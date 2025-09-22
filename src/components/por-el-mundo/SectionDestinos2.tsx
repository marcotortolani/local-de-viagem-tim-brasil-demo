import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SectionDestinos2({
  useBackground = true,
}: {
  useBackground?: boolean
}) {
  return (
    <section
      className="z-0 relative w-full h-full pb-10 md:pb-10 lg:pb-14 flex flex-col bg-tertiary bg-contain bg-repeat "
      style={
        useBackground
          ? {
              backgroundImage: 'url(/images/vector-desierto.webp)',
            }
          : {}
      }
    >
      <div className="z-0 relative w-full h-full  flex flex-col ">
        <div className=" relative w-full h-full min-h-[360px] md:h-2/3 md:min-h-[440px] xl:h-2/3 xl:px-40 flex justify-end items-end ">
          <Image
            className=" absolute top-0 w-full h-full object-cover object-top"
            src="/images/hd/bg-desierto-hd.webp"
            alt="Image banner desktop version"
            fill
          />
          <Image
            className=" relative w-auto h-[95%] md:h-full"
            src="/images/mujer-viajera.webp"
            alt="Mujer Viajera con Carrybag"
            width={536}
            height={591}
          />
        </div>
        <div className="absolute top-0 w-full h-full pb-6">
          <div className=" relative w-full h-full px-4 lg:px-6 2xl:px-2  py-4 pt-10 md:py-10 flex flex-col items-start justify-center gap-6 xl:max-w-screen-2xl mx-auto">
            <Image
              className=" w-1/2 max-w-[250px] h-auto "
              src="/images/destinos-title.webp"
              alt="Image banner desktop version"
              width={500}
              height={120}
            />
            <div className=" flex items-end gap-4">
              <Link
                href={`/por-el-mundo/destinos`}
                prefetch
                className="w-fit uppercase inline-flex items-center justify-center rounded-full font-semibold text-lg py-1 px-6 bg-tertiary text-black hover:bg-tertiary-dark transition-all duration-300 ease-in-out"
              >
                VER MÁS
              </Link>
            </div>
            <div className=" md:w-5/6 lg:max-w-[550px] bg-black/60 p-2 rounded-xl">
              <p className=" line-clamp-4 md:line-clamp-none text-sm md:text-lg xl:text-xl text-left text-pretty font-poppins font-extralight text-white ">
                Desde las majestuosas ciudades de Europa hasta las exóticas
                playas del sudeste asiático, te invitamos a{' '}
                <span className=" font-semibold ">
                  descubrir los rincones más fascinantes del mundo
                </span>
                , y a dejarte maravillar por la diversidad de culturas, sabores
                y paisajes que esperan ser explorados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
