// src/hooks/memotest/useGameLevel.ts

import { useMemo } from 'react'
import useGameStore from '@/stores/memotest-state-store'
import useMemotestConfigStore from '@/stores/memotest-config-store'

export function useGameLevel() {
  const { completedLevels } = useGameStore()
  const { releaseDatesByLevel, configByLevel } = useMemotestConfigStore()

  const availableLevel = useMemo(() => {
    const currentDate = new Date()

    // Si el usuario no ha completado ningún nivel, puede empezar en nivel 1 si está disponible
    if (completedLevels === 0) {
      const level1ReleaseDate = new Date(releaseDatesByLevel[1])
      return currentDate >= level1ReleaseDate ? 1 : null
    }

    // Si ya completó niveles, verificar si el siguiente está disponible
    const nextLevel = completedLevels + 1
    if (releaseDatesByLevel[nextLevel]) {
      const nextLevelReleaseDate = new Date(releaseDatesByLevel[nextLevel])

      // Si el siguiente nivel no está disponible aún, puede rejugar el último completado
      if (currentDate < nextLevelReleaseDate) {
        return completedLevels
      }

      // Si está disponible, puede jugar el siguiente nivel
      return nextLevel
    }

    // Si no hay más niveles, puede rejugar el último nivel completado
    return completedLevels
  }, [completedLevels, releaseDatesByLevel])

  const isLevelAvailable = (checkLevel: number) => {
    if (!releaseDatesByLevel[checkLevel]) return false
    const releaseDate = new Date(releaseDatesByLevel[checkLevel])
    return new Date() >= releaseDate
  }

  const getNextLevelInfo = () => {
    const nextLevel = completedLevels + 1
    if (releaseDatesByLevel[nextLevel]) {
      return {
        level: nextLevel,
        title: configByLevel[nextLevel]?.title,
        releaseDate: releaseDatesByLevel[nextLevel],
        isAvailable: isLevelAvailable(nextLevel),
      }
    }
    return null
  }

  // Función para obtener un nivel válido para la configuración
  const getConfigLevel = () => {
    // Si availableLevel es null, usar el último nivel completado o defaultear a 1
    if (availableLevel === null) {
      return completedLevels > 0 ? completedLevels : 1
    }
    return availableLevel
  }

  const configLevel = getConfigLevel()

  return {
    completedLevels, // Niveles que el usuario ha completado
    availableLevel, // Nivel que puede jugar ahora (null si ninguno disponible)
    isLevelAvailable,
    nextLevelInfo: getNextLevelInfo(),
    config: configByLevel[configLevel],
    // Propiedades adicionales útiles
    canPlay: availableLevel !== null,
    isWaitingForRelease: availableLevel === null,
    isPlayingNewLevel:
      availableLevel !== null && availableLevel > completedLevels, // True si está jugando un nivel nuevo
    isReplayingLevel:
      availableLevel !== null && availableLevel <= completedLevels, // True si está rejugando
  }
}
