import React from 'react'
import { SvgProps } from '@/components/icons'

export type MenuItem = {
  href?: string
  action?: () => void
  title: string
  Icon: React.FC<SvgProps>
}

export type MenuPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'
