'use client'
import { InstagramIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import dictionary from '@/dictionary/lang.json'

export const Footer = () => {
  const SOCIAL_ROUTES = [
    {
      Icon: InstagramIcon,
      title: 'Instagram',
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
    <div className="relative h-fit md:min-h-[150px]  lg:min-h-[200px] flex-col bg-primary-dark mb-14 lg:mb-0 px-4 lg:py-4 pb-4 xl:py-2 justify-center items-center hidden md:flex ">
      <div className="container mx-auto px-3 lg:px-8 xl:max-w-screen-xl flex justify-center items-center  lg:my-10 ">
        <div className="relative w-full h-full flex flex-col items-center space-y-4 lg:space-y-8 ">
          <div className="relative w-full h-full md:h-[60px] lg:h-[80px] flex items-center justify-between ">
            <div className="relative mr-4 h-full ">
              <Image
                className="relative h-full w-auto "
                src="/images/logo-product-white.webp"
                alt={`Logo ${dictionary['site']}`}
                width={184}
                height={56}
              />
            </div>
            <div className="relative h-full">
              <Image
                className="h-full w-auto"
                src={'/images/logo-mediamoob.webp'}
                alt="logo-moob"
                width={184}
                height={56}
              />
            </div>
          </div>
          <div className="flex items-center gap-8 ">
            {ROUTES.map(({ title, path }) => (
              <Link
                href={path}
                className="text-[16px] text-white mr-auto text-nowrap"
                key={title}
              >
                {title}
              </Link>
            ))}
            <div className="flex justify-start">
              <div className="text-white text-[16px] mr-2">{dictionary['Follow us']}:</div>
              {SOCIAL_ROUTES.map(({ Icon, href }, key) => (
                <Link
                  href={href}
                  target="_blank"
                  className=" flex items-center text-[16px]"
                  key={key}
                >
                  <Icon color="white" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
