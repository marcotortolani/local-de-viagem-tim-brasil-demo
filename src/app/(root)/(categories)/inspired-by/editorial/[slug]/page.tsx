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
import { CATEGORIES, REGION_TAGS } from '@/lib/constants'
import Breadcrumb from '@/components/ui/Breadcrumb'

import dictionary from '@/dictionary/lang.json'

type PageProps = Promise<{ slug: string }>

export default async function Page({ params }: { params: PageProps }) {
  const { slug } = await params
  const data = await getWpPosts({ slug: slug })
  const wpPost = data.posts.length ? data.posts[0] : null

  if (!wpPost) notFound()

  const { categories } = await getWpCategories({ per_page: 100 })

  const { posts: postsInterest } = await getWpPosts({
    categories: CATEGORIES['around-the-world'].toString(),
    exclude: wpPost.id?.toString(),
  })

  const tags = await getWpTags({ include: wpPost.tags.toString() })
  const regionTag = REGION_TAGS.find((tag) => wpPost.tags?.includes(tag.id))

  wpPost.full_categories = categories.filter((category) =>
    wpPost.categories.includes(category.id as number),
  )

  const content = sanitizeContent(wpPost.content?.rendered as string)

  const image = wpImage(wpPost) || Default

  return (
    <main className="mt-[5rem] md:mt-[6rem] min-h-screen pb-0 bg-primary/80">
      <div className=" w-full max-w-screen-xl mx-auto ">
        <Breadcrumb homeElement={dictionary['Home']} />
      </div>

      <Container className=" mt-4">
        <div className="flex justify-center mb-4">
          <div className="relative  w-full aspect-[4/3] overflow-hidden border-8 border-white rounded-xl ">
            {regionTag && (
              <span
                className=" z-10 absolute top-2 left-2 px-2 py-0.5 font-oswald italic lg:text-lg lowercase border border-white rounded-full"
                style={{ backgroundColor: regionTag.color }}
              >
                #{regionTag?.slug}
              </span>
            )}
            <div className=" z-20 absolute top-2 right-2 bg-white px-2 py-1 rounded-full">
              <SharedAndFavoriteEditorialComponent item={wpPost} tags={tags} />
            </div>
            <Image
              className=""
              src={image || Default}
              fill
              priority
              alt={wpPost?.title?.rendered as string}
              style={{
                objectFit: 'cover',
              }}
            />
            <div className=" absolute top-0 left-0 w-full h-full px-2 flex items-end justify-center line-clamp-2 ">
              <div className=" font-semibold text-black text-xl mb-2">
                <span className=" font-semibold text-black text-xl bg-white px-2">
                  {wpPost.title?.rendered}
                </span>
              </div>
            </div>
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
          moreLink={`/around-the-world`}
        />
      </Container>
    </main>
  )
}
