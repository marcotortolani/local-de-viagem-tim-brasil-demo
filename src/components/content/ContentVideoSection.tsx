'use client'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { ContentVideoItem } from '@/components/content/ContentVideoItem'
import { Post } from '@/lib/api/wp/wp-types'
import { SectionTitle } from '@/components/text/SectionTitle'

type ContentVideoSectionProps = {
  title?: string
  moreLink?: string
  items: Post[]
}

export const ContentVideoSection: React.FC<ContentVideoSectionProps> = ({
  title,
  moreLink = '#',
  items = [],
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <SectionTitle>{title}</SectionTitle>
        <Link
          href={moreLink}
          className="text-white text-xs md:text-[16px]  font-normal flex items-center"
        >
          Ver más <ChevronRight size={20} className="ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, key) => (
          <ContentVideoItem item={item} key={key} />
        ))}
      </div>
    </div>
  )
}
