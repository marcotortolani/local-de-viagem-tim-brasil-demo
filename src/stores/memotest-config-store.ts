/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/memotest-config-store.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import data from '@/data/memotest-config.json'

type ConfigState = {
  // Estado
  isLoading: boolean
  soundOn: boolean
  configData: typeof data
  validPeriod: any
  colors: any
  images: any
  sounds: any
  statesByLevel: any
  texts: any
  configByLevel: any
  releaseDatesByLevel: any

  // Acciones
  setSoundOn: (soundOn: boolean) => void
}

const useMemotestConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      // Estado inicial
      isLoading: true,
      soundOn: false,
      configData: data,
      validPeriod: data.validPeriod,
      colors: data.colors,
      images: data.images,
      sounds: data.sounds,
      statesByLevel: data.statesByLevel,
      texts: data.textsByLang.es,
      configByLevel: data.configByLevel,
      releaseDatesByLevel: data.releaseDatesByLevel,

      // Acciones
      setSoundOn: (soundOn: boolean) => {
        set({ soundOn })
      },
    }),
    {
      name: 'qgv-mov-ven-memotest-config-storage', // nombre para localStorage
      partialize: (state) => ({
        soundOn: state.soundOn, // solo persiste soundOn en localStorage
      }),
    },
  ),
)

export default useMemotestConfigStore
