'use client'

import React, { useState, useEffect } from 'react'
import { BannerGridVideo } from '../BannerGridVideo'
import { CATEGORIES, DESTINO_TAGS } from '@/lib/constants'
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
import { Separator } from '../ui/separator'
import { Pagination } from '../pagination/Pagination'
//import SeeMore from '../ui/see-more'
import Image from 'next/image'

const ITEMS_GRID_ITINERARIES = {
  video: '/videos/grid-itineraries/itineraries-video.mp4',
  videoFrame: '/images/grid-itineraries/itineraries-video-preview.webp',
  imageH: '/images/grid-itineraries/itineraries-horizontal-grid.webp',
  imageV: '/images/grid-itineraries/itineraries-vertical-grid.webp',
}

type Props = {
  parentSlug: string
}

const PER_PAGE = 8

export function Sectionitineraries({ parentSlug }: Props) {
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
      DESTINO_TAGS.forEach((tag, index) => {
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
        categories: CATEGORIES['itineraries'].toString(),
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
          No tienes contenido disponible
        </div>
      )}
    </div>
  )

  return (
    <section className="relative w-full bg-primary sm:pt-4 lg:pt-6 pb-28">
      <div className=" w-full md:px-4 lg:max-w-screen-xl mx-auto">
        <BannerGridVideo
          items={ITEMS_GRID_ITINERARIES}
          videoPosition="bottom-right"
          colorLines="bg-primary"
          colorOutline="outline-primary"
          colorBorder="border-primary"
        >
          <div className=" absolute bottom-0 w-full h-1/2 pb-4 pl-10 lg:pl-0 lg:pb-6 xl:pb-8 bg-gradient-to-b from-transparent via-black/40 to-black/90 flex items-end justify-start lg:justify-center">
            <h2 className=" flex flex-col lg:flex-row lg:gap-4 items-start">
              <span className=" pl-2 lg:pl-0 -mb-2 lg:mb-0 font-sign-painter text-4xl xl:text-6xl font-light text-secondary">
                Descubre
              </span>{' '}
              <span className=" italic font-normal font-oswald text-4xl xl:text-6xl lg:pb-2 xl:pb-4 text-white">
                itineraries
              </span>
            </h2>
          </div>
        </BannerGridVideo>
      </div>
      {/* Filtros */}
      <div
        className="sticky top-20 md:top-[5.8rem] z-30 bg-primary w-full mx-auto my-6 xl:my-10 px-4 py-2 md:py-3 xl:py-4 overflow-x-auto bg-scroll sm:overflow-hidden flex flex-row items-center lg:justify-center gap-2  xl:gap-6"
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
                <SlidersHorizontalIcon className="w-6 h-6 stroke-[#F28B82] group-hover:opacity-80 " />
              </button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={4}
              className=" bg-white text-neutral-600 font-oswald text-sm"
            >
              <p>Limpiar Filtros</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className=" flex items-center gap-2">
          {DESTINO_TAGS.map((tag) => (
            <button
              key={tag.slug}
              className={` px-4 md:px-4 lg:px-6 pb-0.5 font-oswald text-base xl:text-xl text-nowrap lowercase border border-white rounded-full transition-all duration-200 ease-in-out ${
                tagsSelected.includes(tag.id)
                  ? 'bg-white text-neutral-500 hover:bg-white/60'
                  : 'bg-transparent text-secondary hover:bg-white/20 '
              }`}
              onClick={() => handleTagSelected({ tagSelected: tag.id })}
            >
              #{tag.slug}
            </button>
          ))}
        </div>
      </div>

      <div className=" w-full max-w-screen-2xl mx-auto px-4 ">
        <div className=" lg:px-4 my-4 xl:mt-6 xl:mb-10 flex items-center justify-between gap-2 xl:gap-4">
          <Separator className=" w-full shrink bg-white/80" />
          {/* <SeeMore
            text="Ver más"
            moreLink="/inspired-by/itineraries"
            className=" min-w-fit text-white border-white"
          /> */}
        </div>

        {content}

        <Pagination
          pages={pages}
          currentPage={currentPage}
          onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
          onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
        />
      </div>
      <div className=" relative w-full max-w-[1920px] mx-auto h-[25svh] xl:h-[50svh] min-h-[160px] my-4 ">
        <Image
          className=" relative hidden sm:flex w-full h-auto md:w-auto md:h-full object-fill md:object-cover "
          src="/images/bg-regions-3-desktop.webp"
          alt="Image background desktop version"
          fill
          priority
        />
        <Image
          className=" relative sm:hidden w-full h-full object-fill md:object-cover "
          src="/images/bg-regions-3-mobile.webp"
          alt="Image background mobile version"
          fill
          priority
        />
        <div className=" absolute -top-0.5 w-full h-1/2 bg-gradient-to-b from-primary to-transparent"></div>
        <div className=" absolute -bottom-0.5 w-full h-1/2 bg-gradient-to-t from-primary to-transparent"></div>
      </div>
    </section>
  )
}
