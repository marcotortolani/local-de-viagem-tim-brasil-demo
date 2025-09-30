'use client'
import React, { useEffect, useState } from 'react'
import { Category, Post } from '@/lib/api/wp/wp-types'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { Container } from '@/components/Container'
import { Pagination } from '@/components/pagination/Pagination'
import { SkeletonCard, VerticalCard } from '@/components/VerticalCard'

import dictionary from '@/dictionary/lang.json'

type Props = {
  category: Category
  parentSlug?: string
  url?: string
}

const PER_PAGE = 6

export const SectionGridPagination: React.FC<Props> = ({
  category,
  parentSlug = '',
}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const url =
    parentSlug === '/' ? category.slug : `${parentSlug}/${category.slug}`

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

  const content = loading ? (
    // <Loading />
    <div className=" mb-4 lg:mb-6 xl:mb-10 pt-2">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-8">
        {new Array(PER_PAGE).fill(0).map((_, key) => (
          <SkeletonCard key={key} />
        ))}
      </div>
    </div>
  ) : (
    <div className=" mb-4 lg:mb-6 xl:mb-10 pt-2">
      {posts.length ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-8">
          {posts.map((item, key) => (
            <VerticalCard item={item} key={key} categorySlug={url || ''} />
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
