'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
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
import { SliderVerticalPosts2 } from './SliderVerticalPosts2'
import { getWpPosts } from '@/lib/api/wp/wp-actions'

import dictionary from '@/dictionary/lang.json'

const ITEMS_GRID_PAISAJES = {
  vimeoVideo: GRID_VIDEOS['landscapes'],
  videoFrame: '/images/grid-paisajes/paisajes-video-preview.webp',
  imageH: '/images/grid-paisajes/paisajes-horizontal-grid.webp',
  imageV: '/images/grid-paisajes/paisajes-vertical-grid.webp',
}

type Props = {
  parentSlug: string
}

export function SectionLandscapes({ parentSlug }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  //const [loading, setLoading] = useState(true)

  const [tagsSelected, setTagsSelected] = useState<number[]>([])

  const handleTagSelected = ({ tagSelected }: { tagSelected: number }) => {
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
    //setLoading(true)
    const getPosts = async () => {
      const regionesDestacadas = await getWpPosts({
        categories: CATEGORIES['inspired-by'].toString(),
        per_page: 10,
        tags: convertTagsToString({ tagsSelected }),
      })
      setPosts(regionesDestacadas.posts || [])
      //setLoading(false)
    }
    getPosts()
  }, [tagsSelected])

  return (
    <section className="relative w-full bg-neutral-600 sm:pt-4 lg:pt-6">
      <div className=" w-full md:px-4 lg:max-w-screen-xl mx-auto">
        <BannerGridVideo
          items={ITEMS_GRID_PAISAJES}
          videoPosition="bottom-right"
          colorLines="bg-neutral-600"
          colorOutline="outline-neutral-600"
          colorBorder="border-neutral-600"
        >
          <div className=" absolute bottom-0 w-full h-1/2 pb-4 lg:pb-6 xl:pb-8 bg-gradient-to-b from-transparent via-black/40 to-black/90 flex items-end justify-center">
            <h2 className=" flex items-center gap-2">
              <span className=" font-sign-painter text-4xl xl:text-6xl font-light text-primary-light">
                {dictionary['Discover']}
              </span>{' '}
              <span className=" italic font-normal font-oswald text-4xl xl:text-6xl lg:pb-2 xl:pb-4 text-white">
                +{dictionary['Landscapes']}
              </span>
            </h2>
          </div>
        </BannerGridVideo>
      </div>
      {/* Filtros */}
      <div
        className="z-20 relative w-full mx-auto my-6 xl:my-10 px-4 overflow-x-auto bg-scroll sm:overflow-hidden flex flex-row items-center lg:justify-center gap-2  xl:gap-6"
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
                <SlidersHorizontalIcon className="w-6 h-6 stroke-[#40C9BC] group-hover:opacity-80 " />
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
              className={` px-4 md:px-4 lg:px-6 pb-0.5 font-oswald text-base xl:text-xl text-nowrap lowercase border border-white rounded-full transition-all duration-200 ease-in-out ${
                tagsSelected.includes(tag.id)
                  ? 'bg-white text-neutral-500 hover:bg-white/60'
                  : 'bg-transparent text-quaternary hover:bg-white/20 hover:text-quaternary/80'
              }`}
              onClick={() => handleTagSelected({ tagSelected: tag.id })}
            >
              #{tag.slug}
            </button>
          ))}
        </div>
      </div>

      {posts.length > 0 && (
        <div className="relative w-full max-w-screen-2xl mx-auto pb-4 ">
          <SliderVerticalPosts2
            posts={posts}
            pagination={true}
            parentSlug={parentSlug}
          />
        </div>
      )}
      <div className=" absolute bottom-0 z-0 w-full h-1/3 xl:h-2/5 ">
        <Image
          className=" relative w-auto h-full object-cover object-bottom opacity-50 xl:opacity-40 "
          src="/images/bg-city-map-pattern.webp"
          alt="Image background City Map Pattern"
          fill
          priority
        />
      </div>
    </section>
  )
}
