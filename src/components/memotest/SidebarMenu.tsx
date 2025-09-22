// src/components/memotest/SidebarMenu.tsx

'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { RouteItem } from '@/lib/route/route-types'
import { SheetUI } from '../ui/sidebar/sheet'
import { MobileHeader } from '../layout/MobileHeader'
import { MenuFooter } from '../layout/MenuFooter'

export default function SidebarMenu({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  // Especificar el tipo correcto para el ref
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const MOBILE_ROUTES: RouteItem[] = [
    {
      title: 'Volver al portal',
      href: '/',
    },
    {
      title: 'Inspírate en Venezuela',
      href: '/inspirate-en-venezuela',
    },
    {
      title: 'Jugar Memotest',
      href: '/memotest',
    },
    {
      title: 'Ver progreso',
      href: '/memotest/progreso',
    },
  ]

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    // outside click
    function handleClickOutside(event: MouseEvent) {
      event.stopPropagation()
      event.preventDefault()

      // Verificar que event.target sea un Node
      if (!(event.target instanceof Node)) return
      if (!menuRef.current) return
      if (event.target === menuRef.current) return

      // Ahora TypeScript sabe que menuRef.current es HTMLDivElement y event.target es Node
      if (!menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    // Solo agregar el listener cuando el menu está abierto
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, setOpen]) // Agregar open como dependencia

  return (
    <SheetUI
      sidebarClassName="z-50 bg-primary-dark text-white w-[90%] overflow-x-hidden overflow-y-auto sm:overflow-y-hidden rounded-l-xl md:rounded-l-2xl"
      open={open}
      onOpenChange={() => {
        setOpen(!open)
      }}
      items={MOBILE_ROUTES}
      closeColor={'#fff'}
      header={<MobileHeader />}
      footer={<MenuFooter />}
      sidebarMenuItemClassName="text-sm "
    />
  )

  // return (
  //   <div
  //     ref={menuRef}
  //     className={`${
  //       open ? 'translate-x-0' : '-translate-x-full'
  //     } fixed top-0 left-0 z-[20000] w-[95%] max-w-screen-sm h-screen px-2 py-4 bg-sky-700/60 backdrop-blur transition-all duration-200 ease-in-out rounded-r-3xl`}
  //   >
  //     <button
  //       onClick={() => setOpen(!open)}
  //       type="button"
  //       className="absolute top-4 right-4"
  //     >
  //       <XCircle />
  //     </button>
  //     <p className="text-2xl font-bold text-white">Menu de Usuario</p>
  //     <ul className="flex flex-col gap-6 mt-10">
  //       <li>
  //         <Link href="/">Volver al portal</Link>
  //       </li>
  //       <li>
  //         <Link href="/memotest">Jugar Memotest</Link>
  //       </li>
  //       <li>
  //         <Link href="/memotest/progreso">Ver progreso</Link>
  //       </li>
  //     </ul>
  //   </div>
  // )
}
