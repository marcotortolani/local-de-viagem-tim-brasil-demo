'use client'
import { Category } from '@/lib/api/wp/wp-types'
import React from 'react'
import { SectionTitle } from '@/components/text/SectionTitle'
import { TravelerPrincipalItem } from '@/components/traveler/TravelerPrincipalItem'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type RecipesProps = {
  travelers: Category[]
  moreLink?: string;
  title?: string;
}

export const Travelers: React.FC<RecipesProps> = ({ travelers = [], moreLink = '#', title = '' }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <SectionTitle>{title}</SectionTitle>
        <Link
          href={moreLink}
          className="text-primary text-xs md:text-[16px]  font-normal flex items-center"
        >
          Ver más <ChevronRight size={20} className="ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {travelers.map((traveler, key) => (
          <TravelerPrincipalItem item={traveler} key={key} />
        ))}
      </div>
    </div>
  )
}
