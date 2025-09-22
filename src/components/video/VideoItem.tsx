'use client'
import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Post } from '@/lib/api/wp/wp-types'
import Image from 'next/image'
import Default from '/public/images/default.webp'
import { wpImage } from '@/lib/api/wp/wp-utils'
import { Play } from 'lucide-react'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

type VideoItemProps = {
  item: Post
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

export const VideoItem: React.FC<VideoItemProps> = ({
  item,
  autoPlay = false,
  loop = false,
  muted = false,
}) => {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(autoPlay)
  const image = wpImage(item) || Default

  if (!item.video.url)
    return (
      <div className="relative  w-full h-[210px] md:h-[500px] ">
        <Image
          src={image || Default}
          fill
          priority
          alt={item?.title?.rendered as string}
          style={{
            objectFit: 'cover',
          }}
          className="rounded-lg"
        />
      </div>
    )
  return (
    <div
      className="relative bg-neutral-700 w-full aspect-video overflow-hidden flex items-center justify-center border-2 lg:border-4 border-white rounded-2xl "
      onClick={() => setPlaying(!playing)}
    >
      <ReactPlayer
        ref={ref}
        url={item.video.url}
        // src={item.video.url}
        width="100%"
        height="102%"
        className=" w-full h-full "
        controls
        playing={playing}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        onPause={() => setPlaying(!playing)}
        config={{
          vimeo: {
            playerOptions: {
              iframeParams: { fullscreen: 0 },
            },
          },
        }}
      />
      {!playing && (
        <div className="absolute w-full h-full flex justify-center items-center z-50 pointer-events-auto">
          <div className=" relative w-14 h-14 md:w-20 md:h-20 lg:w-22 lg:h-22 p-2 md:p-3 lg:p-4 bg-black/40 rounded-full flex items-center justify-center">
            <Play className="w-full h-full ml-1 text-transparent fill-white" />
          </div>
        </div>
      )}
    </div>
  )
}
