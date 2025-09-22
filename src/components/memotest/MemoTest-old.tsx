// src/components/memotest/MemoTest.tsx

/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useRef } from 'react'
import useGameStore from '@/stores/memotest-state-store'
import useMemotestConfigStore from '@/stores/memotest-config-store'

import { useCloneCards } from '@/hooks/memotest/useClonedCards'
import { useTapCards } from '@/hooks/memotest/useTapCards'
import useSound from 'use-sound'
import StateGameScreen from './StateGameScreen'

import { STATE_MEMOTEST } from '@/lib/constants'
import Image from 'next/image'

export function MemoTest() {
  const {
    soundOn,
    images,
    sounds,
    texts,
    statesByLevel: GAME_LEVEL,
    configByLevel,
  } = useMemotestConfigStore()

  const { cardBack, logoLarge } = images

  // Reemplazamos useContext por el store de Zustand
  const {
    modeGame,
    currentLevel: level,
    points,
    startGame: startGameAction,
    setNext,
    setGaming,
    finishGame,
    resetGame,
  } = useGameStore()

  const { clonedCards, sortCards } = useCloneCards({
    imgCards: configByLevel[level]?.imgCards,
  })
  const { selected, guessed, cardTaped, levelFinished } = useTapCards(
    clonedCards.length,
  )
  const [confetti] = useSound(sounds.confetti)

  // Ref para evitar múltiples inicializaciones
  const hasInitialized = useRef(false)
  // Ref para controlar si ya se procesó el nivel terminado
  const levelProcessedRef = useRef(false)

  // Efecto separado para inicialización (solo se ejecuta una vez)
  useEffect(() => {
    if (level === 0 && !hasInitialized.current) {
      hasInitialized.current = true
      startGameAction(1)
    }
  }, []) // Sin dependencias para que solo se ejecute una vez

  // Efecto separado para manejar el progreso del juego
  useEffect(() => {
    // Solo procesar si el nivel está terminado Y no se ha procesado ya Y estamos en modo gaming
    if (
      level >= 1 &&
      levelFinished &&
      !levelProcessedRef.current &&
      modeGame === STATE_MEMOTEST.gaming
    ) {
      levelProcessedRef.current = true // Marcar como procesado

      if (level === Object.keys(GAME_LEVEL).length) {
        // sound and confetti celebration
        setTimeout(() => {
          setNext(level, points + GAME_LEVEL[level].points)
          finishGame()
          cardTaped(null)
          if (soundOn) {
            confetti()
          }
        }, 500)
        return
      }
      setTimeout(() => {
        setNext(level + 1, points + GAME_LEVEL[level].points)
        // incluir algun sonido de NIVEL PASADO
      }, 500)
    }
  }, [
    levelFinished,
    level,
    points,
    GAME_LEVEL,
    soundOn,
    confetti,
    setNext,
    finishGame,
    cardTaped,
    modeGame,
  ])

  // Reset del flag cuando cambia el nivel o el modo de juego
  useEffect(() => {
    levelProcessedRef.current = false
  }, [level, modeGame])

  function handleStart() {
    setNext(level, 0)
    setGaming(GAME_LEVEL[1].seconds)
  }

  function handleNextLevel() {
    levelProcessedRef.current = false // Reset del flag al avanzar manualmente
    setGaming(GAME_LEVEL[level].seconds)
    cardTaped(null)
    sortCards()
  }

  function handleDefeat() {
    hasInitialized.current = false // Reset para poder reinicializar
    resetGame()
    cardTaped(null)
  }

  function handleFinish() {
    hasInitialized.current = false // Reset para poder reinicializar
    resetGame()
    cardTaped(null)
  }

  function handleTap(card: string) {
    cardTaped(card)
  }

  return (
    <div
      className=" z-20 w-6/6 h-4/6 min-h-[420px] px-4 mt-10 mb-4 
        flex flex-col items-center
        sm:w-4/6 sm:h-fit md:w-5/6 md:max-w-[700px] md:mt-20 lg:w-9/12 lg:max-w-[800px] lg:mt-10 xl:w-7/12 2xl:w-5/12 2xl:max-w-[700px] 2xl:mt-4 lg:px-10 xl:px-10"
    >
      <ul className="w-full h-full grid grid-cols-4 md:grid-cols-5  gap-3 md:gap-6 ">
        {clonedCards.map((card: string) => {
          const [, url] = card.split('|')
          return (
            <li
              onClick={() => handleTap(card)}
              key={card}
              className={` wrapper-cards aspect-square min-w-14 min-h-14 lg:min-w-20 w-full h-auto p-0 border-solid border-2 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out
              md:p-4 lg:p-2
              ${
                selected.includes(card) || guessed.includes(card)
                  ? ' flip-vertical border-none'
                  : ' show-back '
              }`}
              style={{
                background:
                  selected.includes(card) || guessed.includes(card)
                    ? '#0000'
                    : 'linear-gradient(180deg, #6a9dd4 0%, #46688d 100%)',
                borderColor: '#78D3C6',
              }}
            >
              <Image
                className="w-full h-full aspect-square card card-front rounded-[inherit]"
                fill
                src={url}
                alt="icon"
              />
              <Image
                className="w-full h-auto aspect-square card card-back  min-w-50 p-3 rounded-[inherit]"
                fill
                src={cardBack}
                alt="icon"
              />
            </li>
          )
        })}
      </ul>

      {modeGame === STATE_MEMOTEST.start && (
        <StateGameScreen
          imgHero={logoLarge}
          title={`Nivel ${level}: ${configByLevel[level]?.title}`}
          // text={texts.startGameText}
          text="Encuentra las coincidencias y desbloquea el nivel"
          btnText={texts.buttonStartGame}
          onHandleClick={handleStart}
        />
      )}

      {modeGame === STATE_MEMOTEST.next && (
        <StateGameScreen
          imgHero={logoLarge}
          title={`Nivel ${level}: ${configByLevel[level]?.title}`}
          // text={`${texts.nextLevelText01} ${level}, ${texts.nextLevelText02} ${
          //   GAME_LEVEL[level - 1].points
          // } ${texts.points}`}
          text="Pasa al siguiente nivel"
          btnText={texts.buttonNextLevel}
          onHandleClick={handleNextLevel}
        />
      )}

      {modeGame === STATE_MEMOTEST.defeat && (
        <StateGameScreen
          text={texts.defeatText}
          btnText={texts.buttonTryAgain}
          onHandleClick={handleDefeat}
        />
      )}

      {modeGame === STATE_MEMOTEST.finish && (
        <StateGameScreen
          isFinished={true}
          imgHero={logoLarge}
          title={texts.youWon}
          // text={`${texts.finishText} ${points} ${texts.points}.`}
          text="Pasaste todos los niveles, descarga tu eBook y accede al sorteo"
          btnText={texts.buttonFinish}
          onHandleClick={handleFinish}
        />
      )}
    </div>
  )
}
// /* eslint-disable @next/next/no-img-element */
// 'use client'
// import { useEffect, useRef } from 'react'
// import useGameStore from '@/stores/memotest-state-store'
// import useMemotestConfigStore from '@/stores/memotest-config-store'

