'use client'
import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  className?: string
}

export const LogoWhite: React.FC<LogoProps> = ({
  className = 'h-16 w-[200px]',
}) => {
  return (
    <div className="flex items-center py-2 ">
      <Link href="/" prefetch>
        <div className={`relative  ${className}`}>
          <Image
            src="/images/logo-product-white.webp"
            alt="White logo brand"
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
