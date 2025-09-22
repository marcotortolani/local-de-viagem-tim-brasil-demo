import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'

export type SidebarItem = {
  href?: string
  action?: () => void
  title: string
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  internalRoutes: SidebarInternalItem[]
}

export type SidebarInternalItem = {
  href?: string
  action?: () => void
  title: string
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}
