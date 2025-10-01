'use client'
import Image from 'next/image'
import Link from 'next/link'

import dictionary from '@/dictionary/lang.json'

type LogoProps = {
  className?: string
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-16 w-[150px] 2xl:w-[200px] ',
}) => {
  return (
    <div className="flex items-center py-2 ">
      <Link href="/" prefetch>
        <div className={`relative  ${className}`}>
          <Image
            src="/images/logo-product.webp"
            alt={`Logo ${dictionary['siteName']}`}
            className="w-full h-full"
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </Link>
    </div>
  )
}
