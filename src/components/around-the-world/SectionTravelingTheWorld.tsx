'use client'

import React, { useState, useEffect } from 'react'
import { BannerGridVideo } from '../BannerGridVideo'
import { CATEGORIES, DESTINATION_TAGS, GRID_VIDEOS } from '@/lib/constants'
import { Post } from '@/lib/api/wp/wp-types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { SlidersHorizontalIcon } from 'lucide-react'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { SkeletonCard, VerticalCard } from '@/components/VerticalCard'

import { Pagination } from '../pagination/Pagination'
import { Separator } from '../ui/separator'

import dictionary from '@/dictionary/lang.json'

const ITEMS_GRID_POR_EL_MUNDO = {
  vimeoVideo: GRID_VIDEOS['around-the-world'],
  videoFrame: '/images/grid-por-el-mundo/por-el-mundo-video-preview.webp',
  imageH: '/images/grid-por-el-mundo/por-el-mundo-horizontal-grid.webp',
  imageV: '/images/grid-por-el-mundo/por-el-mundo-vertical-grid.webp',
}

type Props = {
  parentSlug: string
}

const PER_PAGE = 8

export function SectionTravelingTheWorld({ parentSlug }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [tagsSelected, setTagsSelected] = useState<number[]>([])

  const handleTagSelected = ({ tagSelected }: { tagSelected: number }) => {
    setCurrentPage(0)
    if (tagsSelected.includes(tagSelected)) {
      setTagsSelected(tagsSelected.filter((item) => item !== tagSelected))
    } else {
      setTagsSelected([...tagsSelected, tagSelected])
    }
  }

  const convertTagsToString = ({
    tagsSelected,
  }: {
    tagsSelected: number[]
  }) => {
    let tags = ''
    if (tagsSelected.length === 0) {
      DESTINATION_TAGS.forEach((tag, index) => {
        if (index === 0) {
          tags += tag.id
        } else {
          tags += `,${tag.id}`
        }
      })
      return tags
    }
    tagsSelected.forEach((tag, index) => {
      if (index === 0) {
        tags += tag
      } else {
        tags += `,${tag}`
      }
    })
    return tags
  }

  useEffect(() => {
    setLoading(true)
    const getPosts = async () => {
      const itineraries = await getWpPosts({
        categories: CATEGORIES['traveling-the-world'].toString(),
        per_page: PER_PAGE,
        tags: convertTagsToString({ tagsSelected }),
        offset: PER_PAGE * currentPage,
      })
      setPosts(itineraries.posts || [])
      setLoading(false)
      setPages(itineraries.totalPages)
    }
    getPosts()
  }, [currentPage, tagsSelected])

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
    <section className="relative w-full bg-neutral-600 sm:pt-4 lg:pt-20 pb-28">
      <div className=" absolute top-0 left-0 mt-0 md:-mt-1 lg:-mt-5 w-full h-1/4 xl:h-1/4 bg-gradient-to-t from-neutral-600 to-quaternary "></div>
      <div className=" w-full md:px-4 lg:max-w-screen-xl mx-auto">
        <BannerGridVideo
          items={ITEMS_GRID_POR_EL_MUNDO}
          videoPosition="bottom-right"
          colorLines="bg-quaternary-dark"
          colorOutline="outline-quaternary-dark"
          colorBorder="border-quaternary-dark"
        >
          <div className=" absolute bottom-0 w-full h-2/3 pl-4 md:pl-6 lg:px-8 pb-4 md:pb-8 bg-gradient-to-b from-transparent via-black/40 to-black/90 flex flex-col items-start justify-end lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className=" flex flex-col items-start md:gap-1">
              <span className=" font-sign-painter text-5xl xl:text-6xl font-light text-primary-light">
                {dictionary['Traveling']}
              </span>{' '}
              <span className=" italic font-normal font-oswald text-4xl md:text-5xl xl:text-6xl -mt-3 lg:pb-0 lg:pl-2 text-white">
                {dictionary['the World']}
              </span>
            </h2>
          </div>
        </BannerGridVideo>
      </div>
      {/* Filtros */}
      <div
        className="sticky top-20 md:top-[5.8rem] z-30 bg-neutral-600 w-full mx-auto my-6 xl:my-10 px-4 py-2 md:py-3 xl:py-4 overflow-x-auto bg-scroll sm:overflow-hidden flex flex-row items-center lg:justify-center gap-2  xl:gap-6"
        style={{ scrollbarWidth: 'none' }}
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setTagsSelected([])}
                className=" relative group hover:scale-105 active:scale-100 transition-all duration-200 ease-in-out"
              >
                <SlidersHorizontalIcon className="w-6 h-6 stroke-quaternary group-hover:opacity-80 " />
              </button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={4}
              className=" bg-white text-neutral-600 font-oswald text-sm"
            >
              <p>{dictionary['Clear Filters']}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className=" flex items-center gap-2">
          {DESTINATION_TAGS.map((tag) => (
            <button
              key={tag.slug}
              className={` px-4 md:px-4 lg:px-6 pb-0.5 font-oswald text-base xl:text-xl text-nowrap lowercase border-2 border-white rounded-full transition-all duration-200 ease-in-out ${
                tagsSelected.includes(tag.id)
                  ? 'bg-white text-neutral-500 hover:bg-white/60'
                  : 'bg-transparent text-quaternary hover:bg-white/20 hover:text-quaternary/80 transition-all duration-200 ease-in-out '
              }`}
              onClick={() => handleTagSelected({ tagSelected: tag.id })}
            >
              #{tag.name}
            </button>
          ))}
        </div>
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
