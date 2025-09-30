'use client'
import React, { useEffect, useState } from 'react'
//import dynamic from 'next/dynamic'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { useFavoriteStore } from '@/lib/modules/favorite/favorite-stores'
import { Post } from '@/lib/api/wp/wp-types'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/text/SectionTitle'
import { Pagination } from '@/components/pagination/Pagination'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { FavoriteEditorialSectionItem } from '@/components/favorites/FavoriteEditorialSectionItem'

import dictionary from '@/dictionary/lang.json'

// const Loading = dynamic(() => import('@/components/Loading'), {
//   ssr: false,
// })

const PER_PAGE = 12

export default function Page() {
  const { editorial } = useFavoriteStore()
  const [editorialPosts, setEditorialPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    if (editorial.length) {
      const getFavoritePosts = async () => {
        const data = await getWpPosts({
          include: editorial.join(','),
          per_page: PER_PAGE,
          offset: PER_PAGE * currentPage,
        })
        setEditorialPosts(data.posts || [])
        setLoading(false)
        setPages(data.totalPages)
      }
      getFavoritePosts()
    } else {
      setLoading(false)
    }
  }, [editorial.length, currentPage])

  const content = loading ? (
    <div className=" mt-4 mb-8">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {new Array(PER_PAGE).fill(0).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  ) : (
    <div className=" mt-4 mb-8">
      {editorial.length ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {editorialPosts.map((item, key) => (
            <FavoriteEditorialSectionItem item={item} key={key} />
          ))}
        </div>
      ) : (
        <div className="text-white text-center bg-neutral-500 py-4 rounded-xl ">
          {dictionary['No editorial content available']}
        </div>
      )}
    </div>
  )

  return (
    <main className=" w-full h-full mt-[5rem] md:mt-[6rem] lg:pt-2 bg-primary/80 ">
      <div className=" w-full max-w-screen-xl mx-auto lg:pl-4 ">
        <Breadcrumb homeElement={dictionary['Home']} />
      </div>
      <Container className="pt-2 pb-24">
        <SectionTitle>{dictionary['Favorite editorials']}</SectionTitle>
        {content}
        <Pagination
          pages={pages}
          currentPage={currentPage}
          onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
          onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
        />
      </Container>
    </main>
  )
}

const SkeletonCard = () => {
  return (
    <div className="relative w-full h-[178px]  md:h-[300px] lg:h-[350px] bg-neutral-300 opacity-70 p-1 lg:p-2 rounded-xl animate-pulse">
      <div className=" w-full h-full bg-neutral-700 rounded-[inherit]"></div>
      <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
        <div className=" w-20 h-20 bg-neutral-600 rounded-full"></div>
      </div>
      <p className=" absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-600 h-8 w-5/6 mx-auto"></p>
    </div>
  )
}
