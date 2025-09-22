/* eslint-disable @next/next/no-img-element */
// src/components/memotest/StateGameScreen.tsx

'use client'
import useMemotestConfigStore from '@/stores/memotest-config-store'
import Image from 'next/image'
import Confetti from 'react-confetti'

export default function StateGameScreen({
  imgHero,
  title,
  text,
  btnText = 'Start',
  onHandleClick,
  isFinished,
}: {
  imgHero?: string
  title?: string
  text: string
  btnText?: string
  onHandleClick: () => void
  isFinished?: boolean
}) {
  const { colors } = useMemotestConfigStore((state) => state)

  return (
    <div
      className="transition-opacity absolute top-0 z-[5000] w-screen h-screen px-4 py-10
          flex flex-col gap-4 justify-center items-center bg-black/80"
    >
      {imgHero && (
        <div
          className={` w-[60%] min-w-[180px] max-w-[280px] sm:max-w-xs mb-6 md:mb-8 lg:mb-10 ${
            isFinished ? 'animate-bounce' : 'animate-pulse'
          } ${
            btnText.includes('Start') &&
            'w-full min-w-[260px] max-w-[340px] sm:max-w-lg animate-[unset]'
          } `}
        >
          <Image
            className=" w-full h-auto object-contain object-center "
            width={150}
            height={100}
            src={imgHero}
            alt="Image Cartoon Hero"
          />
        </div>
      )}
      {title && (
        <h2
          className=" z-50 w-[90vw] max-w-2xl text-3xl font-poppins tracking-wider uppercase cursor-default text-center
                      sm:text-5xl "
          style={{ color: colors.titleScreen }}
        >
          {title}
        </h2>
      )}
      <h3
        className=" z-50 w-[80vw] max-w-2xl mb-20 text-3xl font-oswald uppercase  cursor-default text-center text-balance
                      sm:text-3xl md:max-w-md  "
        style={{ color: colors.textScreen }}
      >
        {text}
      </h3>
      <button
        className=" z-20 p-3 text-lg uppercase font-bold font-sans rounded-full
        hover:opacity-80 active:scale-[0.95]
        sm:text-xl sm:p-5"
        onClick={onHandleClick}
        style={{
          background: colors.nextBtnGradient,
          color: colors.nextBtnText,
        }}
      >
        {btnText}
      </button>

      {isFinished && (
        <div>
          <Confetti className=" z-50 flex flec-col items-center w-screen h-auto md:w-auto md:h-screen md:m-auto" />
        </div>
      )}
    </div>
  )
}
