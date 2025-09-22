'use client'
import React, { useEffect, useState } from 'react'
import { Category, Post } from '@/lib/api/wp/wp-types'
import dynamic from 'next/dynamic'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { Container } from '@/components/Container'
import { Pagination } from '@/components/pagination/Pagination'
import { SectionBanner } from '@/components/SectionBanner'
import { ContentVideoItem } from '@/components/content/ContentVideoItem'

const Loading = dynamic(() => import('@/components/Loading'), {
  ssr: false,
})

type Props = {
  category: Category
  url?: string
}

const PER_PAGE = 12

export const ContentVideoPosts: React.FC<Props> = ({ category, url = '' }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [pages, setPages] = useState<number>(0)
  const [perPage, setPerPage] = useState<number>(PER_PAGE)

  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    const getPosts = async () => {
      const data = await getWpPosts({
        categories: category.id?.toString(),
        per_page: perPage,
        offset: perPage * currentPage,
      })
      setPosts(data.posts || [])
      setLoading(false)
      setPages(data.totalPages)
    }
    getPosts()
  }, [category, currentPage, perPage])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setPerPage(PER_PAGE)
      } else {
        setPerPage(10)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const content = loading ? (
    <Loading />
  ) : (
    <div className=" lg:px-2 xl:px-0 mb-4">
      {posts.length ? (
        <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {posts.slice(0, perPage).map((item, key) => (
            <ContentVideoItem
              item={item}
              key={key}
              url={`${url}/${item.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-black text-center bg-[#666666] py-4 rounded-xl ">
          No tienes contenido disponible
        </div>
      )}
    </div>
  )

  return (
    <div className=" mt-[5rem] mb-16">
      <SectionBanner
        bgImage={category.image}
        title={category.name}
        subtitle={category.description}
      />
      <Container>
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
