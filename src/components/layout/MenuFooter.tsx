'use client'
import Link from 'next/link'
import Image from 'next/image'
import { InstagramIcon } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

export const MenuFooter = () => {
  const SOCIAL_ROUTES = [
    {
      Icon: InstagramIcon,
      title: dictionary['Follow us on Instagram'],
      href: '/',
    },
  ]

  const ROUTES = [
    {
      title: dictionary['Terms and Conditions'],
      path: '/terms',
    },
    {
      title: dictionary['Subscribe'],
      path: '/subscribe',
    },
  ]

  return (
    <div className="mt-6 mb-8 flex flex-col">
      <div className="flex border-b border-b-white pb-2">
        <div className="text-white text-base font-light mr-2">
          {dictionary['Follow us']}:
        </div>
        {SOCIAL_ROUTES.map(({ Icon, href }, key) => (
          <Link
            href={href}
            target="_blank"
            className="mr-2 flex items-center"
            key={key}
          >
            <Icon color="white" className="mr-2" strokeWidth={1.5} />
          </Link>
        ))}
      </div>
      <div className="w-full my-4">
        <Image
          src={'/images/logo-mediamoob.webp'}
          alt="logo-moob"
          width={184}
          height={56}
          className="mb-1 w-2/4 max-w-[184px] h-auto"
        />
        <div className="text-xs text-white font-light tracking-widest">
          {dictionary['This is a Media Moob site']}
        </div>
      </div>
      <div className="flex justify-between">
        {ROUTES.map(({ title, path }) => (
          <Link
            href={path}
            className="mr-2 text-xs text-white font-light tracking-wider underline"
            key={title}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  )
}
