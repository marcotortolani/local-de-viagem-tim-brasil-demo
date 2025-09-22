'use client'
import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  className?: string
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-16 w-[150px] lg:w-[200px] ',
}) => {
  return (
    <div className="flex items-center py-2 ">
      <Link href="/" prefetch>
        <div className={`relative  ${className}`}>
          <Image
            src="/images/logo.webp"
            alt="logo Que Guay"
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
