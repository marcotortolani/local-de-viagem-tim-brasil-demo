'use client'
import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { VideoPosterItem } from '@/components/video/VideoPosterItem'
import { Post } from '@/lib/api/wp/wp-types'
import { SectionTitle } from '@/components/text/SectionTitle'
import SeeMore from '../ui/see-more'

type VideoCarouselProps = {
  title?: string
  moreLink?: string
  items: Post[]
  color?: string
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
  title,
  moreLink = '#',
  items = [],
  color = 'text-black',
}) => {
  // const [isAtStart, setIsAtStart] = useState(true)
  // const [isAtEnd, setIsAtEnd] = useState(false)

  return (
    <div className=" mt-6">
      <div className="flex items-center justify-between md:mb-4">
        <SectionTitle color={color}>{title}</SectionTitle>
        <SeeMore moreLink={moreLink} text="Ver más" />
      </div>

      <Swiper
        className="relative h-full w-full mb-4"
        initialSlide={0}
        navigation={false}
        pagination={false}
        modules={[Navigation, Pagination, Autoplay]}
        speed={1500}
        // onSlideChange={(swiper) => {
        //   setIsAtStart(swiper.isBeginning)
        //   setIsAtEnd(swiper.isEnd)
        // }}
        breakpoints={{
          0: {
            slidesPerView: 2.75,
            spaceBetween: 10,
            direction: 'horizontal',
          },
          768: {
            slidesPerView: 3.15,
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
        {items.map((item, index) => {
          const isVideo = item?.video?.url?.includes('http') ? true : false
          let urlRedirect = ''

          if (isVideo) {
            urlRedirect = `${moreLink}/videos`
          } else {
            urlRedirect = `${moreLink}/editorial`
          }

          return (
            <SwiperSlide key={index}>
              <VideoPosterItem
                item={item}
                url={`${urlRedirect}/${encodeURI(item.slug as string)}`}
                isVideo={isVideo}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
