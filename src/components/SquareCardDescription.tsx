import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import { htmlToText } from 'html-to-text'
import { getParagraphText } from '@/lib/utils'

export const SquareCardDescription = ({
  item,
  categorySlug,
}: {
  item: Post
  categorySlug: string
}) => {
  const currentDate = new Date()
  const recentPost =
    new Date(item.date as string) >=
    new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) // subido en los ultimos 7 dias

  return (
    <Link href={`/${categorySlug}/${item.slug}`} prefetch>
      <div className=" relative w-full h-auto space-y-2 border-8 lg:border-[10px] bg-white border-white overflow-hidden rounded-2xl ">
        <div className=" relative w-full aspect-video md:aspect-[4/3]">
          <Image
            className=" w-full h-full object-cover object-center rounded-xl"
            src={wpImage(item) || '/images/default.webp'}
            fill
            priority
            alt={item.title?.rendered as string}
          />
          <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
            <span className="w-fit uppercase inline-flex items-center justify-center rounded-full font-semibold text-lg py-0.5 px-6 bg-tertiary text-black hover:bg-tertiary-dark transition-all duration-300 ease-in-out">
              VER
            </span>
          </div>
          <div className=" absolute top-0 left-0 w-full h-full px-2 pb-6 flex items-end justify-start ">
            {recentPost && (
              <div className=" absolute top-4 left-4 w-fit px-2 flex items-center justify-center bg-primary rounded-full">
                <span className=" text-white">Nuevo</span>
              </div>
            )}
            {/* <p className=" relative px-2 font-oswald bg-white text-black text-lg md:text-xl lg:text-2xl font-normal line-clamp-2 text-pretty">
              {htmlToText(item.title?.rendered as string)}
            </p> */}
            <h4
              className={` absolute bottom-3 md:bottom-5 md:left-4 w-5/6 font-oswald text-base md:text-xl lg:text-xl text-black line-clamp-2 font-medium text-start  pointer-events-none select-none`}
            >
              <span className=" px-2 pr-3 bg-white box-decoration-clone leading-[1.2rem] md:leading-[1.9rem] lg:leading-[2.1rem]">
                {htmlToText(item.title?.rendered as string)}
              </span>
            </h4>
          </div>
        </div>
        <p className=" pl-1 font-poppins font-light text-black text-sm md:text-base lg:text-lg line-clamp-4">
          {getParagraphText(item.content?.rendered as string)}
        </p>
      </div>
    </Link>
  )
}
