'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getWpCategories } from '@/lib/api/wp/wp-actions'
import { ContentVideoPosts } from '@/components/content/ContentVideoPosts'
import { notFound } from 'next/navigation'

import { Category } from '@/lib/api/wp/wp-types'
import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'
import Loading from '@/components/Loading'

export default function Page() {
  const { category } = useParams()
  const { additionalConfig } = useAdditionalComponentsStore()
  const { additionalSection } = additionalConfig
  const [cat, setCat] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!additionalSection) return
    if (
      !additionalSection?.show ||
      additionalSection['wp-category-slug'] !== category
    ) {
      return notFound()
    }

    if (!additionalSection['wp-category-id'] && !additionalSection.show) {
      setLoading(false)
      return
    }

    async function getCat() {
      const { categories } = await getWpCategories({
        include: additionalSection['wp-category-id'].toString(),
      })
      return await categories
    }

    getCat().then((cat) => {
      setLoading(false)
      setCat(cat[0])
    })
  }, [additionalSection])

  if (loading) return <Loading />

  if (!cat) return notFound()

  return <ContentVideoPosts category={cat} url={`/${cat?.slug}`} />
}
