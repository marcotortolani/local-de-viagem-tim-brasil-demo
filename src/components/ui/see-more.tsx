//import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

export default function SeeMore({
  moreLink = '#',
  text = 'Ver más',
  className = '',
}) {
  return (
    <Link
      href={moreLink}
      className={cn(
        `text-black text-xs md:text-[16px] border-b-[1px] border-black/50 font-poppins  font-normal flex items-center justify-between gap-0 `,
        className,
      )}
    >
      {/* <ChevronRight size={14} /> */}
      {text}
    </Link>
  )
}
