import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/api/wp/wp-types'
import { wpImage } from '@/lib/api/wp/wp-utils'
import Default from '/public/images/default.webp'
import { PlayIcon } from './PlayIcon'

type VideoPosterItemProps = {
  item: Post
  url?: string
  isVideo?: boolean
}

export const VideoPosterItem: React.FC<VideoPosterItemProps> = ({
  item,
  url = '',
  isVideo = false,
}) => {
  const image = wpImage(item) || Default
  return (
    <Link href={url} prefetch>
      <div
        className={`relative aspect-[3/4] w-full flex items-center justify-center border-white border-8 rounded-xl overflow-hidden`}
      >
        <Image
          className=""
          src={image}
          fill
          alt={item.title?.rendered as string}
          style={{
            objectFit: 'cover',
          }}
        />
        <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
          {isVideo && <PlayIcon />}
        </div>
        <div className=" absolute bottom-4 left-0 w-full px-2 line-clamp-2 ">
          <span className="px-2 bg-white text-black text-sm md:text-base lg:text-lg text-left font-normal">
            {item?.title?.rendered.replace('&#038;', '&')}
          </span>
        </div>
      </div>
    </Link>
  )
}
