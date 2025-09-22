import { Post } from '@/lib/api/wp/wp-types'
import Image from 'next/image'
import { SliderBigNavigation } from '../SliderBigNavigation'
import { HorizontalCard } from '../HorizontalCard'

export default function SectionRecorriendoElMundo({
  items,
}: {
  items: Post[]
}) {
  return (
    <section className="relative w-full pt-14 pb-20 md:pb-20 lg:pb-28 ">
      {/* Background */}
      <div className=" absolute top-0 left-0 w-full h-full grid grid-cols-1 grid-rows-3 bg-tertiary">
        {new Array(3).fill(0).map((_, index) => (
          <Image
            className="relative row-span-1 w-full h-full object-cover object-center opacity-40 "
            src="/images/vector-desierto.webp"
            alt="Image Vector Desierto"
            width={1400}
            height={400}
            key={index}
          />
        ))}
      </div>

      <div className=" w-full max-w-[1400px] mx-auto flex flex-col items-center gap-4 lg:gap-8">
        <SliderBigNavigation posts={items.slice(0, 3)} />

        <div className="w-full px-6 max-w-[1300px] grid grid-[rows-auto] grid-cols-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 xl:gap-10 ">
          {items.slice(3, 6).map((item, index) => (
            <HorizontalCard
              key={index}
              item={item}
              index={index}
              categorySlug="por-el-mundo/recorriendo-el-mundo"
              isVideo={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
