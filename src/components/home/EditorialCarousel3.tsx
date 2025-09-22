'use client'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Post } from '@/lib/api/wp/wp-types'
import { SectionTitle } from '@/components/text/SectionTitle'
import { EditorialCarouselItem3 } from '@/components/home/EditorialCarouselItem3'

type EditorialCarouselProps = {
  title?: string
  moreLink?: string
  items: Post[]
  color?: string
}

export const EditorialCarousel3: React.FC<EditorialCarouselProps> = ({
  title,
  moreLink = '#',
  items = [],
  color = 'text-white',
}) => {
  
  return (
    <div>
      <div className="flex items-center justify-between mb-1 md:mb-4">
        <SectionTitle color={color}>{title}</SectionTitle>
        <Link
          href={moreLink}
          className="text-primary text-xs md:text-[16px]  font-normal flex items-center"
        >
          Ver más <ChevronRight size={20} className="ml-1" />
        </Link>
      </div>

      <Swiper
        className="relative h-full w-full"
        initialSlide={0}
        navigation={false}
        pagination={false}
        modules={[Navigation, Pagination, Autoplay]}
        speed={1500}
        breakpoints={{
          0: {
            slidesPerView: 3.75,
            spaceBetween: 5,
            direction: 'horizontal',
          },
          768: {
            slidesPerView: 3.75,
            spaceBetween: 15,
            direction: 'horizontal',
          },
          1024: {
            slidesPerView: 4.2,
            spaceBetween: 20,
            direction: 'horizontal',
          },
          1440: {
            slidesPerView: 4.2,
            spaceBetween: 20,
            direction: 'horizontal',
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <EditorialCarouselItem3 item={item} category={moreLink} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
