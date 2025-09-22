'use client'
import React from 'react'
import Image from 'next/image'

import bannerMobile from '/public/images/banner-chatbot-mobile.webp'
import bannerDesktop from '/public/images/banner-chatbot-desktop.webp'

export const BannerChatbot: React.FC = () => {
  return (
    <div className=" my-8">
      <div className="relative w-full h-[215px] md:hidden">
        <Image
          className="w-full h-full rounded-xl"
          src={bannerMobile}
          alt="Image banner chatbot mobile version"
          fill
        />
      </div>
      <div className="relative w-full h-[350px] lg:h-auto lg:aspect-[6/2] hidden md:block">
        <Image
          className="w-full h-full rounded-2xl"
          src={bannerDesktop}
          alt="Image banner chatbot desktop version"
          fill
        />
      </div>
    </div>
  )
}
