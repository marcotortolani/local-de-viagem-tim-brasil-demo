// src/components/video/ShortVideoItem.tsx (CON CONTROL DE SONIDO)

'use client'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Post, Tag } from '@/lib/api/wp/wp-types'
import { SharedAndFavoriteShortComponent } from '@/components/SharedAndFavoriteShortComponent'
import { PlayIcon } from '@/components/video/PlayIcon'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

type ShortVideoItemProps = {
  item: Post
  tags: Tag[]
  isActive: boolean
  shouldPreload: boolean
}

// Componente para el icono de sonido
const SoundIcon: React.FC<{ isMuted: boolean; className?: string }> = ({
  isMuted,
  className = 'w-6 h-6',
}) => {
  if (isMuted) {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.54-.77 2.2-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.34-1.71-.71z" />
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
      </svg>
    )
  }

  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
    </svg>
  )
}

export const ShortVideoItem: React.FC<ShortVideoItemProps> = ({
  item,
  tags,
  isActive,
  shouldPreload,
}) => {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Inicia muteado para permitir autoplay

  // NUEVA LÓGICA: Solo cargar video si es el activo o adyacente
  //   const isActive = item.id === currentItem.id
  //  const shouldLoadVideo = isActive // Puedes agregar lógica para precargar ±1

  // Función para toggle del sonido
  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation() // Evitar que se active el play/pause
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (!isActive) {
      setPlaying(false)
      setIsMuted(true)
    } else {
      setPlaying(true)
    }
  }, [isActive])

  if (!item.video.url) return <div></div>
  return (
    <div className="h-full relative w-full md:w-auto aspect-[9/16] mx-auto  ">
      {/* CAMBIO CLAVE: Solo renderizar ReactPlayer cuando shouldPreload sea true */}
      {shouldPreload ? (
        <ReactPlayer
          ref={ref}
          url={item.video.url}
          width="100%"
          height="100%"
          playing={playing}
          controls={false}
          muted={isMuted}
          loop
          config={{
            file: {
              attributes: {
                // NUEVO: Control granular del preload
                preload: isActive ? 'auto' : 'metadata', // Solo descarga completa si está activo
              },
            },
          }}
        />
      ) : (
        // NUEVO: Placeholder para videos no cargados
        <div className="w-full h-full bg-gray-900/50 flex items-center justify-center">
          {/* Opcional: mostrar thumbnail del video si está disponible */}
          <div className="text-white/50">
            <PlayIcon />
          </div>
        </div>
      )}

      <div className="absolute z-50 bottom-0 py-4 md:h-20 px-3 w-full  bg-black/20 md:rounded-b-lg flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="font-semibold text-white text-xl w-[80%]">
            {(item.title?.rendered as string).replace(/&#8217;/g, "'")}
          </div>
          <SharedAndFavoriteShortComponent item={item} tags={tags} />
        </div>
      </div>
      <div
        className="absolute z-30 w-full h-[100dvh] md:h-full top-0 flex flex-col items-center justify-center "
        onClick={() => playing && setPlaying(!playing)}
      >
        <div onClick={() => setPlaying(!playing)}>
          {!playing ? <PlayIcon /> : null}
        </div>
        {/* Botón de sonido */}
        <div className="absolute top-5 right-5 z-50">
          <button
            onClick={handleSoundToggle}
            className={`
              p-2 rounded-full transition-all duration-200 
              ${
                isMuted
                  ? 'bg-black/50 text-white/70 hover:bg-black/70 hover:text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }
              backdrop-blur-sm border border-white/20
              active:scale-95 transform
            `}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            <SoundIcon
              isMuted={isMuted}
              className={` w-4 h-4 md:w-5 md:h-5 `}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