// import { useCloneCards } from '@/hooks/memotest/useClonedCards'
// import { useTapCards } from '@/hooks/memotest/useTapCards'
// import useSound from 'use-sound'
// import StateGameScreen from './StateGameScreen'

// import { STATE_MEMOTEST } from '@/lib/constants'

// export function MemoTest() {
//   const {
//     soundOn,
//     colors,
//     images,
//     sounds,
//     texts,
//     statesByLevel: GAME_LEVEL,
//   } = useMemotestConfigStore()

//   const { cardBack, imgCards, startGame, endLevel, endGame } = images

//   // Reemplazamos useContext por el store de Zustand
//   const {
//     modeGame,
//     level,
//     points,
//     startGame: startGameAction,
//     setNext,
//     setGaming,
//     finishGame,
//     resetGame,
//   } = useGameStore()

//   const { clonedCards, sortCards } = useCloneCards({ imgCards })
//   const { selected, guessed, cardTaped, levelFinished } = useTapCards(
//     clonedCards.length,
//   )

//   const [confetti] = useSound(sounds.confetti)

//   // Ref para evitar múltiples inicializaciones
//   const hasInitialized = useRef(false)

//   // Efecto separado para inicialización (solo se ejecuta una vez)
//   useEffect(() => {
//     if (level === 0 && !hasInitialized.current) {
//       hasInitialized.current = true
//       startGameAction()
//     }
//   }, []) // Sin dependencias para que solo se ejecute una vez

