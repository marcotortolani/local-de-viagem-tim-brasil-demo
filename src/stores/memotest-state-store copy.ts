// src/stores/memotest-store.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STATE_MEMOTEST } from '@/lib/constants'

type State = {
  modeGame: string
  level: number
  countdown: number
  points: number
  challengeCompleted: boolean
  startGame: () => void
  setGaming: (countdown: number) => void
  setNext: (level: number, points: number) => void
  setDefeat: (level: number, points: number, countdown: number) => void
  finishGame: () => void
  resetGame: () => void
  resetProgress: () => void // Nueva acción para resetear solo el progreso
}

const useGameStore = create<State>()(
  persist(
    (set) => ({
      // Estado inicial
      modeGame: STATE_MEMOTEST.start,
      level: 0,
      countdown: 0,
      points: 0,
      challengeCompleted: false,

      // Acciones
      startGame: () =>
        set(() => ({
          modeGame: STATE_MEMOTEST.start,
        })),

      setGaming: (countdown: number) =>
        set(() => ({
          modeGame: STATE_MEMOTEST.gaming,
          countdown,
        })),

      setNext: (level: number, points: number) =>
        set(() => ({
          modeGame: STATE_MEMOTEST.next,
          level,
          points,
          countdown: 0,
        })),

      setDefeat: (level: number, points: number, countdown: number) =>
        set(() => ({
          modeGame: STATE_MEMOTEST.defeat,
          level,
          points,
          countdown,
        })),

      finishGame: () =>
        set(() => ({
          modeGame: STATE_MEMOTEST.finish,
        })),

      // Resetear el juego manteniendo el progreso
      resetGame: () =>
        set(() => ({
          modeGame: STATE_MEMOTEST.start,
          countdown: 0,
          // Mantiene level y points del estado persistido
        })),

      // Nueva acción para resetear completamente el progreso
      resetProgress: () =>
        set(() => ({
          modeGame: STATE_MEMOTEST.start,
          level: 0,
          countdown: 0,
          points: 0,
        })),
    }),
    {
      name: 'memotest-game-progress', // nombre para localStorage
      partialize: (state) => ({
        level: state.level,
        points: state.points,
        // Solo persiste level y points, no modeGame ni countdown
      }),
      // Opcional: versión para migraciones futuras
      version: 1,
    },
  ),
)

export default useGameStore

// // src/stores/memotest-store.ts

// import { create } from 'zustand'
// import { STATE_MEMOTEST } from '@/lib/constants'

// type State = {
//   modeGame: string
//   level: number
//   countdown: number
//   points: number
//   startGame: () => void
//   setGaming: (countdown: number) => void
//   setNext: (level: number, points: number) => void
//   setDefeat: (level: number, points: number, countdown: number) => void
//   finishGame: () => void
//   resetGame: () => void
// }

// const useGameStore = create<State>((set) => ({
//   // Estado inicial
//   modeGame: STATE_MEMOTEST.start,
//   level: 0,
//   countdown: 0,
//   points: 0,

//   // Acciones
//   startGame: () =>
//     set(() => ({
//       modeGame: STATE_MEMOTEST.start,
//     })),

//   setGaming: (countdown: number) =>
//     set(() => ({
//       modeGame: STATE_MEMOTEST.gaming,
//       countdown,
//     })),

//   setNext: (level: number, points: number) =>
//     set(() => ({
//       modeGame: STATE_MEMOTEST.next,
//       level,
//       points,
//       countdown: 0,
//     })),

//   setDefeat: (level: number, points: number, countdown: number) =>
//     set(() => ({
//       modeGame: STATE_MEMOTEST.defeat,
//       level,
//       points,
//       countdown,
//     })),

//   finishGame: () =>
//     set(() => ({
//       modeGame: STATE_MEMOTEST.finish,
//     })),

//   // Acción para resetear el juego al estado inicial
//   resetGame: () =>
//     set(() => ({
//       modeGame: STATE_MEMOTEST.start,
//       level: 0,
//       countdown: 0,
//       points: 0,
//     })),
// }))

// export default useGameStore
