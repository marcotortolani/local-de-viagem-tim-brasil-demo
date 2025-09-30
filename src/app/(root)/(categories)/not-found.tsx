import Link from 'next/link'
import React from 'react'
import bgDefault from '/public/images/default.webp'
import Image from 'next/image'

import dictionary from '@/dictionary/lang.json'

export default function NotFound() {
  return (
    <div className=" relative w-full h-[50dvh] min-h-[80dvh] mt-10 flex flex-col items-center justify-center">
      <div className=" w-3/4 max-w-[750px] aspect-[9/14] md:aspect-video absolute">
        <Image
          src={bgDefault}
          alt="default"
          className=" w-full h-full object-cover rounded-2xl"
          fill
        />
      </div>
      <div className=" w-5/6 max-w-[400px] mx-auto py-6 z-10 flex flex-col items-center justify-center gap-4 md:gap-0 bg-black/80 rounded-xl">
        <div className=" relative h-20 flex flex-col md:flex-row items-center justify-center md:gap-4 ">
          <h4 className=" text-white font-semibold text-2xl">404</h4>
          <span className=" hidden md:block text-white">|</span>
          <p className=" text-white text-lg ">
            {dictionary['Content not found']}
          </p>
        </div>
        <Link
          href="/"
          className=" z-10 mt-4 inline-flex items-center justify-center rounded-[5px]  font-semibold text-[14px] h-10 py-[3px] px-[10px] bg-primary hover:bg-primary/80 text-text"
        >
          {dictionary['Back to Home']}
        </Link>
      </div>
    </div>
  )
}
