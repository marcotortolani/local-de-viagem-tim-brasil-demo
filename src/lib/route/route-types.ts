import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'
import { SvgProps } from '@/components/icons'

export type RouteItem = {
  href: string
  action?: () => void
  title?: string
  internalRoutes?: RouteInternalItem[]
  Icon?: React.FC<SvgProps>
}

export type RouteInternalItem = {
  href?: string
  action?: () => void
  title: string
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}
