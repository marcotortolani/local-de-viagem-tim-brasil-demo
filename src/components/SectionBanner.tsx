'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

type SectionBannerProps = {
  bgImage?: string
  title?: string
  titleImage?: string
  subtitle?: string
}

export const SectionBanner: React.FC<SectionBannerProps> = ({
  bgImage = '',
  title = '',
  titleImage = '',
  subtitle = '',
}) => {
  if (!bgImage) return null

  return (
    <div className="relative w-full h-[150px] md:h-[300px] mb-4 overflow-hidden">
      <motion.div
        className="absolute z-0 w-full h-full overflow-hidden"
        initial={{ opacity: 0.8, scale: 1 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{
          duration: 80,
        }}
      >
        <Image
          src={bgImage}
          alt="Banner image"
          className=" relative w-full h-auto object-cover object-center "
          fill
        />
      </motion.div>

      {titleImage && (
        <div className="absolute z-20 top-0 w-full h-full overflow-hidden ">
          <div className=" relative w-2/5 max-w-[400px] md:max-w-[350px] mx-auto h-full flex items-center justify-center ">
            <Image
              src={titleImage}
              alt="Banner image"
              className=" relative w-full h-auto object-contain"
              fill
            />
          </div>
        </div>
      )}
      {!titleImage && title && (
        <div className="absolute z-20 top-0 w-full h-full overflow-hidden flex items-center justify-center">
          <p className="xl:max-w-screen-xl mx-auto xl:px-3 text-white font-normal text-[10px] md:text-lg">
            {title}
          </p>
        </div>
      )}
      <div className="w-full h-full absolute z-20 flex justify-end flex-col">
        <div className=" relative w-full h-full px-4 pt-4 ">
          <p className="xl:max-w-screen-xl mx-auto xl:px-3 text-white font-normal text-[10px] mb-3 leading-[12px] md:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
