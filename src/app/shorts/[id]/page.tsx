import { getWpPosts, getWpTags } from '@/lib/api/wp/wp-actions'
import { VideoPlayerList } from '@/components/video/VideoPlayerList'
import React from 'react'
import { CATEGORIES } from "@/lib/constants"

type PageProps = Promise<{ id: string }>

export default async function Page({ params }: { params: PageProps }) {
  const { id } = await params

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
  const index = videos.findIndex((item) => item.slug === id)
  return <VideoPlayerList items={videos} defaultIndex={index} tags={tags} />
  // return <VideoPlayerList items={videos} totalPages={data.totalPages || 0} defaultIndex={index} tags={tags} />
}
