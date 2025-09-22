export type CategoryParams = {
  parent?: number | number[]
  slug?: string
  name?: string
  description?: string
  include?: string
  per_page?: number
  page?: number
}

export type Category = {
  id?: number
  parent: number
  description?: string
  name?: string
  slug?: string
  image?: string
  featured?: boolean
}

export type Post = {
  id?: number
  date?: string
  date_gmt?: string
  slug?: string
  title?: {
    rendered: string
  }
  content?: {
    rendered: string
  }
  excerpt?: {
    rendered: string
  }
  video: {
    url: string
    post_video_type: 'short' | 'normal'
  }
  featured_image: [string, number, number, boolean]
  full_categories: Category[]
  categories: number[]
  tags: number[]
  class_list?: string[]
}

export type PostParams = {
  categories?: string
  slug?: string
  include?: string
  exclude?: string
  search?: string
  per_page?: number
  offset?: number
  tags?: string
}

export type TagParams = {
  parent?: number | number[]
  slug?: string
  name?: string
  description?: string
  include?: string
  per_page?: number
  page?: number
  offset?: number
}

export type Tag = {
  id?: number
  description?: string
  name?: string
  slug?: string
}
