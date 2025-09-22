/* eslint-disable @typescript-eslint/no-explicit-any */

// src/components/video/VideoPlayerList.tsx
'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Post, Tag } from '@/lib/api/wp/wp-types'
import { ShortVideoItem } from '@/components/video/ShortVideoItem'

type VideoPlayerListProps = {
  items: Post[]
  tags: Tag[]
  defaultIndex?: number
}

export const VideoPlayerList: React.FC<VideoPlayerListProps> = ({
  items = [],
  tags = [],
  defaultIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)

  return (
    <div className="relative w-screen h-[100dvh] md:h-[85svh] lg:h-[90svh] lg:pt-10 md:max-w-lg lg:max-w-xl mx-auto">
      <Swiper
        initialSlide={defaultIndex}
        slidesPerView={1}
        centeredSlides
        direction="vertical"
        className="w-full h-full md:rounded-lg"
        onBeforeInit={() => setCurrentIndex(defaultIndex)}
        onSlideChange={(slide) => {
          setCurrentIndex(slide.activeIndex)
        }}
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex
          const shouldPreload = Math.abs(index - currentIndex) <= 1

          return (
            <SwiperSlide
              key={item.id || index}
              className="relative w-full h-full pointer-events-auto md:rounded-lg"
            >
              <ShortVideoItem
                item={item}
                tags={tags}
                isActive={isActive}
                shouldPreload={shouldPreload}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}