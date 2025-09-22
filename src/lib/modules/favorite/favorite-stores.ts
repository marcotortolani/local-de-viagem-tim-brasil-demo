import { create } from 'zustand/index'
import { FavoriteStore } from '@/lib/modules/favorite/favorite-types'
import { persist } from 'zustand/middleware'
import { PREFIX_PERSIST_STORE } from '@/lib/constants'

export const useFavoriteStore = create(
  persist<FavoriteStore>(
    (set) => ({
      videos: [],
      editorial: [],
      shorts: [],
      addVideo: (id: number) =>
        set((state) => ({
          videos: !state.videos.includes(id)
            ? [...state.videos, id]
            : state.videos,
        })),
      removeVideo: (id: number) => {
        set((state) => ({
          videos: [
            ...(state.videos = state.videos.filter((_id) => _id !== id)),
          ],
        }))
      },
      addEditorial: (id: number) =>
        set((state) => ({
          editorial: !state.editorial.includes(id)
            ? [...state.editorial, id]
            : state.editorial,
        })),
      removeEditorial: (id: number) => {
        set((state) => ({
          editorial: [
            ...(state.editorial = state.editorial.filter((_id) => _id !== id)),
          ],
        }))
      },
      addShort: (id: number) =>
        set((state) => ({
          shorts: !state.shorts.includes(id)
            ? [...state.shorts, id]
            : state.shorts,
        })),
      removeShort: (id: number) => {
        set((state) => ({
          shorts: [
            ...(state.shorts = state.shorts.filter((_id) => _id !== id)),
          ],
        }))
      },
    }),
    {
      name: `${PREFIX_PERSIST_STORE}_favorites`,
    },
  ),
)
