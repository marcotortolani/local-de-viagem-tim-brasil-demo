'use client'
import Image from 'next/image'

export const LogoMoob = () => {
  return (
    <div className="flex items-center py-2">
      <div className="relative h-8 w-full">
        <Image
          src="/logo-media-moob.svg"
          alt="Logo Moob"
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}
