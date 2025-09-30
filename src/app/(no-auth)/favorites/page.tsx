'use client'
import { useEffect, useState } from 'react'
import { useFavoriteStore } from '@/lib/modules/favorite/favorite-stores'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { Post } from '@/lib/api/wp/wp-types'
import { FavoriteEditorialSection } from '@/components/favorites/FavoriteEditorialSection'
import { Container } from '@/components/Container'
import { FavoriteVideoSection } from '@/components/favorites/FavoriteVideoSection'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { FavoriteShortSection } from '@/components/favorites/FavoriteShortSection'

import dictionary from '@/dictionary/lang.json'

export default function Page() {
  const { editorial, videos, shorts } = useFavoriteStore()
  const [editorialPosts, setEditorialPosts] = useState<Post[]>([])
  const [videoPosts, setVideoPosts] = useState<Post[]>([])
  const [shortsPosts, setShortsPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (editorial.length || videos.length || shorts.length) {
      const getFavoritePosts = async () => {
        const _editorial = editorial.length
          ? await getWpPosts({ include: editorial.join(',') })
          : { posts: [] }

        const _videos = videos.length
          ? await getWpPosts({ include: videos.join(',') })
          : { posts: [] }

        const _shorts = shorts.length
          ? await getWpPosts({ include: shorts.join(',') })
          : { posts: [] }

        setEditorialPosts(_editorial.posts || [])
        setVideoPosts(_videos.posts || [])
        setShortsPosts(_shorts.posts || [])
        setLoading(false)
      }
      getFavoritePosts()
    } else {
      setLoading(false)
    }
  }, [editorial.length, videos.length, shorts.length])

  if (loading) {
    return <SkeletonComponent />
  }

  return (
    <main className=" relative z-0 w-full h-full mt-[5rem] md:mt-[6rem] lg:pt-2 pb-32 bg-primary/80 ">
      <div className=" w-full max-w-screen-xl mx-auto lg:pl-4 ">
        <Breadcrumb homeElement={dictionary['Home']} />
      </div>
      <Container className="pt-4 pb-4 md:pb-40 space-y-4 md:space-y-10 lg:px-6">
        <FavoriteEditorialSection
          title={dictionary['Favorite editorials']}
          items={editorialPosts}
          color="text-white"
          moreLink="/favorites/editorial"
        />
        <FavoriteVideoSection
          title={dictionary['Favorite videos']}
          items={videoPosts}
          color="text-white"
          moreLink="/favorites/videos"
        />

        <FavoriteShortSection
          title={dictionary['Favorite shorts']}
          items={shortsPosts}
          color="text-white"
          moreLink="/favorites/shorts"
        />
      </Container>
    </main>
  )
}

const SkeletonComponent = () => {
  return (
    <main className=" w-full h-full mt-[5rem] md:mt-[6rem] lg:pt-2 bg-primary/80">
      <div className=" w-full max-w-screen-xl mx-auto lg:pl-4">
        <Breadcrumb homeElement={dictionary['Home']} />
      </div>
      <Container className="pt-4 pb-4 md:pb-40 space-y-4 md:space-y-10 lg:px-6">
        <div className="text-white text-center bg-neutral-500 py-4 rounded-xl animate-pulse">
          {dictionary['No favorites available']}
        </div>
      </Container>
    </main>
  )
}
