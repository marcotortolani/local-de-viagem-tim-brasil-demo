// src/app/shorts/page.tsx

import { getWpPosts, getWpTags } from '@/lib/api/wp/wp-actions'
import { VideoPlayerList } from '@/components/video/VideoPlayerList'
import React from 'react'
import { CATEGORIES } from '@/lib/constants'

export default async function Page() {
  const data = await getWpPosts({
    categories: CATEGORIES['shorts'].toString(),
    per_page: 50,
  })

  const videos = data.posts || []

  const postTags = videos.reduce((acc: number[], video) => {
    if (video.tags.length) return acc.concat(video.tags)
    return acc
  }, [])

  const tags = await getWpTags({ include: postTags.toString(), per_page: 100 })

  return <VideoPlayerList items={videos} tags={tags} />
}
