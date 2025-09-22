'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import travelerIcon from '/public/icons/corresponsales-icon.svg'

type TravelerBannerProps = {
  urlTravelerImage?: string
  urlLastPostImage?: string
  name?: string
  // subtitle?: string
}

export const TravelerBanner: React.FC<TravelerBannerProps> = ({
  urlTravelerImage = '',
  urlLastPostImage = '',
  name = '',
  // subtitle = 'Conocé a nuestros viajeros y acompañalos a recorrer diferentes culturas, costumbres, sabores, paisajes y mucho más!',
}) => {
  return (
    <div className="relative w-full h-[210px] md:h-[500px] mb-4 overflow-hidden">
      <motion.div
        className="absolute z-0 w-full h-full"
        initial={{ opacity: 0.8, scale: 1 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{
          duration: 80,
        }}
      >
        <Image
          src={urlLastPostImage || '/images/corresponsales.webp'}
          alt="Background banner image"
          className=" relative w-full h-auto object-cover object-center"
          fill
        />
      </motion.div>

      <div className="w-full h-full absolute flex justify-end flex-col bg-red-400/0">
        <div className=" w-full h-full absolute z-0 bg-gradient-to-b from-black/0 via-black/30 to-black backdrop-blur-sm "></div>

        <div className=" w-full z-20 xl:max-w-screen-xl mx-auto mb-4 px-4 lg:px-6 xl:px-3 flex flex-col items-left gap-2 bg-red-300/0">
          <div className=" flex items-center gap-4 md:gap-6 bg-sky-400/0 ">
            <div className="relative w-20 h-20 md:w-40 md:h-40">
              {urlTravelerImage ? (
                <Image
                  src={urlTravelerImage || '/images/corresponsales.webp'}
                  alt={`${name} Traveler image`}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  className=" rounded-full border-4 border-white "
                />
              ) : (
                <div className=" w-full h-full p-2 lg:p-4 overflow-hidden flex items-center justify-center bg-neutral-700 border-4 border-white  group-hover:scale-110 group-active:scale-100 transition-all duration-200 ease-in-out rounded-full">
                  <Image
                    className="w-2/4 h-auto "
                    src={travelerIcon}
                    alt="Traveler Icon"
                  />
                </div>
              )}
            </div>

            <h2 className=" w-full max-w-[200px] text-balance text-white font-oswald font-bold text-2xl capitalize md:text-5xl xl:text-6xl">
              {name}
            </h2>
          </div>
          {/* <p className=" text-white font-normal text-[10px] mb-3 leading-[12px] text-balance capitalize md:text-lg">
            {subtitle}
          </p> */}
        </div>
      </div>
    </div>
  )
}
