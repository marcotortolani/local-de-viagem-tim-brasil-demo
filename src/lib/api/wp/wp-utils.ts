import { Post } from '@/lib/api/wp/wp-types'

export const wpImage = (post: Post | undefined) => {
  if (!post) return undefined
  return post.featured_image &&
    Array.isArray(post.featured_image) &&
    post.featured_image.length
    ? post.featured_image[0]
    : undefined
}
