'use client'
import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
// import SeeMore from './ui/see-more'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

// Define the possible positions for the video
type VideoPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

// Props for the GridComponent
interface GridProps {
  items: {
    video: string
    videoFrame: string
    imageH: string
    imageV: string
  }
  videoPosition: VideoPosition
  moreLink?: string
  extraItems?: {
    imageH: string
    imageSquare: string
  }
  colorLines?: string
  colorOutline?: string
  colorBorder?: string
  children?: React.ReactNode
}

export const BannerGridVideo: React.FC<GridProps> = ({
  items,
  videoPosition,
  // moreLink = '#',
  extraItems,
  colorLines = '',
  colorOutline = '',
  colorBorder = '',
  children,
}) => {
  const playerRef = useRef(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Define grid positions based on videoPosition prop
  const getGridStyles = (position: VideoPosition) => {
    let videoGridArea = ''
    let image1GridArea = ''
    let image2GridArea = ''

    switch (position) {
      // fila-inicio / columna-inicio / fila-fin / columna-fin
      case 'top-left':
        videoGridArea = '1 / 1 / 3 / 3' // Top-left 2x2
        image1GridArea = '3 / 1 / 4 / 3' // 2x1 next to video
        image2GridArea = '1 / 3 / 4 / 4' // 1x3 below image1
        break
      case 'top-right':
        videoGridArea = '1 / 2 / 3 / 4' // Top-right 2x2
        image1GridArea = '3 / 2 / 4 / 4' // 2x1 below video
        image2GridArea = '1 / 1 / 4 / 2' // 1x3 on the left
        break
      case 'bottom-left':
        videoGridArea = '2 / 1 / 4 / 3' // Bottom-left 2x2
        image1GridArea = '1 / 1 / 2 / 3' // 2x1 above video
        image2GridArea = '1 / 3 / 4 / 4' // 1x3 on the right
        break
      case 'bottom-right':
        videoGridArea = '2 / 2 / 4 / 4' // Bottom-right 2x2
        image1GridArea = '1 / 2 / 2 / 4' // 2x1 above video
        image2GridArea = '1 / 1 / 4 / 2' // 1x3 on the left
        break
      default:
        videoGridArea = '1 / 1 / 3 / 3' // Default to top-left
        image1GridArea = '3 / 1 / 4 / 3'
        image2GridArea = '1 / 3 / 4 / 4'
    }

    return { videoGridArea, image1GridArea, image2GridArea }
  }

  const { videoGridArea, image1GridArea, image2GridArea } =
    getGridStyles(videoPosition)

  if (!items.video) return <div></div>

  return (
    <div
      className={cn(
        `${extraItems ? ' grid-rows-4 ' : ' aspect-square lg:aspect-video grid-rows-3 '} w-full h-full px-0 grid grid-cols-3  gap-0.5 md:gap-1 xl:gap-1 bg-primary`,
        colorLines,
      )}
    >
      {/* Video: 2x2 */}
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="relative flex items-center justify-center text-white overflow-hidden"
        style={{ gridArea: videoGridArea }}
      >
        {/* Imagen de vista previa mientras el video carga o si hay error */}
        {items.videoFrame && (!isVideoReady || hasError) && (
          <Image
            className="w-full h-full object-cover transition-opacity duration-300"
            src={items.videoFrame}
            alt="Vista previa del video"
            fill
            priority
          />
        )}
        {/* Video Mobile */}
        <div
          className={`lg:hidden w-full h-full aspect-square lg:aspect-video transition-opacity duration-300 ${
            isVideoReady && !hasError ? 'opacity-100' : 'opacity-0 scale-0'
          } overflow-hidden2 pr-1 md:pr-1.5`}
        >
          <ReactPlayer
            ref={playerRef}
            url={items.video}
            width="180%"
            height="100%"
            className=" aspect-square"
            playing={true}
            muted
            loop
            playsinline
            controls={false}
            onReady={() => setIsVideoReady(true)}
            onError={() => setHasError(true)}
          />
        </div>
        {/* Video Desktop */}
        <div
          className={`hidden lg:flex w-full h-full aspect-square lg:aspect-video transition-opacity duration-300 ${
            isVideoReady && !hasError ? 'opacity-100' : 'opacity-0 scale-0'
          } `}
        >
          <ReactPlayer
            ref={playerRef}
            url={items.video}
            width="100%"
            height="100%"
            playing={true}
            muted
            loop
            playsinline
            controls={false}
            onReady={() => setIsVideoReady(true)}
            onError={() => setHasError(true)}
          />
        </div>
        {children}
        {/* <div className=" absolute bottom-0 right-4 ">
            <SeeMore
              moreLink={moreLink}
              text="Ver más"
              className=" lg:text-lg 2xl:text-xl"
            />
          </div> */}
      </motion.div>

      {/* Image 1: 2x1 - Horizontal*/}
      <motion.div
        // initial={{
        //   opacity: 0,
        //   scale: 0,
        //   transformOrigin: 'center',
        //   x: '100%',
        //   y: '-100%',
        // }}
        initial={{
          opacity: 1,
          scale: 1,
          transformOrigin: 'center',
          x: 0,
          y: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transformOrigin: 'center',
          x: 0,
          y: 0,
        }}
        exit={{ opacity: 0, scale: 0 }}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ gridArea: image1GridArea }}
      >
        {items.imageH ? (
          <Image
            className=" w-full h-full object-cover"
            src={items.imageH}
            alt="Horizontal Image"
            fill
          />
        ) : (
          <div className=" w-full h-full bg-gradient-to-b from-neutral-600 to-neutral-800 animate-pulse flex items-center justify-center"></div>
        )}
        <div className="z-20 absolute top-0 w-full h-full">
          <div
            className={cn(
              ' w-1/2 h-full border-primary border-r-2 md:border-r-4 ',
              colorBorder,
            )}
          ></div>
        </div>
      </motion.div>

      {/* Image 2: 1x3 - Vertical */}
      <motion.div
        // initial={{
        //   opacity: 0,
        //   scale: 0,
        //   transformOrigin: 'center',
        //   x: '-100%',
        //   y: '100%',
        // }}
        initial={{
          opacity: 1,
          scale: 1,
          transformOrigin: 'center',
          x: 0,
          y: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transformOrigin: 'center',
          x: 0,
          y: 0,
        }}
        exit={{ opacity: 0, scale: 0 }}
        className=" relative flex items-center justify-center overflow-hidden"
        style={{ gridArea: image2GridArea }}
      >
        {items.imageV ? (
          <Image
            className=" w-full h-full object-cover"
            src={items.imageV}
            alt="Vertical Image"
            fill
          />
        ) : (
          <div className=" w-full h-full bg-gradient-to-r from-neutral-600 to-neutral-800 animate-pulse flex items-center justify-center"></div>
        )}
        <div className="z-20 absolute top-0 w-full h-full flex flex-col items-center justify-center">
          <div
            className={cn(
              ' w-full h-1/3 outline-primary outline outline-2 md:outline-4   ',
              colorOutline,
            )}
          ></div>
        </div>
      </motion.div>

      {extraItems && (
        <motion.div
          // initial={{
          //   opacity: 0,
          //   scale: 0,
          //   y: '200%',
          // }}
          initial={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0 }}
          className=" col-span-2 w-full h-full relative bg-neutral-600/0 flex items-center justify-center overflow-hidden"
        >
          {extraItems.imageH ? (
            <Image
              className=" w-full h-full object-cover"
              src={extraItems.imageH}
              alt="Horizontal Image"
              fill
            />
          ) : (
            <div className=" w-full h-full bg-neutral-700 flex items-center justify-center"></div>
          )}
          <div className="z-20 absolute top-0 w-full h-full">
            <div className=" w-1/2 h-full border-primary border-r-2 outline outline-2 outline-primary md:border-r-4 md:outline-primary md:outline md:outline-4 lg:border-r-[10px]"></div>
          </div>
        </motion.div>
      )}
      {extraItems && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            y: '200%',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0 }}
          className=" col-span-1 w-full h-full relative bg-neutral-600/0 flex items-center justify-center overflow-hidden"
        >
          {extraItems.imageSquare ? (
            <Image
              className=" w-full h-full object-cover"
              src={extraItems.imageSquare}
              alt="Horizontal Image"
              fill
            />
          ) : (
            <div className=" w-full h-full bg-neutral-600 flex items-center justify-center"></div>
          )}
        </motion.div>
      )}
    </div>
  )
}
