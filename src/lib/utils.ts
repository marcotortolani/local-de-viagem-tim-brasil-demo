// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { parse } from 'node-html-parser'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sanitizeContent = (content: string) => {
  if (!content)
    return 'Explora el mundo junto a nosotros. Descubre destinos, costumbres, sabores y consejos para viajar mejor. Acompáñanos en esta aventura y deja que cada historia te inspire a tu próxima travesía.'

  const root = parse(content.replaceAll('&nbsp;', ''))
  root
    .getElementsByTagName('p')

    .map((tag) => tag.setAttribute('style', 'margin-bottom:15px'))
  root
    .getElementsByTagName('img')
    .map((tag) =>
      tag.setAttribute(
        'style',
        'width:100%;margin-bottom:15px;border-radius:5px',
      ),
    )
  return root.toString()
}

export const formatNameTraveler = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Función para limpiar y extraer el contenido de <p>
export const getParagraphText = (text: string): string => {
  if (!text) return ''

  const root = parse(text)
  const p = root.querySelector('p')

  if (!p) return ''

  return p.text.trim()
}
