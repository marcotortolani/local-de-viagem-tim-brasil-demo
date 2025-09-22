'use server'

import {
  Category,
  CategoryParams,
  Post,
  PostParams,
  Tag,
  TagParams,
} from '@/lib/api/wp/wp-types'
import { REVALIDATE, WP_BACKEND } from '@/lib/constants'

export const getWpCategories = async (
  params: CategoryParams = {},
): Promise<{ categories: Category[]; totalPages: number }> => {
  const url = new URL(`${WP_BACKEND}/wp-json/wp/v2/categories`)

  Object.keys(params).forEach((key) => {
    url.searchParams.set(
      key,
      params[key as keyof CategoryParams]?.toString() as string,
    )
  })

  const response = await fetch(`${url}`, {
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: REVALIDATE,
    },
  })

  const totalPages = response.headers.get('X-WP-TotalPages')
    ? response.headers.get('X-WP-TotalPages')
    : 0

  const categories = await response.json()

  return {
    categories,
    totalPages: Number(totalPages),
  }
}

export const getWpPosts = async (
  params: PostParams = {},
): Promise<{ posts: Post[]; totalPages: number }> => {
  const url = new URL(`${WP_BACKEND}/wp-json/wp/v2/posts`)

  Object.keys(params).forEach((key) => {
    url.searchParams.set(
      key,
      params[key as keyof PostParams]?.toString() as string,
    )
  })

  const response = await fetch(`${url}`, {
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: REVALIDATE,
    },
  })

  const totalPages = response.headers.get('X-WP-TotalPages')
    ? response.headers.get('X-WP-TotalPages')
    : 0

  const posts = await response.json()

  return {
    posts,
    totalPages: Number(totalPages),
  }
}

export const getWpTags = async (params: TagParams = {}): Promise<Tag[]> => {
  const url = new URL(`${WP_BACKEND}/wp-json/wp/v2/tags`)

  Object.keys(params).forEach((key) => {
    url.searchParams.set(
      key,
      params[key as keyof TagParams]?.toString() as string,
    )
  })

  const response = await fetch(`${url}`, {
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: REVALIDATE,
    },
  })

  return await response.json()
}
