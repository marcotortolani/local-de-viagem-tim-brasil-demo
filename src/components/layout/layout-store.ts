import { create } from 'zustand/index'
import {
  LayoutSidebarActionStore,
  LayoutSidebarStore,
} from '@/components/layout/layout-types'

export const useLayoutSidebarStore = create<
  LayoutSidebarStore & LayoutSidebarActionStore
>((set) => ({
  open: false,
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
}))
