'use client'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { ValidationContext } from '@/providers/validation-provider'
import Image from 'next/image'

const urlLanding = process.env.NEXT_PUBLIC_LANDING_SUBSCRIPTION || '/subscribe'

export default function BannerSuscription() {
  const { userEnabled } = useContext(ValidationContext)
  const router = useRouter()

  if (userEnabled) return null

  const handleClick = () => {
    // use router.push with target to open in a new tab
    if (typeof window !== 'undefined') {
      window.open(urlLanding, '_blank')
      return
    }

    router.push(urlLanding)
  }

  return (
    <section className=" absolute bottom-0 translate-y-1/3 lg:translate-y-1/2 z-30 w-full h-28 md:h-32 lg:h-40">
      <div
        className="relative cursor-pointer hover:scale-105 active:scale-100 w-11/12 min-w-[340px] max-w-screen-xl mx-auto h-full p-1 md:p-1.5 overflow-hidden shadow-black/40 shadow-lg bg-primary/80 flex items-center justify-center text-white text-2xl font-semibold rounded-xl lg:rounded-2xl xl:rounded-3xl transition-all duration-300 ease-in-out "
        onClick={handleClick}
      >
        <Image
          className=" w-full h-full object-cover object-center rounded-[inherit] "
          src="/images/bg-banner-suscription.webp"
          alt="Background Banner Suscription"
          fill
        />
        <div className="z-20 w-full h-full p-2 bg-gradient-to-b from-black/20 via-black/40 to-black/60 flex items-center justify-center gap-4 md:gap-6 rounded-lg lg:rounded-xl xl:rounded-3xl ">
          <Image
            className=" w-1/4 min-w-16 md:h-20 md:w-auto xl:h-24 "
            src="/images/logo-product-white.webp"
            alt="Logo Que Guay Viajes"
            width={61}
            height={43}
          />
          <div className="w-fit md:w-3/5 xl:w-2/5 h-full flex flex-col items-center justify-center gap-2  ">
            <p className="w-full font-oswald tracking-wide text-white text-left md:text-center text-base md:text-2xl xl:text-3xl font-semibold ">
              ¿Aún no formas parte de Que Guay?
            </p>
            <div className=" flex items-center justify-start gap-2 md:justify-center">
              <p className=" xl:w-full font-oswald italic text-white w-2/4 text-sm md:text-xl xl:text-2xl font-light leading-3 md:leading-[1.1]  ">
                Disfruta de todo nuestro contenido exclusivo
              </p>
              <button
                type="button"
                className=" xl:hidden px-3 py-1 md:px-5 bg-secondary-dark hover:bg-secondary font-oswald text-white uppercase text-sm md:text-2xl font-normal italic rounded-full"
              >
                Suscríbete
              </button>
            </div>
          </div>
          <button
            type="button"
            className=" hidden xl:flex px-3 py-1 md:px-5 xl:px-6 bg-secondary-dark hover:bg-secondary font-oswald text-white uppercase text-sm md:text-2xl font-normal italic rounded-full"
          >
            Suscríbete
          </button>
        </div>
      </div>
    </section>
  )
}
