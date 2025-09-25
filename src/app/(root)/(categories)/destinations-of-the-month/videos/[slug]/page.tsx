import React from 'react'
import { getWpCategories, getWpPosts, getWpTags } from '@/lib/api/wp/wp-actions'
import { notFound } from 'next/navigation'
import { sanitizeContent } from '@/lib/utils'
import { Container } from '@/components/Container'
import { VideoCarousel } from '@/components/home/VideoCarousel'
import { CATEGORIES, REGION_TAGS } from '@/lib/constants'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { VideoItem } from '@/components/video/VideoItem'
import { SharedAndFavoriteVideoComponent } from '@/components/SharedAndFavoriteVideoComponent'

type PageProps = Promise<{ slug: string }>

export default async function Page({ params }: { params: PageProps }) {
  const { slug } = await params
  const data = await getWpPosts({ slug: slug })
  const wpPost = data.posts.length ? data.posts[0] : null
  const { categories } = await getWpCategories({ per_page: 100 })

  if (!wpPost || !categories) notFound()

  const { posts: postsInterest } = await getWpPosts({
    categories: CATEGORIES['sabores-del-mundo'].toString(),
    exclude: wpPost.id?.toString(),
  })

  const tags = await getWpTags({ include: wpPost.tags.toString() })
  const regionTag = REGION_TAGS.find((tag) => wpPost.tags?.includes(tag.id))

  wpPost.full_categories = categories.filter((category) =>
    wpPost.categories.includes(category.id as number),
  )

  const content = sanitizeContent(wpPost.content?.rendered as string)

  return (
    <main className="mt-[5rem] md:mt-[6rem] pb-16 bg-primary/80">
      <div className=" w-full max-w-screen-xl mx-auto ">
        <Breadcrumb homeElement="Inicio" />
      </div>

      <div className="relative w-full max-w-screen-xl px-2 mx-auto flex justify-center my-4 ">
        {regionTag && (
          <span
            className=" z-10 absolute top-2 lg:top-4 left-4 lg:left-6 px-2 py-0.5 font-oswald italic text-sm lg:text-lg lowercase border border-white rounded-full"
            style={{ backgroundColor: regionTag.color }}
          >
            #{regionTag?.slug}
          </span>
        )}
        <VideoItem item={wpPost} />
      </div>
      <Container className=" min-h-fit mt-4 ">
        <div className="flex justify-between mb-4">
          <div className=" w-4/5 font-semibold text-black text-xl mb-2">
            <span className=" font-semibold text-black text-xl bg-white px-2">
              {wpPost.title?.rendered}
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
          title="También te puede interesar"
          items={postsInterest}
          moreLink={`/culture-and-flavor`}
        />
      </Container>
    </main>
  )
}
