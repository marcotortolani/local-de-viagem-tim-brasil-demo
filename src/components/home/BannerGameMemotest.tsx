'use client'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { ValidationContext } from '@/providers/validation-provider'

import Default from '/public/images/default.webp'
// import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'

// reemplazar imagen mobile correcta
import bannerMobile from '/public/images/banner-memotest-mobile.webp'
import bannerDesktop from '/public/images/banner-memotest-desktop.webp'
import useMemotestConfigStore from '@/stores/memotest-config-store'

const IS_TEST = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY === 'test'

export function BannerGameMemotest() {
  const router = useRouter()
  const { userEnabled } = useContext(ValidationContext)
  // const [userHash, setUserHash] = useState(null)
  const [popupMessage, setPopupMessage] = useState<string | null>(null)
  const [bannerEnabled, setBannerEnabled] = useState(false)
  // const { additionalConfig } = useAdditionalComponentsStore()
  // const { game } = additionalConfig
  const { validPeriod } = useMemotestConfigStore()

  useEffect(() => {
    if (IS_TEST) {
      setBannerEnabled(true)
      return
    }
    if (validPeriod) {
      const currentDate = new Date()
      const startingDate = new Date(validPeriod.startDate)
      const endingDate = new Date(validPeriod.endDate)
      setBannerEnabled(currentDate >= startingDate && currentDate <= endingDate)
    }
  }, [validPeriod])

  function handleRedirect() {
    if (IS_TEST) {
      router.push('/memotest')
      return
    }
    if (!userEnabled) {
      router.push('/suscribirme')
      return
    }
    router.push('/memotest')
  }

  useEffect(() => {
    if (popupMessage) {
      setTimeout(() => {
        setPopupMessage(null)
      }, 3000)
    }
  }, [popupMessage])

  if (!bannerEnabled) {
    return null
  }

  return (
    <section
      className={` ${!userEnabled && ' pt-20 lg:pt-32'} z-0 relative w-full h-fit px-4 py-14 overflow-hidden bg-neutral-600 `}
    >
      <div className=" w-full max-w-screen-xl mx-auto">
        {IS_TEST ? (
          <div
            onClick={handleRedirect}
            className=" relative z-20 w-full h-fit px-0 md:px-0 hover:cursor-pointer hover:scale-105 active:scale-100 shadow-lg shadow-black/70 border-2 border-white rounded-xl md:rounded-xl lg:rounded-3xl overflow-hidden  transition-all duration-300 ease-in-out "
          >
            <Image
              className=" w-full h-full md:hidden rounded-[inherit] "
              src={bannerMobile}
              alt="Banner Mobile Memotest"
            />
            <Image
              className=" w-full h-full hidden md:block rounded-[inherit]"
              src={bannerDesktop}
              alt="Banner Desktop Memotest"
            />
          </div>
        ) : (
          <div
            onClick={handleRedirect}
            className=" relative z-20 w-full h-fit px-0 md:px-0 hover:cursor-pointer hover:scale-105 active:scale-100 shadow-lg shadow-black/70 border-2 border-white rounded-xl md:rounded-xl lg:rounded-3xl overflow-hidden  transition-all duration-300 ease-in-out "
          >
            <ImageWithFallback
              src={bannerMobile}
              fallbackImage={bannerMobile}
              alt="Banner Mobile Memotest"
              className="w-full h-full md:hidden rounded-[inherit] "
            />

            <ImageWithFallback
              src={bannerDesktop}
              fallbackImage={bannerDesktop}
              alt="Banner Desktop Memotest"
              className="w-full h-full hidden md:block rounded-[inherit] object-cover"
            />
          </div>
        )}
      </div>
      <div
        className={`${
          popupMessage ? ' translate-y-0 ' : ' translate-y-[100%] '
        } z-50 absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out bg-black/40 backdrop-blur-sm pointer-events-none`}
      >
        <div className=" w-4/5 md:w-3/5 h-fit py-8 md:h-1/5 flex items-center justify-center uppercase font-normal text-white bg-primary shadow-black shadow-md text-center rounded-xl">
          {popupMessage}
        </div>
      </div>
    </section>
  )
}

const ImageWithFallback = ({
  fallbackImage = Default,
  src,
  alt,
  className,
  ...props
}: {
  fallbackImage?: string | StaticImageData
  src: string | StaticImageData
  alt: string
  className?: string
}) => {
  const [error, setError] = useState<boolean | null>(true)

  useEffect(() => {
    async function checkImage(url: string) {
      try {
        const response = await fetch(url, { method: 'HEAD' })
        if (!response.ok) {
          throw new Error('Image not accessible')
        }

        setError(false)
      } catch (err) {
        console.error('Banner Game Error: ', err)
        setError(true)
      }
    }

    checkImage(src.toString())
  }, [src])

  return (
    <>
      {!error ? (
        <Image
          {...props}
          onError={() => setError(true)}
          className={className}
          src={fallbackImage}
          alt={alt}
        />
      ) : (
        <div className=" w-full h-fit ">
          <Image {...props} className={className} src={src} alt={alt} />
        </div>
      )}
    </>
  )
}
