'use client'
import React from 'react'

type Props = { src: string, width: number, quality: number }

const LoadingImage: React.FC<Props> = ({ src, quality, width }) => {
  return `${src}?w=${width}&q=${quality || 75}`

}

export default LoadingImage