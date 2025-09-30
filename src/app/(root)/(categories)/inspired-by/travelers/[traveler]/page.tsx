import React from 'react'
import { getWpCategories } from '@/lib/api/wp/wp-actions'
import { notFound } from 'next/navigation'
import { TravelerPosts } from '@/components/traveler/TravelerPosts'

type PageProps = Promise<{ traveler: string }>

export default async function Page({ params }: { params: PageProps }) {
  const { traveler } = await params
  const {
    categories: [category],
  } = await getWpCategories({
    slug: traveler,
  })

  if (!category) notFound()

  return <TravelerPosts category={category} />
}
