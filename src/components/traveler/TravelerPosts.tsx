'use client'
import React, { useEffect, useState } from 'react'
import { Category, Post } from '@/lib/api/wp/wp-types'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { Container } from '@/components/Container'
import { TravelerBanner } from '../TravelerBanner'
import { SectionGridPagination } from '../sections/SectionGridPagination'
import Breadcrumb from '../ui/Breadcrumb'

import { htmlToText } from 'html-to-text'

import dictionary from '@/dictionary/lang.json'

type Props = {
  parentSlug: string
  category: Category
  url?: string
}

const PER_PAGE = 12

export const TravelerPosts: React.FC<Props> = ({ parentSlug, category }) => {
  const [posts, setPosts] = useState<Post[]>([])

  const sectionSlug =
    parentSlug === 'travelers' ? 'travelers' : `${parentSlug}/travelers`

  useEffect(() => {
    const getPosts = async () => {
      const data = await getWpPosts({
        categories: category.id?.toString(),
        per_page: PER_PAGE,
      })
      setPosts(data.posts || [])
    }
    getPosts()
  }, [category])

  if (!category) return null

  return (
    <main className="z-0 mt-[5rem] md:mt-[6rem] min-h-screen pb-20 bg-primary/80 ">
      <div className=" absolute top-0 w-full ">
        <div className=" w-full max-w-screen-xl mx-auto px-2 lg:px-4">
          <Breadcrumb homeElement={dictionary['Home']} />
        </div>
      </div>
      <TravelerBanner
        urlTravelerImage={category?.image}
        urlLastPostImage={posts[0]?.featured_image[0]}
        name={htmlToText(category?.name || '')}
      />
      <Container className=" px-0 lg:px-6 xl:px-3 min-h-fit">
        <SectionGridPagination category={category} parentSlug={sectionSlug} />
      </Container>
    </main>
  )
}
