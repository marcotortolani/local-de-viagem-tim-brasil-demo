import React from 'react'
import { getWpCategories, getWpPosts, getWpTags } from '@/lib/api/wp/wp-actions'
import { notFound } from 'next/navigation'
import { sanitizeContent } from '@/lib/utils'
import { Container } from '@/components/Container'
import { VideoCarousel } from '@/components/home/VideoCarousel'
import { SharedAndFavoriteVideoComponent } from '@/components/SharedAndFavoriteVideoComponent'

import { CATEGORIES } from '@/lib/constants'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { VideoItem } from '@/components/video/VideoItem'
import { htmlToText } from 'html-to-text'

import dictionary from '@/dictionary/lang.json'

type PageProps = Promise<{ slug: string }>

export default async function Page({ params }: { params: PageProps }) {
  const { slug } = await params
  const data = await getWpPosts({ slug: slug })
  const wpPost = data.posts.length ? data.posts[0] : null

  if (!wpPost) notFound()

  const { categories } = await getWpCategories({ per_page: 100 })
  const { posts: postsInterest } = await getWpPosts({
    categories: CATEGORIES['flavors-of-the-world'].toString(),
    exclude: wpPost.id?.toString(),
  })

  const tags = await getWpTags({ include: wpPost.tags.toString() })

  wpPost.full_categories = categories.filter((category) =>
    wpPost.categories.includes(category.id as number),
  )

  const content = sanitizeContent(wpPost.content?.rendered as string)

  return (
    <main className="mt-[5rem] md:mt-[6rem] lg:pt-1 pb-14 bg-primary/80">
      <div className=" w-full max-w-screen-xl mx-auto my-2">
        <Breadcrumb homeElement={dictionary['Home']} />
      </div>

      <div className="w-full max-w-screen-xl px-2 mx-auto flex justify-center mb-4 ">
        <VideoItem item={wpPost} />
      </div>
      <Container className=" min-h-fit mt-4 ">
        <div className="flex justify-between mb-4">
          <div className=" w-4/5 font-semibold text-black text-xl mb-2">
            <span className=" font-semibold text-black text-xl bg-white px-2">
              {htmlToText(wpPost.title?.rendered as string)}
            </span>
          </div>
          <div className=" w-1/5 max-w-fit h-fit bg-white px-2 py-1 rounded-full">
            <SharedAndFavoriteVideoComponent item={wpPost} tags={tags} />
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="p-2 lg:p-4 xl:p-8 bg-white text-black my-2 font-poppins font-normal md:text-lg  rounded-lg"
        ></div>

        <div className=" w-full h-0.5 mt-10 bg-black "></div>
        <VideoCarousel
          title={dictionary['You may also be interested in']}
          items={postsInterest}
          moreLink={`/culture-and-flavor/editorial`}
        />
      </Container>
    </main>
  )
}
