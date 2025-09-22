'use client'
import React from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  
  return (
    <div
      className={cn(
        'container mx-auto px-3 pb-8 md:pb-16 xl:max-w-screen-xl min-h-screen',
        className,
      )}
    >
      {children}
    </div>
  )
}
