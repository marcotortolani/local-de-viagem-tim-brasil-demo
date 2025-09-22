'use client'
import React, { useState, useEffect } from 'react'
import { EditorialCarousel } from './EditorialCarousel'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'
import { Banner2 } from '../Banner2'
import { Post } from '@/lib/api/wp/wp-types'

export default function AdditionalSection() {
  const { additionalConfig } = useAdditionalComponentsStore()
  const { additionalSection } = additionalConfig
  const [posts, setPosts] = useState<Post[]>([])
  const [showSection, setShowSection] = useState(false)

  useEffect(() => {
    if (!additionalSection?.show) return
    setShowSection(true)

    getWpPosts({
      categories: '24',
      per_page: 4,
    })
      .then((response) => setPosts(response.posts || []))
      .catch((error) => {
        console.error('Error:', error)
        setPosts([])
      })
  }, [additionalSection?.show])

  if (!showSection) return null

  return (
    <>
      <Banner2
        item={posts[0]}
        flag={additionalSection?.flag}
        title={additionalSection?.title}
      />
      <EditorialCarousel
        title="Más lugares y paisajes"
        items={posts.slice(1, posts.length)}
        moreLink="/recorriendo-venezuela/"
      />
    </>
  )
}
