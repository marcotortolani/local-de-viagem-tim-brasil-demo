/* eslint-disable @next/next/no-img-element */
// src/components/memotest/PanelFooter.tsx

'use client'

import { useMemo, useEffect } from 'react'
import Image from 'next/image'
import { useCountdown } from '@/hooks/memotest/useCountDown'
import useMemotestConfigStore from '@/stores/memotest-config-store'
import useGameStore from '@/stores/memotest-state-store'
import { useGameLevel } from '@/hooks/memotest/useGameLevel'
import { STATE_MEMOTEST } from '@/lib/constants'

import { PuzzleIcon } from 'lucide-react'

export function PanelFooter() {
  const { colors, statesByLevel } = useMemotestConfigStore()
  const { modeGame, points, currentLevel, countdown, setDefeat } =
    useGameStore()

  // Obtener el nivel que se está jugando actualmente
  const { availableLevel, config } = useGameLevel()

  // Hook de countdown controlado
  const {
    secondsLeft,
    minutes,
    seconds,
    // isRunning,
    // isPaused,
    isFinished,
    progress,
    initializeCountdown,
    startCountdown,
    pauseCountdown,
    //resumeCountdown,
    resetCountdown,
    // addTime,
  } = useCountdown(statesByLevel[currentLevel]?.seconds)

  // Para el display, usar availableLevel (nivel que puede jugar) o currentLevel como fallback
  const displayLevel = availableLevel || currentLevel

  const countdownRed = useMemo(() => {
    return secondsLeft !== 0 && secondsLeft <= 30 ? true : false
  }, [secondsLeft])

  // console.log(countdown)
  // console.log(statesByLevel[currentLevel]?.seconds)

  // Inicializar countdown cuando se establece desde el store
  useEffect(() => {
    if (countdown > 0) {
      initializeCountdown(countdown)
    }
  }, [countdown, initializeCountdown, modeGame])

  useEffect(() => {
    if (modeGame === STATE_MEMOTEST.start && availableLevel) {
      initializeCountdown(statesByLevel[availableLevel]?.seconds)
    }
    if (modeGame === STATE_MEMOTEST.gaming) {
      startCountdown()
    }
    if (
      modeGame === STATE_MEMOTEST.finish ||
      modeGame === STATE_MEMOTEST.next
    ) {
      pauseCountdown()
    }
  }, [modeGame])

  // Manejar cuando el tiempo se acaba
  useEffect(() => {
    if (modeGame === STATE_MEMOTEST.gaming && isFinished && secondsLeft === 0) {
      setDefeat(currentLevel, points, 0)
      resetCountdown()
    }
  }, [modeGame, isFinished, secondsLeft, currentLevel, points, setDefeat])

  // Controles del countdown
  // const handlePlayPause = () => {
  //   if (isRunning) {
  //     pauseCountdown()
  //   } else if (isPaused) {
  //     resumeCountdown()
  //   } else {
  //     startCountdown()
  //   }
  // }

  // const handleReset = () => {
  //   resetCountdown()
  // }

  // const handleAddTime = () => {
  //   addTime(30) // Agregar 30 segundos
  // }

  return (
    <footer
      className="z-10 w-screen max-w-xl h-[10vh] min-h-[60px] max-h-[80px] mb-4 px-2 flex items-center justify-center
      md:px-2
      hover:cursor-default"
    >
      <div
        className="relative w-full min-w-[260px] h-full p-1 flex items-center justify-around rounded-xl"
        style={{
          backgroundColor: config?.bgColorPanel || '#37377b',
        }}
      >
        <div className="z-0 absolute top-0 w-full h-full p-0.5 rounded-[inherit]">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-neutral-900/10 to-neutral-900/40 rounded-[inherit]"></div>
        </div>

        {/* Sección izquierda - Info del nivel */}
        <div className="z-10 w-1/3 h-full flex justify-center items-center gap-1">
          <PuzzleIcon
            className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 stroke-none"
            fill={config?.bgColorApp || '#533f84'}
          />
          <h5 className="text-white font-oswald font-normal text-lg uppercase tracking-wider">
            Mapa
            <span className="ml-1" style={{ color: colors.text }}>
              {displayLevel < 10 ? `0${displayLevel}` : displayLevel}
            </span>
          </h5>
        </div>

        {/* Sección central - Timer con controles */}
        <div className="z-10 w-1/3 h-full flex flex-col justify-center items-center">
          {/* Timer display */}
          <div className="w-full h-full bg-white rounded-xl px-3 py-1 flex items-center justify-center">
            <div
              className={`font-oswald font-semibold text-4xl sm:text-5xl lg:text-5xl ${
                countdownRed ? 'animation-countdown' : ''
              }`}
              style={{ color: config?.colorTimer || '#007aa0' }}
            >
              <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
              <span>:</span>
              <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
          </div>

          {/* Controles del timer */}
          {/* <div className="flex gap-1">
            <button
              onClick={handlePlayPause}
              className="p-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
              title={isRunning ? 'Pausar' : 'Iniciar'}
            >
              {isRunning ? (
                <Pause className="w-3 h-3 text-white" />
              ) : (
                <Play className="w-3 h-3 text-white" />
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
              title="Reiniciar"
            >
              <RotateCcw className="w-3 h-3 text-white" />
            </button>

            <button
              onClick={handleAddTime}
              className="p-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
              title="Agregar 30s"
            >
              <Plus className="w-3 h-3 text-white" />
            </button>
          </div> */}

          {/* Barra de progreso opcional */}
          {progress > 0 && (
            <div className="w-full bg-white/20 rounded-full h-1 mt-1">
              <div
                className={`${
                  countdownRed && 'animation-countdown-bg'
                } bg-white h-1 rounded-full transition-all duration-1000`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Sección derecha - Info del tema */}
        <div className="z-10 w-1/3 h-full flex justify-center items-center gap-1">
          <span className="font-oswald font-normal text-lg md:text-xl uppercase text-white">
            {config?.title || 'Nivel'}
          </span>
          <Image
            className="w-10 sm:w-14"
            width={30}
            height={40}
            src={config?.iconLevel || '/default-icon.webp'}
            alt={`Image Icon ${config?.title || 'Nivel'}`}
          />
        </div>
      </div>
    </footer>
  )
}
// /* eslint-disable @next/next/no-img-element */
// // src/components/memotest/PanelFooter.tsx

// 'use client'

// import { useMemo, useEffect } from 'react'
// import Image from 'next/image'
// import { useCountdown } from '@/hooks/memotest/useCountDown'
// import useMemotestConfigStore from '@/stores/memotest-config-store'
// import useGameStore from '@/stores/memotest-state-store'
// import { STATE_MEMOTEST } from '@/lib/constants'

// import { PuzzleIcon } from 'lucide-react'

// export function PanelFooter() {
//   const { colors, configByLevel } = useMemotestConfigStore()
//   const {
//     modeGame,
//     points,
//     currentLevel,
//     completedLevels,
//     countdown,
//     setDefeat,
//   } = useGameStore()
//   const { secondsLeft, startCountdown } = useCountdown()

//   console.log(currentLevel)
//   console.log(completedLevels)

//   const countdownRed = useMemo(() => {
//     return secondsLeft !== 0 && secondsLeft <= 30 ? true : false
//   }, [countdown, secondsLeft])

//   useEffect(() => {
//     if (countdown > 0) {
//       startCountdown(countdown)
//     }
//     if (countdown === 0 && secondsLeft !== 0) {
//       startCountdown(0)
//     }
//   }, [countdown])

//   const timer = useMemo(() => {
//     // prueba sin timer
//     return { minutes: 1, seconds: 1 }
//     let minutes, seconds
//     if (secondsLeft >= 60) {
//       minutes = Math.floor(secondsLeft / 60)
//       seconds = secondsLeft - minutes * 60
//     } else {
//       minutes = 0
//       seconds = secondsLeft
//     }
//     if (modeGame === STATE_MEMOTEST.gaming && secondsLeft === 0) {
//       setDefeat(currentLevel, points, 0)
//     }
//     return { minutes, seconds }
//   }, [secondsLeft])

//   return (
//     <footer
//       className="  z-10 w-screen  max-w-xl h-[10vh] min-h-[60px] max-h-[80px] mb-4 px-2 flex items-center justify-center
//       md:px-2
//       hover:cursor-default "
//     >
//       <div
//         className=" relative w-full min-w-[260px] h-full p-1 flex items-center justify-around  rounded-xl"
//         style={{
//           backgroundColor: configByLevel[currentLevel]?.bgColorPanel,
//         }}
//       >
//         <div className=" z-0 absolute top-0 w-full h-full p-0.5 rounded-[inherit] ">
//           <div className="w-full h-full bg-gradient-to-b from-transparent via-neutral-900/10 to-neutral-900/40 rounded-[inherit] "></div>
//         </div>

//         <div className="z-10 w-1/3 h-full flex justify-center items-center gap-1">
//           <PuzzleIcon
//             className=" w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 stroke-none "
//             fill={configByLevel[currentLevel]?.bgColorApp}
//           />
//           <h5 className=" text-white font-oswald font-normal text-lg uppercase tracking-wider">
//             Mapa
//             <span className=" ml-1 " style={{ color: colors.text }}>
//               {currentLevel < 10 ? `0${currentLevel}` : currentLevel}
//             </span>
//           </h5>
//         </div>

//         <div className="z-10 w-1/3 h-full flex flex-col justify-center items-center bg-white rounded-xl ">
//           <div
//             className={` font-oswald font-semibold text-[2.5rem] ${
//               countdownRed ? 'animation-countdown' : ''
//             } `}
//             style={{ color: configByLevel[currentLevel]?.colorTimer }}
//           >
//             <span>
//               {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
//             </span>
//             <span>:</span>
//             <span>
//               {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
//             </span>
//           </div>
//         </div>

//         <div className="z-10 w-1/3 h-full flex justify-center items-center gap-1">
//           <span className=" font-oswald font-normal text-lg md:text-xl uppercase text-white">
//             {configByLevel[currentLevel]?.title}
//           </span>
//           <Image
//             className=" w-10 sm:w-14"
//             width={30}
//             height={40}
//             src={configByLevel[currentLevel]?.iconLevel}
//             alt={`Image Icon ${configByLevel[currentLevel]?.title}`}
//           />
//         </div>
//       </div>
//     </footer>
//   )
// }
