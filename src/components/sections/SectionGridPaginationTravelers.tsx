'use client'
import React, { useEffect, useState } from 'react'
import { Category, Post } from '@/lib/api/wp/wp-types'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { Container } from '@/components/Container'
import { Pagination } from '@/components/pagination/Pagination'
import { VerticalCard } from '@/components/VerticalCard'

import dictionary from '@/dictionary/lang.json'

type Props = {
  category: Category
  parentSlug?: string
  url?: string
}

const PER_PAGE = 6

export const SectionGridPaginationTravelers: React.FC<Props> = ({
  category,
  parentSlug = '',
}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    const getPosts = async () => {
      const data = await getWpPosts({
        categories: category.id?.toString(),
        per_page: PER_PAGE,
        offset: PER_PAGE * currentPage,
      })
      setPosts(data.posts || [])
      setLoading(false)
      setPages(data.totalPages)
    }
    getPosts()
  }, [category, currentPage])

  if (!posts.length) return null

  const content = loading ? (
    <div className=" mb-4 lg:mb-6 xl:mb-10 pt-2">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 ">
        {new Array(PER_PAGE).fill(0).map((_, key) => (
          <SkeletonCard key={key} />
        ))}
      </div>
    </div>
  ) : (
    <div className=" mb-4 lg:mb-6 xl:mb-10 pt-2">
      {posts.length ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 ">
          {posts.map((item, key) => (
            <VerticalCard
              item={item}
              key={key}
              categorySlug={`${parentSlug}` || ''}
            />
          ))}
        </div>
      ) : (
        <div className="w-4/5 max-w-[300px] mx-auto text-black text-center bg-[#666666] py-4 rounded-xl ">
          {dictionary['No content available']}
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full px-2 mb-4 ">
      <Container className=" px-0 lg:px-6 xl:px-3 min-h-fit">
        {content}
        <Pagination
          pages={pages}
          currentPage={currentPage}
          onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
          onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
        />
      </Container>
    </div>
  )
}

const SkeletonCard = () => {
  return (
    <div className="relative w-full aspect-[4/5] bg-neutral-300 opacity-70 p-3 rounded-xl animate-pulse">
      <div className=" w-full h-full bg-neutral-700 rounded-[inherit]"></div>
      <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
        <div className=" w-20 h-20 bg-neutral-600 rounded-full"></div>
      </div>
      <p className=" absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-600 h-8 w-5/6 mx-auto"></p>
    </div>
  )
}
