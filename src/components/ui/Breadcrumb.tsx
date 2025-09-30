'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, HomeIcon } from 'lucide-react'

import dictionary from '@/dictionary/lang.json'

export default function Breadcrumb({ homeElement }: { homeElement: string }) {
  const paths = usePathname()
  const pathNames = paths
    .split('/')
    .map((path) => (path === '' ? homeElement : path))
    .filter((path) => !/^\d+$/.test(path))
  const activePath = pathNames[pathNames.length - 1]

  if (pathNames.includes('checklist')) {
    if (pathNames[pathNames.length - 2] === 'checklist') {
      pathNames.pop()
    }
  }

  return (
    <div
      className={
        ' z-30 relative w-full max-w-screen-2xl mx-auto h-10 overflow-hidden flex  bg-primary-dark md:bg-transparent '
      }
    >
      <ul className=" w-full h-full px-2 bg-slate-300/50 flex flex-wrap md:bg-slate-300/0">
        {pathNames?.slice(0, 3).map((el, i) => (
          <li key={i} className=" my-1 flex items-center">
            <Link
              className={`${activePath === el ? 'bg-secondary hover:bg-secondary/80 ' : ' bg-primary hover:bg-primary/80'} ${
                el === dictionary['Home'] ? 'px-1  ' : 'px-4'
              } text-white/80 border border-white py-1 capitalize font-medium text-xs md:text-base cursor-pointer rounded-full`}
              href={`${
                el === 'editorial' || el === 'videos'
                  ? ''
                  : i === 0
                    ? '/'
                    : i === 1
                      ? `/${pathNames[1]}`
                      : i === 2
                        ? `/${pathNames[1]}/${pathNames[2]}`
                        : ''
              }`}
              target="_self"
            >
              {el === dictionary['Home'] ? (
                <>
                  <div className=" w-5 h-5 p-[0.1rem] aspect-square flex md:hidden items-center justify-center">
                    <HomeIcon />
                  </div>
                  <span className=" hidden md:flex md:px-4 ">{el}</span>
                </>
              ) : (
                dictionary[el as keyof typeof dictionary] ||
                el.replaceAll('-', ' ')
              )}
            </Link>
            {i + 1 < pathNames.length && i < 2 && (
              <ChevronRight className=" mx-0 text-lg font-normal text-white/50 " />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
