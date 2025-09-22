'use client'
import React from 'react'
import Image from 'next/image'


export const Banner3: React.FC = () => {
  return (
    <div className="relative w-full h-[180px] ">
      <Image
        className="rounded-lg blur-[0.5px] "
        src="/images/banner-cultura-paladar.webp"
        alt="logo"
        fill
        style={{
          objectFit: 'cover',
        }}
      />
      <div className="w-full h-full absolute flex justify-end p-4 flex-col">
        <div className="">
          <div className="text-white font-bold text-2xl lg:text-4xl">Cultura & Paladar</div>
          <div className="text-white font-normal text-[10px] mb-3 leading-[12px] lg:text-lg">
            Conoce la comida típica de cada país, las mejores recetas y recorridos gastronómicos en diferentes partes
            del mundo.
          </div>
        </div>
      </div>
    </div>
  )
}