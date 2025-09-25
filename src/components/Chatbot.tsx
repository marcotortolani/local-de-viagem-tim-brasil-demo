'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'

import dictionary from '@/dictionary/lang.json'

const URL_CHATBOT = process.env.NEXT_PUBLIC_URL_CHATBOT

export const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setChatOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setChatOpen(false)
      }
    }
    if (chatOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [chatOpen])

  if (pathname.includes('shorts')) return null

  return (
    <div
      ref={modalRef}
      className={
        'z-30 fixed md:sticky bottom-2 md:bottom-12 lg:bottom-4 right-0 md:right-4 w-full sm:w-[380px] md:w-full h-fit flex flex-col items-end pointer-events-auto'
      }
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={chatOpen ? { opacity: 1, scale: 1 } : {}}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
      >
        {chatOpen && (
          <iframe
            src={URL_CHATBOT}
            className={`${
              chatOpen ? ' scale-100 flex ' : ' scale-100 hidden '
            }  absolute bottom-[7.5rem] right-0 md:bottom-20 lg:bottom-20 md:right-0 lg:right-2 xl:right-10 w-full md:w-[380px] lg:w-[400px] 
        h-[60svh] max-h-[550px]
        transition-all duration-100 ease-in-out`}
          />
        )}
      </motion.div>
      <div className=" absolute bottom-16 md:bottom-4 lg:bottom-4 right-2 lg:right-4 w-fit my-2 pr-2 sm:pr-0 flex items-center justify-end gap-2 md:justify-between">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className=" relative w-fit md:w-[250px] h-16 md:pr-4 bg-primary-dark shadow-md shadow-black/50 rounded-full flex justify-center items-center gap-2"
        >
          <div className="relative h-full aspect-square p-2 bg-tertiary rounded-full">
            <Image
              className=" h-full"
              src="/images/bot-qgv.webp"
              alt="chat-bot-icon"
              width={55}
              height={61}
            />
          </div>
          <p className=" hidden md:block w-full text-balance font-poppins font-light text-base leading-5 text-white">
            {dictionary['Chat with our travel assistant!']}
          </p>
        </button>
      </div>
    </div>
  )
}
