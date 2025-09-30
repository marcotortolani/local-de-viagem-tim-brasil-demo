'use client'

import React, { useState, useEffect } from 'react'
import { BannerGridVideo } from '../BannerGridVideo'
import { CATEGORIES, GRID_VIDEOS } from '@/lib/constants'
import { Post } from '@/lib/api/wp/wp-types'

import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { SkeletonCard, VerticalCard } from '@/components/VerticalCard'

import { Pagination } from '../pagination/Pagination'
import { Separator } from '../ui/separator'

import dictionary from '@/dictionary/lang.json'

const ITEMS_GRID_DETRAS_DEL_MAPA = {
  vimeoVideo: GRID_VIDEOS['behind-the-map'],
  videoFrame: '/images/grid-detras-del-mapa/detras-del-mapa-video-preview.webp',
  imageH: '/images/grid-detras-del-mapa/detras-del-mapa-horizontal-grid.webp',
  imageV: '/images/grid-detras-del-mapa/detras-del-mapa-vertical-grid.webp',
}

type Props = {
  parentSlug: string
}

const PER_PAGE = 8

export function SectionBehindTheMap({ parentSlug }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    const getPosts = async () => {
      const itineraries = await getWpPosts({
        categories: CATEGORIES['behind-the-map'].toString(),
        per_page: PER_PAGE,
        offset: PER_PAGE * currentPage,
      })
      setPosts(itineraries.posts || [])
      setLoading(false)
      setPages(itineraries.totalPages)
    }
    getPosts()
  }, [currentPage])

  const content = loading ? (
    <div className=" mb-4 lg:mb-6 xl:mb-10 pt-2 ">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-8">
        {new Array(PER_PAGE).fill(0).map((_, key) => (
          <SkeletonCard key={key} />
        ))}
      </div>
    </div>
  ) : (
    <div className=" mb-4 lg:mb-6 xl:mb-10 pt-2">
      {posts?.length ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-8">
          {posts.map((item, key) => (
            <VerticalCard
              item={item}
              key={key}
              categorySlug={parentSlug || ''}
            />
          ))}
        </div>
      ) : (
        <div className="w-4/5 max-w-[300px] mx-auto text-black text-center bg-white py-4 rounded-xl ">
          {dictionary['No content available']}
        </div>
      )}
    </div>
  )

  return (
    <section className="relative w-full bg-primary-dark sm:pt-4 lg:pt-20 pb-28">
      <div className=" absolute top-0 left-0 mt-0 md:-mt-1 lg:-mt-5 w-full h-1/4 xl:h-1/4 bg-gradient-to-t from-primary-dark to-tertiary "></div>
      <div className=" w-full md:px-4 lg:max-w-screen-xl mx-auto">
        <BannerGridVideo
          items={ITEMS_GRID_DETRAS_DEL_MAPA}
          videoPosition="bottom-right"
          colorLines="bg-primary-dark"
          colorOutline="outline-primary-dark"
          colorBorder="border-primary-dark"
        >
          <div className=" absolute bottom-0 w-full h-2/3 pl-4 md:pl-6 lg:px-8 pb-4 md:pb-8 bg-gradient-to-b from-transparent via-black/40 to-black/90 flex flex-col items-start justify-end lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className=" flex flex-col items-start md:gap-1">
              <span className=" font-sign-painter text-4xl md:text-5xl xl:text-6xl font-light text-tertiary">
                {dictionary['Discover']}
              </span>{' '}
              <span className=" italic font-light font-oswald text-3xl sm:text-4xl md:text-5xl xl:text-6xl -mt-3 lg:pb-0 lg:pl-2 text-white">
                {dictionary['Behing the map']}
              </span>
            </h2>
          </div>
        </BannerGridVideo>
      </div>

      <Separator className=" w-5/6 lg:w-full max-w-screen-lg mx-auto my-4 xl:mt-6 xl:mb-10 bg-white/80" />

      <div className=" w-full max-w-screen-2xl mx-auto px-4 ">
        {content}

        <Pagination
          pages={pages}
          currentPage={currentPage}
          onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
          onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
        />
      </div>
    </section>
  )
}
