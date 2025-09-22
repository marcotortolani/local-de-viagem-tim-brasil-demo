export type Favorite = {
  id: number
}
export type FavoriteStore = {
  videos: number[]
  editorial: number[]
  shorts: number[]
  addVideo: (id: number) => void
  removeVideo: (id: number) => void
  addEditorial: (id: number) => void
  removeEditorial: (id: number) => void
  addShort: (id: number) => void
  removeShort: (id: number) => void
}
