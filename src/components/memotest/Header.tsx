// src/components/memotest/Header.tsx

'use client'

import { useState } from 'react'
import useSound from 'use-sound'

import useMemotestConfigStore from '@/stores/memotest-config-store'
import { Menu, Volume2, VolumeOff } from 'lucide-react'
import SidebarMenu from './SidebarMenu'
import Image from 'next/image'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const { soundOn, setSoundOn, colors, images, sounds } =
    useMemotestConfigStore()

  const { logoLarge } = images
  const [mutePop] = useSound(sounds.popClick)

  function handleSound() {
    const context = new AudioContext()
    context.resume()
    mutePop()
    setSoundOn(!soundOn)
  }

  return (
    <header className=" z-50 w-full max-w-md my-2 sm:max-w-xl lg:max-w-screen-md h-fit gap-2 flex items-center justify-around">
      <button
        className="w-12 h-auto p-2  border-transparent rounded-full transition-all
        hover:cursor-pointer 
        sm:w-14 sm:h-14"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu
          size={30}
          className={` stroke-white hover:scale-105 transition-all duration-200 ease-in-out`}
        />
      </button>
      <SidebarMenu open={menuOpen} setOpen={setMenuOpen} />

      {logoLarge ? (
        <div className="z-50 relative w-4/6 mr-1 min-w-[100px] max-w-[160px] h-16 md:w-3/6 ">
          <Image
            className="relative w-full h-auto object-contain object-center"
            fill
            src={logoLarge}
            alt="Logo MemoTest Game"
          />
        </div>
      ) : (
        <h1
          className=" w3/6 text-2xl font-semibold"
          style={{ color: colors.titleScreen }}
        >
          MEMOTEST Que Guay Viajes!
        </h1>
      )}

      <div
        className="sound-controls w-12 h-auto p-[10px] border-transparent rounded-full transition-all
        hover:cursor-pointer 
        sm:w-14 sm:h-14"
        // style={{ borderColor: colors.borderCard }}
      >
        <button
          className=" hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out "
          onClick={handleSound}
        >
          {soundOn ? (
            <Volume2 className=" w-7 h-7 stroke-white " />
          ) : (
            <VolumeOff className=" w-7 h-7 stroke-white " />
          )}
        </button>
      </div>
    </header>
  )
}
