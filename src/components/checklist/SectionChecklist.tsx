'use client'
import React, { useEffect, useState } from 'react'
import { Post } from '@/lib/api/wp/wp-types'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { Pagination } from '@/components/pagination/Pagination'
import { SkeletonCard, VerticalCard } from '@/components/VerticalCard'
import { SlidersHorizontalIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '../ui/tooltip'
import { Separator } from '../ui/separator'
import { CATEGORIES, CHECKLIST_TAGS } from '@/lib/constants'

type Props = {
  parentSlug?: string
}

const PER_PAGE = 12

export const SectionChecklist: React.FC<Props> = ({ parentSlug = '' }) => {
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
      CHECKLIST_TAGS.forEach((tag, index) => {
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
      const regionesDestacadas = await getWpPosts({
        categories: CATEGORIES['checklist'].toString(),
        per_page: PER_PAGE,
        tags: convertTagsToString({ tagsSelected }),
        offset: PER_PAGE * currentPage,
      })
      setPosts(regionesDestacadas.posts || [])
      setLoading(false)
      setPages(regionesDestacadas.totalPages)
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
    <section className="z-0 w-full max-w-screen-2xl mx-auto px-2 mb-4 lg:mb-8 xl:pb-10 mt-4 ">
      {/* Title & Filters */}
      <div className=" sticky top-20 md:top-[5.8rem] lg:top-24 bg-primary-dark z-30 w-full h-full md:px-2 py-2 md:py-3 flex flex-row items-center justify-between gap-2 ">
        <div
          className=" w-full md:min-w-fit overflow-x-auto bg-scroll sm:overflow-hidden flex items-center justify-start lg:justify-center gap-2 "
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
                    <SlidersHorizontalIcon className="w-6 h-6 stroke-quaternary group-hover:opacity-80 transition-all duration-200 ease-in-out" />
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
            {CHECKLIST_TAGS.map((tag) => (
              <button
                key={tag.slug}
                className={` px-4 md:px-4 lg:px-6 pb-0.5 font-oswald text-base xl:text-xl text-nowrap lowercase border-2 border-white rounded-full transition-all duration-200 ease-in-out ${
                  tagsSelected.includes(tag.id)
                    ? 'bg-white text-neutral-500 hover:bg-white/60'
                    : 'bg-transparent text-quaternary hover:bg-white/40 hover:text-quaternary/80'
                }`}
                onClick={() => handleTagSelected({ tagSelected: tag.id })}
              >
                #{tag.name}
              </button>
            ))}
          {/* <div className="w-full flex items-center jus gap-2">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setTagsSelected([])}
                    className=" relative group hover:scale-105 active:scale-100 transition-all duration-200 ease-in-out"
                  >
                    <SlidersHorizontalIcon className="w-6 h-6 stroke-quaternary group-hover:opacity-80 transition-all duration-200 ease-in-out" />
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
            {CHECKLIST_TAGS.map((tag) => (
              <button
                key={tag.slug}
                className={` px-4 md:px-4 lg:px-6 pb-0.5 font-oswald text-base xl:text-xl text-nowrap lowercase border-2 border-white rounded-full transition-all duration-200 ease-in-out ${
                  tagsSelected.includes(tag.id)
                    ? 'bg-white text-neutral-500 hover:bg-white/60'
                    : 'bg-transparent text-quaternary hover:bg-white/40 hover:text-quaternary/80'
                }`}
                onClick={() => handleTagSelected({ tagSelected: tag.id })}
              >
                #{tag.name}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      <Separator className=" my-4 xl:mt-6 xl:mb-10 bg-neutral-400/60" />

      {content}

      <Pagination
        pages={pages}
        currentPage={currentPage}
        onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
        onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
      />
    </section>
  )
}
