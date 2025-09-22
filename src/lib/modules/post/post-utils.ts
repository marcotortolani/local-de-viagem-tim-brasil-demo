import { Category, Post } from '@/lib/api/wp/wp-types'


export const mergePostCategories = (posts: Post[] = [], categories: Category[] = []) => {

  return posts.map((item) => ({
    ...item,
    full_categories: categories.filter((category) => item.categories.includes(category.id as number)),
  }))
}