//   // Efecto separado para manejar el progreso del juego
//   useEffect(() => {
//     if (level >= 1 && levelFinished) {
//       if (level === Object.keys(GAME_LEVEL).length) {
//         // sound and confetti celebration
//         setTimeout(() => {
//           setNext(level, points + GAME_LEVEL[level].points)
//           finishGame()
//           cardTaped(null)
//           if (soundOn) {
//             confetti()
//           }
//         }, 500)
//         return
//       }
//       setTimeout(() => {
//         setNext(level + 1, points + GAME_LEVEL[level].points)
//         // incluir algun sonido de NIVEL PASADO
//       }, 500)
//     }
//   }, [levelFinished, level]) // Solo dependencias esenciales

//   function handleStart() {
//     setNext(1, 0)
//     setGaming(GAME_LEVEL[1].seconds)
//   }

//   function handleNextLevel() {
//     setGaming(GAME_LEVEL[level].seconds)
//     cardTaped(null)
//     sortCards()
//   }

//   function handleDefeat() {
//     hasInitialized.current = false // Reset para poder reinicializar
//     resetGame()
//     cardTaped(null)
//   }

//   function handleFinish() {
//     hasInitialized.current = false // Reset para poder reinicializar
//     resetGame()
//     cardTaped(null)
//   }

//   function handleTap(card: string) {
//     cardTaped(card)
//   }

//   return (
//     <main
//       className=" z-20 w-6/6 h-6/12 px-8 mt-0 mb-4
//         flex flex-col items-center
//         sm:w-3/6 md:w-4/6 lg:w-8/12 xl:w-6/12 2xl:w-5/12 lg:px-10 xl:px-20 "
//     >
//       <ul className=" grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-6">
//         {clonedCards.map((card: string) => {
//           const [, url] = card.split('|')
//           return (
//             <li
//               onClick={() => handleTap(card)}
//               key={card}
//               className={` wrapper-cards min-w-50 min-h-50 p-0 border-solid border-2 rounded-xl hover:cursor-pointer
//               md:p-4 lg:p-2
//               ${
//                 selected.includes(card) || guessed.includes(card)
//                   ? ' flip-vertical border-none'
//                   : ' show-back '
//               }`}
//               style={{
//                 backgroundColor:
//                   selected.includes(card) || guessed.includes(card)
//                     ? '#0000'
//                     : colors.primary,
//                 borderColor: colors.borderCard,
//               }}
//             >
//               <img
//                 className=" card card-front rounded-[inherit]"
//                 src={url}
//                 alt="icon"
//               />
//               <img
//                 className=" card card-back  min-w-50 p-1 rounded-[inherit]"
//                 src={cardBack}
//                 alt="icon"
//               />
//             </li>
//           )
//         })}
//       </ul>

//       {modeGame === STATE_MEMOTEST.start && (
//         <StateGameScreen
//           imgHero={startGame}
//           text={texts.startGameText}
//           btnText={texts.buttonStartGame}
//           onHandleClick={handleStart}
//         />
//       )}

//       {modeGame === STATE_MEMOTEST.next && (
//         <StateGameScreen
//           imgHero={endLevel}
//           text={`${texts.nextLevelText01} ${level}, ${texts.nextLevelText02} ${
//             GAME_LEVEL[level - 1].points
//           } ${texts.points}`}
//           btnText={texts.buttonNextLevel}
//           onHandleClick={handleNextLevel}
//         />
//       )}

//       {modeGame === STATE_MEMOTEST.defeat && (
//         <StateGameScreen
//           text={texts.defeatText}
//           btnText={texts.buttonTryAgain}
//           onHandleClick={handleDefeat}
//         />
//       )}

//       {modeGame === STATE_MEMOTEST.finish && (
//         <StateGameScreen
//           isFinished={true}
//           imgHero={endGame}
//           title={texts.youWon}
//           text={`${texts.finishText} ${points} ${texts.points}.`}
//           btnText={texts.buttonFinish}
//           onHandleClick={handleFinish}
//         />
//       )}
//     </main>
//   )
// }
