'use client'
import React, { useEffect, useState } from 'react'
import { Category, Post } from '@/lib/api/wp/wp-types'
import { Container } from '@/components/Container'
import { Tabs } from '@/components/ui/tab/Tabs'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { EditorialItem } from '@/components/content/EditorialItem'
import dynamic from 'next/dynamic'
import { Pagination } from '@/components/pagination/Pagination'

const Loading = dynamic(() => import('@/components/Loading'), {
  ssr: false,
})

type Props = {
  categories: Category[]
}

export const SectionTabs: React.FC<Props> = ({ categories }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [tabSelected, setTabSelected] = useState<string>('')

  const onChangeTab = (value: string) => {
    setTabSelected(value)
  }

  const fetchPosts = async () => {
    if (!categories.length) return null

    const data = await getWpPosts({
      categories: tabSelected ? tabSelected : categories[0].id?.toString(),
      per_page: 12,
      offset: 12 * currentPage,
    })

    setPosts(data.posts || [])
    setLoading(false)
    setPages(data.totalPages)
  }

  useEffect(() => {
    fetchPosts()
  }, [categories.length, currentPage])

  useEffect(() => {
    setCurrentPage(0)
    fetchPosts()
  }, [tabSelected])

  const OPTIONS = categories.map((category) => ({
    value: category.id?.toString() as string,
    label: category.name as string,
  }))

  return (
    <Container>
      <Tabs options={OPTIONS} onChange={onChangeTab} />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 lg:px-2 mb-2">
          {posts.map((item, key) => (
            <EditorialItem
              item={item}
              key={key}
              url={`/cultura-y-paladar/${item.slug}`}
            />
          ))}
        </div>
      )}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
        onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
      />
    </Container>
  )
}
