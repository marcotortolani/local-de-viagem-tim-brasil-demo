'use client'
import React from 'react'

type TitleProps = {
  children: React.ReactNode
  color?: string
}

export const SectionTitle: React.FC<TitleProps> = ({
  children,
  color = 'text-white',
}) => {
  return (
    <h3
      className={`${color} font-poppins text-base md:text-xl font-medium my-2`}
    >
      {children}
    </h3>
  )
}
