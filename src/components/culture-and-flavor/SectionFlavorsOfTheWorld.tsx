'use client'
import React, { useEffect, useState } from 'react'
import { Post } from '@/lib/api/wp/wp-types'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { Pagination } from '@/components/pagination/Pagination'
import { SkeletonCard, VerticalCard } from '@/components/VerticalCard'

import { Separator } from '../ui/separator'
import { CATEGORIES } from '@/lib/constants'

type Props = {
  parentSlug?: string
}

const PER_PAGE = 8

export const SectionFlavorsOfTheWorld: React.FC<Props> = ({
  parentSlug = '',
}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    const getPosts = async () => {
      const regionesDestacadas = await getWpPosts({
        categories: CATEGORIES['flavors-of-the-world'].toString(),
        per_page: PER_PAGE,
        offset: PER_PAGE * currentPage,
      })
      setPosts(regionesDestacadas.posts || [])
      setLoading(false)
      setPages(regionesDestacadas.totalPages)
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
          No tienes contenido disponible
        </div>
      )}
    </div>
  )

  return (
    <section className="z-0 w-full max-w-screen-2xl mx-auto px-2 mb-4 lg:mb-8 xl:pb-10 mt-4 ">
      {/* Title & Filters */}
      <div className=" sticky top-20 md:top-[5.8rem] lg:top-24 bg-tertiary z-30 w-full h-full md:px-2 py-2 md:py-3 flex flex-col lg:flex-row items-start gap-2 lg:items-center justify-between ">
        <div className="w-full flex items-center justify-between">
          <h2 className=" flex items-center gap-2  ">
            <span className=" font-sign-painter text-4xl xl:text-5xl font-light text-neutral-600/70">
              Sabores del
            </span>{' '}
            <span className=" mb-2 xl:mb-3 italic font-normal font-oswald text-3xl lg:text-4xl xl:text-5xl text-white">
              Mundo
            </span>
          </h2>
        </div>
      </div>

      <Separator className=" my-4 xl:mt-6 xl:mb-10 bg-neutral-500/40" />

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
