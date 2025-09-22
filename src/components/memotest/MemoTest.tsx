/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import useGameStore from '@/stores/memotest-state-store'
import useMemotestConfigStore from '@/stores/memotest-config-store'
import { useGameLevel } from '@/hooks/memotest/useGameLevel'

import { useCloneCards } from '@/hooks/memotest/useClonedCards'
import { useTapCards } from '@/hooks/memotest/useTapCards'
import useSound from 'use-sound'
import StateGameScreen from './StateGameScreen'
import { submitData } from '@/app/actions/google-api'

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

  // Store de Zustand
  const {
    userHashID,
    modeGame,
    currentLevel,
    completedLevels,
    points,
    startGame: startGameAction,
    setNext,
    setGaming,
    finishGame,
    resetGame,
  } = useGameStore()

  // Hook que determina qué nivel puede jugar según fechas
  const { availableLevel, config, canPlay } = useGameLevel()

  // Usar el nivel correcto para las cartas (availableLevel del hook)
  const { clonedCards, sortCards } = useCloneCards({
    imgCards: config?.imgCards || [],
  })

  const { selected, guessed, cardTaped, levelFinished } = useTapCards(
    clonedCards.length,
  )

  const [confetti] = useSound(sounds.confetti)

  // Refs para control de flujo
  const hasInitialized = useRef(false)
  const levelProcessedRef = useRef(false)
  const router = useRouter()

  // Función para enviar datos al Google Sheet
  const sendToGoogleSheet = async ({
    levelCompleted,
    hashID,
  }: {
    levelCompleted: number
    hashID: string
  }) => {
    try {
      // Obtener información del nivel completado
      const levelConfig = configByLevel[levelCompleted]
      const levelTitle = levelConfig?.title || `Nivel ${levelCompleted}`

      // Datos que necesitas del usuario (ajusta según tu sistema de usuarios)
      const userData = {
        hashID: hashID,
        unlockedContent: levelTitle.toLowerCase(), // 'playa', 'selva', 'montaña', 'ciudad'
        levelCompleted: levelCompleted,
      }

      // Enviar de forma asíncrona (no bloquea la UI)
      const result = await submitData({
        hashID: userData.hashID,
        levelCompleted: userData.levelCompleted,
        unlockedContent: userData.unlockedContent,
      })

      if (result.success) {
        console.log(
          `✅ Nivel ${levelCompleted} registrado en Google Sheet:`,
          result.message,
        )
      } else {
        console.error(
          `❌ Error al registrar nivel ${levelCompleted}:`,
          result.message,
        )
      }
    } catch (error) {
      console.error(
        `❌ Error enviando datos del nivel ${levelCompleted}:`,
        error,
      )
      // El error no afecta la experiencia del usuario
    }
  }

  // Efecto para inicialización
  useEffect(() => {
    if (completedLevels === 0 && availableLevel && !hasInitialized.current) {
      hasInitialized.current = true
      startGameAction(availableLevel)
    }
  }, [completedLevels, availableLevel, startGameAction])

  // Efecto para manejar el progreso del juego
  useEffect(() => {
    if (
      currentLevel >= 1 &&
      levelFinished &&
      !levelProcessedRef.current &&
      modeGame === STATE_MEMOTEST.gaming
    ) {
      levelProcessedRef.current = true

      const newCompletedLevel = currentLevel
      const earnedPoints = points + GAME_LEVEL[currentLevel].points

      // 🚀 ENVIAR DATOS AL GOOGLE SHEET (ASÍNCRONO)
      sendToGoogleSheet({
        levelCompleted: newCompletedLevel,
        hashID: userHashID,
      })

      if (currentLevel === Object.keys(GAME_LEVEL).length) {
        // Último nivel - completar juego
        setTimeout(() => {
          setNext(newCompletedLevel, earnedPoints)
          finishGame()
          cardTaped(null)
          if (soundOn) {
            confetti()
          }
        }, 500)
        return
      }

      // Nivel intermedio - pasar al siguiente
      setTimeout(() => {
        setNext(newCompletedLevel, earnedPoints)
      }, 500)
    }
  }, [
    levelFinished,
    currentLevel,
    points,
    GAME_LEVEL,
    soundOn,
    confetti,
    setNext,
    finishGame,
    cardTaped,
    modeGame,
    configByLevel,
  ])

  // Reset del flag cuando cambia el nivel o modo
  useEffect(() => {
    levelProcessedRef.current = false
  }, [currentLevel, modeGame])

  // Handlers
  function handleStart() {
    if (availableLevel) {
      startGameAction(availableLevel)
      setGaming(GAME_LEVEL[availableLevel].seconds)
    }
  }

  function handleNextLevel() {
    levelProcessedRef.current = false
    if (availableLevel) {
      startGameAction(availableLevel)
      setGaming(GAME_LEVEL[availableLevel].seconds)
      cardTaped(null)
      sortCards()
    }
  }

  function handleDefeat() {
    hasInitialized.current = false
    resetGame()
    cardTaped(null)
  }

  function handleFinish() {
    hasInitialized.current = false
    resetGame()
    cardTaped(null)
    router.push('/memotest/progreso')
  }

  function handleTap(card: string) {
    cardTaped(card)
  }

  // Si no puede jugar, no renderizar el juego
  if (!canPlay || !availableLevel) {
    return (
      <div className="z-20 w-6/6 h-4/6 min-h-[420px] px-4 mt-10 mb-4 flex flex-col items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Nivel no disponible</h2>
          <p>Este nivel se activará pronto...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="z-20 w-[90%] h-5/6 min-h-[420px] px-2 mt-6 mb-4 
          flex flex-col items-center
          sm:w-4/6 sm:h-fit md:w-5/6 md:max-w-[700px] md:mt-20 lg:w-9/12 lg:max-w-[800px] lg:mt-10 xl:w-7/12 2xl:w-5/12 2xl:max-w-[700px] 2xl:mt-4 lg:px-10 xl:px-10 "
    >
      <ul className="w-full h-full grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-6 ">
        {clonedCards.map((card: string) => {
          const [, url] = card.split('|')
          return (
            <li
              onClick={() => handleTap(card)}
              key={card}
              className={`wrapper-cards aspect-square min-w-14 min-h-14 lg:min-w-20 w-full h-auto p-0 border-solid border-2 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out
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
                className="w-full h-auto card card-front rounded-[inherit]"
                fill
                src={url}
                alt="icon"
              />
              <Image
                className="w-full h-auto card card-back px-3 py-4 lg:px-4 lg:py-5 rounded-[inherit]"
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
          title={`Nivel ${availableLevel}: ${config?.title}`}
          text="Encuentra las coincidencias y desbloquea el nivel"
          btnText={texts.buttonStartGame}
          onHandleClick={handleStart}
        />
      )}

      {modeGame === STATE_MEMOTEST.next && (
        <StateGameScreen
          imgHero={logoLarge}
          title={`Nivel ${currentLevel}: ${config?.title}`}
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
          text="Pasaste todos los niveles, descarga tu eBook y accede al sorteo"
          btnText="Descargar eBook"
          onHandleClick={handleFinish}
        />
      )}
    </div>
  )
}

// // src/components/memotest/MemoTest.tsx
// /* eslint-disable @next/next/no-img-element */
// 'use client'
// import { useEffect, useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import useGameStore from '@/stores/memotest-state-store'
// import useMemotestConfigStore from '@/stores/memotest-config-store'
// import { useGameLevel } from '@/hooks/memotest/useGameLevel'

// import { useCloneCards } from '@/hooks/memotest/useClonedCards'
// import { useTapCards } from '@/hooks/memotest/useTapCards'
// import useSound from 'use-sound'
// import StateGameScreen from './StateGameScreen'

// import { STATE_MEMOTEST } from '@/lib/constants'
// import Image from 'next/image'

// export function MemoTest() {
//   const {
//     soundOn,
//     images,
//     sounds,
//     texts,
//     statesByLevel: GAME_LEVEL,
//   } = useMemotestConfigStore()

//   const { cardBack, logoLarge } = images

//   // Store de Zustand
//   const {
//     modeGame,
//     currentLevel,
//     completedLevels,
//     points,
//     startGame: startGameAction,
//     setNext,
//     setGaming,
//     finishGame,
//     resetGame,
//   } = useGameStore()

//   // Hook que determina qué nivel puede jugar según fechas
//   const { availableLevel, config, canPlay } = useGameLevel()

//   // Usar el nivel correcto para las cartas (availableLevel del hook)
//   const { clonedCards, sortCards } = useCloneCards({
//     imgCards: config?.imgCards || [],
//   })

//   const { selected, guessed, cardTaped, levelFinished } = useTapCards(
//     clonedCards.length,
//   )

//   const [confetti] = useSound(sounds.confetti)

//   // Refs para control de flujo
//   const hasInitialized = useRef(false)
//   const levelProcessedRef = useRef(false)
//   const router = useRouter()

//   // Efecto para inicialización
//   useEffect(() => {
//     if (completedLevels === 0 && availableLevel && !hasInitialized.current) {
//       hasInitialized.current = true
//       startGameAction(availableLevel) // Usar availableLevel del hook
//     }
//   }, [completedLevels, availableLevel, startGameAction])

//   // Efecto para manejar el progreso del juego
//   useEffect(() => {
//     if (
//       currentLevel >= 1 &&
//       levelFinished &&
//       !levelProcessedRef.current &&
//       modeGame === STATE_MEMOTEST.gaming
//     ) {
//       levelProcessedRef.current = true

//       // Al completar un nivel, currentLevel se vuelve completedLevels
//       const newCompletedLevel = currentLevel
//       const earnedPoints = points + GAME_LEVEL[currentLevel].points

//       if (currentLevel === Object.keys(GAME_LEVEL).length) {
//         // Último nivel - completar juego
//         setTimeout(() => {
//           setNext(newCompletedLevel, earnedPoints)
//           finishGame()
//           cardTaped(null)
//           if (soundOn) {
//             confetti()
//           }
//         }, 500)
//         return
//       }

//       // Nivel intermedio - pasar al siguiente
//       setTimeout(() => {
//         setNext(newCompletedLevel, earnedPoints)
//       }, 500)
//     }
//   }, [
//     levelFinished,
//     currentLevel,
//     points,
//     GAME_LEVEL,
//     soundOn,
//     confetti,
//     setNext,
//     finishGame,
//     cardTaped,
//     modeGame,
//   ])

//   // Reset del flag cuando cambia el nivel o modo
//   useEffect(() => {
//     levelProcessedRef.current = false
//   }, [currentLevel, modeGame])

//   // Handlers
//   function handleStart() {
//     if (availableLevel) {
//       startGameAction(availableLevel)
//       setGaming(GAME_LEVEL[availableLevel].seconds)
//       // No iniciar countdown automáticamente - se controla desde PanelFooter
//     }
//   }

//   function handleNextLevel() {
//     levelProcessedRef.current = false
//     if (availableLevel) {
//       // Al hacer clic en "siguiente nivel", empezar el nuevo nivel disponible
//       startGameAction(availableLevel)
//       setGaming(GAME_LEVEL[availableLevel].seconds)
//       // No iniciar countdown automáticamente - se controla desde PanelFooter
//       cardTaped(null)
//       sortCards()
//     }
//   }

//   function handleDefeat() {
//     hasInitialized.current = false
//     resetGame()
//     cardTaped(null)
//   }

//   function handleFinish() {
//     hasInitialized.current = false
//     resetGame()
//     cardTaped(null)
//     router.push('/memotest/progreso')
//   }

//   function handleTap(card: string) {
//     cardTaped(card)
//   }

//   // Si no puede jugar, no renderizar el juego
//   if (!canPlay || !availableLevel) {
//     return (
//       <div className="z-20 w-6/6 h-4/6 min-h-[420px] px-4 mt-10 mb-4 flex flex-col items-center justify-center">
//         <div className="text-center text-white">
//           <h2 className="text-2xl font-bold mb-4">Nivel no disponible</h2>
//           <p>Este nivel se activará pronto...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className="z-20 w-[90%] h-5/6 min-h-[420px] px-2 mt-6 mb-4
//           flex flex-col items-center
//           sm:w-4/6 sm:h-fit md:w-5/6 md:max-w-[700px] md:mt-20 lg:w-9/12 lg:max-w-[800px] lg:mt-10 xl:w-7/12 2xl:w-5/12 2xl:max-w-[700px] 2xl:mt-4 lg:px-10 xl:px-10 "
//     >
//       <ul className="w-full h-full grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-6 ">
//         {clonedCards.map((card: string) => {
//           const [, url] = card.split('|')
//           return (
//             <li
//               onClick={() => handleTap(card)}
//               key={card}
//               className={`wrapper-cards aspect-square min-w-14 min-h-14 lg:min-w-20 w-full h-auto p-0 border-solid border-2 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out
//                 md:p-4 lg:p-2
//                 ${
//                   selected.includes(card) || guessed.includes(card)
//                     ? ' flip-vertical border-none'
//                     : ' show-back '
//                 }`}
//               style={{
//                 background:
//                   selected.includes(card) || guessed.includes(card)
//                     ? '#0000'
//                     : 'linear-gradient(180deg, #6a9dd4 0%, #46688d 100%)',
//                 borderColor: '#78D3C6',
//               }}
//             >
//               <Image
//                 className="w-full h-auto card card-front rounded-[inherit]"
//                 fill
//                 src={url}
//                 alt="icon"
//               />
//               <Image
//                 className="w-full h-auto card card-back px-3 py-4 lg:px-4 lg:py-5 rounded-[inherit]"
//                 fill
//                 src={cardBack}
//                 alt="icon"
//               />
//             </li>
//           )
//         })}
//       </ul>

//       {modeGame === STATE_MEMOTEST.start && (
//         <StateGameScreen
//           imgHero={logoLarge}
//           title={`Nivel ${availableLevel}: ${config?.title}`}
//           text="Encuentra las coincidencias y desbloquea el nivel"
//           btnText={texts.buttonStartGame}
//           onHandleClick={handleStart}
//         />
//       )}

//       {modeGame === STATE_MEMOTEST.next && (
//         <StateGameScreen
//           imgHero={logoLarge}
//           title={`Nivel ${currentLevel}: ${config?.title}`}
//           text="Pasa al siguiente nivel"
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
//           imgHero={logoLarge}
//           title={texts.youWon}
//           text="Pasaste todos los niveles, descarga tu eBook y accede al sorteo"
//           // btnText={texts.buttonFinish}
//           btnText="Descargar eBook"
//           onHandleClick={handleFinish}
//         />
//       )}
//     </div>
//   )
// }
