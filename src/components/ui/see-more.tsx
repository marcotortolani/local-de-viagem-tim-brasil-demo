import Link from 'next/link'
import { cn } from '@/lib/utils'

import dictionary from '@/dictionary/lang.json'

export default function SeeMore({
  moreLink = '#',
  text = dictionary['See more'],
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
      {text}
    </Link>
  )
}
