// src/stores/memotest-store.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STATE_MEMOTEST } from '@/lib/constants'

type State = {
  userHashID: string
  modeGame: string
  completedLevels: number // Niveles que el usuario ha completado (progreso guardado)
  currentLevel: number // Nivel que está jugando actualmente (temporal)
  countdown: number
  points: number
  challengeCompleted: boolean

  // Acciones
  setUserHashID: (hashID: string) => void
  startGame: (levelToPlay: number) => void
  setGaming: (countdown: number) => void
  setNext: (completedLevel: number, points: number) => void
  setDefeat: (currentLevel: number, points: number, countdown: number) => void
  finishGame: () => void
  resetGame: () => void
  resetProgress: () => void
}

const useGameStore = create<State>()(
  persist(
    (set, get) => ({
      // Estado inicial
      userHashID: '',
      modeGame: STATE_MEMOTEST.start,
      completedLevels: 0, // Progreso persistente: niveles completados
      currentLevel: 1, // Nivel temporal: el que está jugando ahora
      countdown: 0,
      points: 0,
      challengeCompleted: false,

      // Acciones
      setUserHashID: (userHashID: string) => set(() => ({ userHashID })),
      startGame: (levelToPlay: number) =>
        set(() => ({
          modeGame: STATE_MEMOTEST.start,
          currentLevel: levelToPlay,
        })),

      setGaming: (countdown: number) =>
        set(() => ({
          modeGame: STATE_MEMOTEST.gaming,
          countdown,
        })),

      setNext: (completedLevel: number, points: number) =>
        set(() => ({
          modeGame: STATE_MEMOTEST.next,
          completedLevels: Math.max(get().completedLevels, completedLevel), // Solo incrementa, nunca decrementa
          currentLevel: completedLevel,
          points,
          countdown: 0,
        })),

      setDefeat: (currentLevel: number, points: number, countdown: number) =>
        set(() => ({
          modeGame: STATE_MEMOTEST.defeat,
          currentLevel,
          points,
          countdown,
        })),

      finishGame: () =>
        set(() => ({
          modeGame: STATE_MEMOTEST.finish,
          challengeCompleted: true,
        })),

      // Resetear el juego manteniendo el progreso
      resetGame: () =>
        set((state) => ({
          modeGame: STATE_MEMOTEST.start,
          currentLevel: Math.max(1, state.completedLevels + 1), // Próximo nivel disponible
          countdown: 0,
          // Mantiene completedLevels y points del estado persistido
        })),

      // Nueva acción para resetear completamente el progreso
      resetProgress: () =>
        set(() => ({
          modeGame: STATE_MEMOTEST.start,
          completedLevels: 0,
          currentLevel: 1,
          countdown: 0,
          points: 0,
          challengeCompleted: false,
        })),
    }),
    {
      name: 'memotest-game-progress',
      partialize: (state) => ({
        completedLevels: state.completedLevels, // Solo persiste el progreso real
        points: state.points,
        challengeCompleted: state.challengeCompleted,
      }),
      version: 1,
    },
  ),
)

export default useGameStore
