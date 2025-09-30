import React from 'react'
import { getWpCategories, getWpPosts, getWpTags } from '@/lib/api/wp/wp-actions'
import { notFound } from 'next/navigation'
import { sanitizeContent } from '@/lib/utils'
import { Container } from '@/components/Container'
import { VideoCarousel } from '@/components/home/VideoCarousel'
import { SharedAndFavoriteEditorialComponent } from '@/components/SharedAndFavoriteEditorialComponent'
import Default from '/public/images/default.webp'
import Image from 'next/image'
import { wpImage } from '@/lib/api/wp/wp-utils'

import dictionary from '@/dictionary/lang.json'

type PageProps = Promise<{ category: string; slug: string }>

export default async function Page({ params }: { params: PageProps }) {
  const { category, slug } = await params
  const data = await getWpPosts({ slug: slug })
  const wpPost = data.posts.length ? data.posts[0] : null

  // const sectionExtra = {
  //   title: 'Recorriendo Venezuela',
  //   id: '24',
  // }

  if (!wpPost) notFound()

  const { categories } = await getWpCategories({ per_page: 100 })
  // const dataVideos = await getWpPosts({
  //   categories: sectionExtra.id.toString(),
  //   exclude: wpPost.id?.toString(),
  // })
  const dataVideos = await getWpPosts({
    categories: categories.map((cat) => cat.id).join(','),
    exclude: wpPost.id?.toString(),
  })

  const videos = dataVideos.posts

  const tags = await getWpTags({ include: wpPost.tags.toString() })

  wpPost.full_categories = categories.filter((category) =>
    wpPost.categories.includes(category.id as number),
  )

  const content = sanitizeContent(wpPost.content?.rendered as string)

  const image = wpImage(wpPost) || Default

  return (
    <div className="mt-[5rem] mb-4">
      <Container>
        <SharedAndFavoriteEditorialComponent item={wpPost} tags={tags} />
        <div className="font-semibold text-white text-xl mb-2">
          {wpPost.title?.rendered}
        </div>
        <div className="flex justify-center mb-4">
          <div className="relative  w-full h-[210px] md:h-[500px] ">
            <Image
              src={image || Default}
              fill
              priority
              alt={wpPost?.title?.rendered as string}
              style={{
                objectFit: 'cover',
              }}
              className="rounded-lg"
            />
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="text-white my-2 font-normal text-sm leading-[1.3rem] md:text-[1rem] md:leading-[1.45rem]"
        ></div>
        <VideoCarousel
          title={dictionary['You may also be interested in']}
          items={videos.slice(0, 10)}
          moreLink={`/${category}`}
        />
      </Container>
    </div>
  )
}
