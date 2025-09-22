import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  QUATERNARY_COLOR,
} from '@/lib/constants'

export const getCategoryColor = (categories: number[] = []) => {
  if (categories.includes(20)) return PRIMARY_COLOR
  if (categories.includes(21)) return QUATERNARY_COLOR
  if (categories.includes(22)) return TERTIARY_COLOR
  if (categories.includes(23)) return SECONDARY_COLOR

  return PRIMARY_COLOR
}
