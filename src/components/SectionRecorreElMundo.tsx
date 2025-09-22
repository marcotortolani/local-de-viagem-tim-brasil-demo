import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SectionRecorreElMundo() {
  return (
    <section className="z-0 relative w-full h-[50vh] min-h-fit xl:h-[70vh] flex items-end justify-center    ">
      <div className="z-0 absolute top-0 left-0 w-full h-full flex flex-col ">
        <Image
          className=" relative w-full h-full object-cover object-center"
          src="/images/hd/bg-recorre-el-mundo-hd.webp"
          alt="Image banner desktop version"
          fill
        />
      </div>
      <div className=" relative w-full max-w-screen-xl mx-auto md:pl-10 lg:pl-14 h-full flex items-center justify-center lg:items-end md:justify-start ">
        <div className="relative w-5/6 md:w-2/3 lg:mb-20 flex flex-col items-center md:items-start gap-8 md:gap-6">
          <Image
            className=" w-3/4 md:w-1/2 max-w-[500px] h-auto "
            src="/images/recorre-el-mundo-title.webp"
            alt="Image banner desktop version"
            width={500}
            height={120}
          />

          {/* <div className=" md:w-5/6 lg:max-w-[550px] bg-black/40 px-4 py-2 rounded-xl">
            <p className=" line-clamp-4 md:line-clamp-none text-sm lg:text-lg text-left text-balance font-poppins font-extralight text-white ">
              Explora nuestra sección de guías turísticas donde te mostramos
              cómo puedes aprovechar al mácimo dos días en las ciudades más
              fascinantes del país. <br />
              ¡Tu próxima aventura empieza aquí!
            </p>
          </div> */}
          <Link
            href={`/por-el-mundo/recorriendo-el-mundo`}
            prefetch
            className="w-fit uppercase inline-flex items-center justify-center rounded-full font-semibold text-lg py-1 px-6 bg-primary text-white md:bg-tertiary shadow-md shadow-black md:text-black hover:bg-primary-dark md:hover:bg-tertiary-dark transition-all duration-300 ease-in-out"
          >
            VER MÁS
          </Link>
        </div>
      </div>
    </section>
  )
}
