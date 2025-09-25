'use client'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, MotionConfig } from 'motion/react'

import Image from 'next/image'
import Link from 'next/link'

const ITEMS_NAV = [
  {
    name: 'Conociendo Venezuela',
    href: '/inspired-by',
    icon: '/icons/destinos-icon.svg',
  },
  {
    name: 'Por el Mundo',
    href: '/around-the-world',
    icon: '/icons/mundo-icon.svg',
  },
  {
    name: 'Cultura y Paladar',
    href: '/culture-and-flavor',
    icon: '/icons/sabores-del-mundo-icon.svg',
  },
  {
    name: 'Checklist',
    href: '/checklist',
    icon: '/icons/checklist-icon.svg',
  },
  {
    name: 'Destinos del Mes',
    href: '/destinations-of-the-month',
    icon: '/icons/itineraries-icon.svg',
  },
  {
    name: 'Detras del Mapa',
    href: '/culture-and-flavor/detras-del-mapa',
    icon: '/icons/mapa-icon.svg',
  },
  {
    name: 'Travelers',
    href: '/inspired-by/travelers',
    icon: '/icons/travelers-icon.svg',
  },
]

export default function SideNavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [open])

  return (
    <aside
      ref={ref}
      className=" z-50  fixed top-0 left-0 translate-x-0 translate-y-40 hidden xl:flex flex-col items-center w-fit h-fit rounded-r-2xl overflow-hidden bg-secondary/60"
    >
      <motion.div
        initial={{ width: 90 }}
        animate={{
          width: open ? 280 : 90,
        }}
        className="w-full h-full"
      >
        <header className="bg-secondary w-full flex justify-center">
          <div className="ml-2 my-1 w-full h-18 grid place-content-left">
            <AnimatedHamburgerButton open={open} setOpen={setOpen} />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: open ? 1 : 0,
              x: open ? 80 : -100,
            }}
            transition={{
              duration: 0.5,
            }}
            className=" absolute top-4 w-[61px] h-[43px]"
          >
            <Link href="/" prefetch className=" w-full h-full">
              <Image
                src="/images/logo-product-white.webp"
                alt="logo Que Guay"
                width={61}
                height={43}
                className={`w-full h-full `}
              />
            </Link>
          </motion.div>
        </header>
        <nav className={`${open ? ' flex ' : ' hidden '} w-full h-full p-4`}>
          <ul className={` w-full flex flex-col items-start gap-4 `}>
            {ITEMS_NAV.map((item) => (
              <li key={item.name} className=" relative w-full  ">
                <Link
                  prefetch
                  href={item.href}
                  className="relative group w-full h-full flex items-center justify-start "
                >
                  <div className=" w-14 h-14 z-20 bg-secondary-dark group-hover:bg-secondary rounded-full p-3 flex items-center transition-all duration-300 ease-in-out">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-full h-full"
                    />
                  </div>
                  <motion.span
                    initial={{ opacity: 0, x: -100, scale: 0 }}
                    animate={{
                      opacity: open ? 1 : 0,
                      x: open ? 80 : -100,
                      scale: open ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={` absolute left-0 z-0 w-fit text-nowrap px-1 py-1 text-white  text-[16px] font-semibold `}
                  >
                    {item.name}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: open ? 1 : 0 }}
                    className="absolute top-0 -right-16 origin-right -z-10 w-full h-full scale-x-0 group-hover:scale-x-100 group-hover:bg-secondary  transition-all duration-300 ease-in-out rounded-full "
                  ></motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </aside>
  )
}

const AnimatedHamburgerButton = ({
  open: active,
  setOpen: setActive,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  // const [active, setActive] = useState(false)
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.button
        initial={false}
        animate={active ? 'open' : 'closed'}
        onClick={() => setActive(!active)}
        className="relative h-16 w-16 rounded-full bg-white/0 transition-colors hover:bg-white/20"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-10 bg-white rounded-full"
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-10 bg-white rounded-full"
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-10 bg-white rounded-full"
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: 'calc(50% + 10px)',
          }}
        />
      </motion.button>
    </MotionConfig>
  )
}

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 0px)',
    },
  },
}
