import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SectionSaboresDelMundo2() {
  return (
    <section className="z-0 relative w-full h-[60vh] min-h-fit  flex items-end justify-center  ">
      <div className="z-0 absolute top-0 left-0 w-full h-full flex flex-col  ">
        <Image
          className=" relative w-full h-full object-cover object-center scale-100"
          src="/images/hd/bg-sabores-del-mundo-hd.webp"
          alt="Image banner desktop version"
          fill
        />
      </div>
      <div className=" relative w-full max-w-screen-xl mx-auto md:pl-10 lg:pl-14 h-full flex items-center justify-center lg:items-end md:justify-start ">
        <div className="relative w-5/6 md:w-2/3 lg:mb-20 flex flex-col items-center md:items-start gap-8 md:gap-6">
          <Image
            className=" w-3/4 md:w-1/2 max-w-[500px] h-auto "
            src="/images/sabores-del-mundo-title.webp"
            alt="Image banner desktop version"
            width={500}
            height={120}
          />

          <div className=" md:w-5/6 lg:max-w-[550px] bg-black/60 px-4 py-2 rounded-xl">
            <p className=" line-clamp-none text-sm lg:text-lg text-left text-pretty font-poppins font-extralight text-white ">
              Conoce la comida típica de cada país, las mejores recetas y
              recorridos gastronómicos en diferentes partes del mundo.
            </p>
          </div>
          <Link
            href={`/cultura-y-paladar/sabores-del-mundo`}
            prefetch
            className="w-fit uppercase inline-flex items-center justify-center rounded-full font-semibold text-lg py-1 px-6  text-white bg-tertiary shadow-md shadow-black md:text-black hover:bg-tertiary-dark transition-all duration-300 ease-in-out"
          >
            VER MÁS
          </Link>
        </div>
      </div>
    </section>
  )
}
