'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { useFavoriteStore } from '@/lib/modules/favorite/favorite-stores'
import { Post } from '@/lib/api/wp/wp-types'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/text/SectionTitle'
import { ShortPosterItem } from '@/components/short/ShortPosterItem'
import { Pagination } from '@/components/pagination/Pagination'

import dictionary from '@/dictionary/lang.json'

const Loading = dynamic(() => import('@/components/Loading'), {
  ssr: false,
})

const PER_PAGE = 12

export default function Page() {
  const { shorts } = useFavoriteStore()
  const [shortPosts, setShortPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  useEffect(() => {
    if (shorts.length) {
      const getFavoritePosts = async () => {
        const data = await getWpPosts({
          include: shorts.join(','),
          per_page: PER_PAGE,
          offset: currentPage * PER_PAGE,
        })

        setShortPosts(data.posts)
        setPages(data.totalPages)
        setLoading(false)
      }
      getFavoritePosts()
    } else {
      setLoading(false)
    }
  }, [shorts.length, currentPage])

  const content = loading ? (
    <Loading />
  ) : (
    <div className=" mt-4 mb-8">
      {shortPosts.length ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {shortPosts.map((item, key) => (
            <ShortPosterItem item={item} key={key} />
          ))}
        </div>
      ) : (
        <div className="text-black text-center bg-[#666666] py-4 rounded-xl ">
          {dictionary['No shorts available']}
        </div>
      )}
    </div>
  )

  return (
    <Container className="pt-24 pb-24">
      <SectionTitle>{dictionary['Favorite shorts']}</SectionTitle>
      {content}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
        onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
      />
    </Container>
  )
}
