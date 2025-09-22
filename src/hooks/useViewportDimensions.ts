// src/hooks/useViewportDimensions.ts
import { useState, useEffect } from 'react'

interface ViewportDimensions {
  width: number
  height: number
  availableHeight: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const useViewportDimensions = (): ViewportDimensions => {
  const [dimensions, setDimensions] = useState<ViewportDimensions>({
    width: 0,
    height: 0,
    availableHeight: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    const calculateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Detectar tipo de dispositivo
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024

      // Calcular alturas de elementos fijos
      let headerHeight = 0
      let mobileNavHeight = 0

      // Header heights basado en tu CSS
      if (isMobile) {
        headerHeight = 64 // Altura típica de header móvil
      } else if (isTablet) {
        headerHeight = 80 // Altura típica de header tablet
      } else {
        headerHeight = 96 // 6rem = 96px para desktop
      }

      // Navegación móvil (solo en móvil)
      if (isMobile) {
        mobileNavHeight = 48 // 3rem = 48px según tu CSS (pb-[3rem])
      }

      // Altura disponible para el contenido
      const availableHeight = height - headerHeight - mobileNavHeight

      setDimensions({
        width,
        height,
        availableHeight,
        isMobile,
        isTablet,
        isDesktop,
      })
    }

    // Calcular inicialmente
    calculateDimensions()

    // Recalcular en resize
    window.addEventListener('resize', calculateDimensions)

    // Recalcular en orientación (importante para móviles)
    window.addEventListener('orientationchange', () => {
      // Delay para esperar que el viewport se ajuste
      setTimeout(calculateDimensions, 100)
    })

    return () => {
      window.removeEventListener('resize', calculateDimensions)
      window.removeEventListener('orientationchange', calculateDimensions)
    }
  }, [])

  return dimensions
}
