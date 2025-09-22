// src/hooks/memotest/useCountDown.ts

import { useState, useEffect, useRef, useCallback } from 'react'

export function useCountdown(initialSeconds = 0) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initialTimeRef = useRef(0)

  // Función para inicializar el countdown (sin comenzar)
  const initializeCountdown = useCallback((seconds: number) => {
    setSecondsLeft(seconds)
    initialTimeRef.current = seconds
    setIsRunning(false)
    setIsPaused(false)

    // Limpiar cualquier intervalo existente
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Función para comenzar el countdown
  const startCountdown = useCallback(() => {
    if (secondsLeft > 0 && !isRunning) {
      setIsRunning(true)
      setIsPaused(false)
    }
  }, [secondsLeft, isRunning])

  // Función para pausar el countdown
  const pauseCountdown = useCallback(() => {
    setIsRunning(false)
    setIsPaused(true)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Función para reanudar el countdown
  const resumeCountdown = useCallback(() => {
    if (isPaused && secondsLeft > 0) {
      setIsRunning(true)
      setIsPaused(false)
    }
  }, [isPaused, secondsLeft])

  // Función para resetear el countdown
  const resetCountdown = useCallback(() => {
    setSecondsLeft(initialTimeRef.current)
    setIsRunning(false)
    setIsPaused(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Función para detener completamente el countdown
  const stopCountdown = useCallback(() => {
    setSecondsLeft(0)
    setIsRunning(false)
    setIsPaused(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Función para agregar tiempo
  const addTime = useCallback((seconds: number) => {
    setSecondsLeft((prev) => Math.max(0, prev + seconds))
  }, [])

  // Effect para manejar el intervalo
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, secondsLeft])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Calcular minutos y segundos
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  // Calcular progreso (0-100%)
  const progress =
    initialTimeRef.current > 0
      ? ((initialTimeRef.current - secondsLeft) / initialTimeRef.current) * 100
      : 0

  return {
    // Estado
    secondsLeft,
    minutes,
    seconds,
    isRunning,
    isPaused,
    isFinished: secondsLeft === 0,
    progress,
    initialTime: initialTimeRef.current,

    // Controles
    initializeCountdown,
    startCountdown,
    pauseCountdown,
    resumeCountdown,
    resetCountdown,
    stopCountdown,
    addTime,
  }
}

// // src/hooks/memotest/useCountDown.ts

// import { useState, useEffect } from 'react'

// export function useCountdown(initialSeconds = 0) {
//   const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds)

//   useEffect(() => {
//     if (secondsLeft <= 0) return

//     const timeout = setTimeout(() => {
//       setSecondsLeft((prev) => prev - 1)
//     }, 1000)
//     return () => clearTimeout(timeout)
//   }, [secondsLeft])

//   function startCountdown(seconds = 0) {
//     setSecondsLeft(seconds)
//   }

//   return { secondsLeft, startCountdown }
// }
