// create a zustand store with fetching data to an env variable

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PREFIX_PERSIST_STORE } from '@/lib/constants'
import {
  AdditionalComponentsStore,
  AdditionalConfigType,
} from './additional-components-types'

export const useAdditionalComponentsStore = create(
  persist<AdditionalComponentsStore>(
    (set) => ({
      show: false,
      additionalConfig: {} as AdditionalConfigType,
      setShow: (show: boolean) => set({ show }),
      setAdditionalConfig: (additionalConfig: AdditionalConfigType) =>
        set({ additionalConfig }),
    }),

    {
      name: `${PREFIX_PERSIST_STORE}_additionalComponents`,
    },
  ),
)
