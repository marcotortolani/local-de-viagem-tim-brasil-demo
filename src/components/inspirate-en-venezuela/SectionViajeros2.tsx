'use client'
import React, { useEffect, useState } from 'react'
import { Category } from '@/lib/api/wp/wp-types'
import { getWpCategories } from '@/lib/api/wp/wp-actions'
import { Pagination } from '@/components/pagination/Pagination'
import Default from '/public/images/default.webp'

import { Separator } from '../ui/separator'
import { CATEGORIES } from '@/lib/constants'

import Image from 'next/image'
import Link from 'next/link'

import { FeaturedTravelersCarousel } from './FeaturedTravelersCarousel'

type Props = {
  parentSlug?: string
}

const PER_PAGE = 12

export const SectionViajeros2: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [featuredTravelers, setFeaturedTravelers] = useState<Category[]>([])
  const [viajeros, setViajeros] = useState<Category[]>([])

  useEffect(() => {
    setLoading(true)

    if (!featuredTravelers.length) {
      const getFeaturedTravelers = async () => {
        const { categories } = await getWpCategories({
          parent: CATEGORIES['viajeros'],
          per_page: 100,
        })

        const viajerosFeatured = categories.filter(
          (category: Category) => category?.featured === true,
        )
        setFeaturedTravelers(viajerosFeatured)
      }
      getFeaturedTravelers()
    }

    const getCategories = async () => {
      const { categories, totalPages } = await getWpCategories({
        parent: CATEGORIES['viajeros'],
        per_page: PER_PAGE,
        page: currentPage + 1,
      })
      
      setViajeros(categories)
      setLoading(false)
      setPages(totalPages)
    }
    getCategories()
  }, [currentPage])

  const content = loading ? (
    <div className=" mb-4 lg:mb-6 xl:mb-10 pt-2 ">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-8">
        {new Array(PER_PAGE).fill(0).map((_, key) => (
          <SkeletonTravelerItem key={key} />
        ))}
      </div>
    </div>
  ) : (
    <div className=" mb-4 lg:mb-6 xl:mb-10 pt-2">
      {viajeros?.length ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-8">
          {viajeros.map((item, key) => (
            <TravelerItem category={item} key={key} />
          ))}
        </div>
      ) : (
        <div className="w-4/5 max-w-[300px] mx-auto text-black text-center bg-white py-4 rounded-xl ">
          No tienes contenido disponible
        </div>
      )}
    </div>
  )

  return (
    <section className="z-0 w-full max-w-screen-xl mx-auto px-2 md:px-4 mb-4 lg:mb-8 pb-28 mt-4 ">
      {featuredTravelers.length > 0 && (
        <div className="relative w-full max-w-screen-2xl mx-auto h-full my-8 lg:my-12">
          <FeaturedTravelersCarousel
            items={featuredTravelers}
            pagination={true}
            navigation={false}
          />
        </div>
      )}

      <Separator className=" my-4 xl:mt-6 xl:mb-10 bg-neutral-700/60" />

      {content}

      <Pagination
        pages={pages}
        currentPage={currentPage}
        onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
        onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
      />
    </section>
  )
}

const TravelerItem = ({ category }: { category: Category }) => {
  const name = category?.name?.replaceAll('-', ' ')

  return (
    <Link href={`/inspirate-en-venezuela/viajeros/${category?.slug}`} prefetch>
      <div className="w-full h-full flex flex-col items-center gap-2">
        <div
          className={`relative w-full aspect-square overflow-hidden border-2 xl:border-4 border-solid border-white rounded-full `}
        >
          <Image
            className=" "
            src={(category?.image as string) || Default}
            fill
            priority
            alt={category?.name as string}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="z-20 relative w-5/6 bg-white1 rounded-md">
          <h5 className="  text-white text-lg md:text-xl lg:text-2xl xl:text-3xl text-wrap line-clamp-2 leading-[auto] font-oswald tracking-wide text-center">
            {name}
          </h5>
        </div>
      </div>
    </Link>
  )
}

const SkeletonTravelerItem = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <div
        className={`relative w-full aspect-square overflow-hidden bg-neutral-400/60 border-2 xl:border-4 border-solid border-white rounded-full animate-pulse `}
      ></div>
      <div className="z-20 relative w-5/6 bg-white1 rounded-md">
        <span className=" w-3/5 mx-auto h-10 bg-neutral-300/60 line-clamp-1 animate-pulse rounded-full "></span>
      </div>
    </div>
  )
}
