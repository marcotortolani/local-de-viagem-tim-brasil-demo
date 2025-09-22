/* eslint-disable @typescript-eslint/no-explicit-any */
// @/app/memotest/page.tsx

'use client'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ValidationContext } from '@/providers/validation-provider'

import useMemotestConfigStore from '@/stores/memotest-config-store'
import { MemoTest } from '@/components/memotest/MemoTest'
import { PanelFooter } from '@/components/memotest/PanelFooter'
import Subscribe from '@/components/subscribe/Subscribe'
import useGameStore from '@/stores/memotest-state-store'

import { AlarmClockIcon, CalendarCheckIcon } from 'lucide-react'

// Componente para mostrar cuando el nivel no está disponible aún
function LevelNotAvailable({
  nextLevel,
  releaseDate,
  configByLevel,
  isNewUser = false,
}: {
  nextLevel: number
  releaseDate: string
  currentLevel: number
  configByLevel: any
  isNewUser?: boolean
}) {
  const [isAvailable, setIsAvailable] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date
      .toLocaleDateString('es-ES', {
        weekday: 'long',
        month: 'short',
        day: '2-digit',
      })
      .replace('de', '')
      .replace('del', '')
      .replace('la', '')
      .replace(',', '')
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const currentConfig = configByLevel[nextLevel] || configByLevel[1]

  return (
    <div
      className="w-screen min-w-[280px] h-[100svh] overflow-auto lg:mt-[5rem] flex flex-col items-center justify-center font-oswald font-bold"
      style={{ backgroundColor: currentConfig?.bgColorApp }}
    >
      <div
        className="absolute top-0 z-0 w-full h-[30svh] min-h-60 sm:h-[40svh] lg:h-[45svh]"
        style={{ backgroundColor: currentConfig?.bgColorApp }}
      >
        <Image
          className="lg:hidden w-full h-full object-cover absolute top-0 left-0 z-0"
          src={currentConfig?.bgImageHeaderMobile}
          alt="background"
          width={0}
          height={0}
        />
        <Image
          className="hidden lg:block w-full h-full object-cover absolute top-0 left-0 z-0"
          src={currentConfig?.bgImageHeaderDesktop}
          alt="background"
          width={0}
          height={0}
        />
      </div>

      <div className="z-10 w-5/6 max-w-md mx-auto p-4 py-6 flex flex-col items-center justify-center gap-4  bg-gradient-to-b from-[#48a0d8] via-[#48a0d8] to-[#3a88b9] outline outline-[6px] outline-white border-[6px] border-[#78d3c6] rounded-3xl shadow-lg shadow-black/30 text-center">
        <div className="w-5/6 mx-auto">
          <h2 className="text-3xl font-oswald font-semibold uppercase text-center text-balance text-white mb-2">
            {isNewUser ? 'Bienvenido al MemoTest' : '¡Felicitaciones!'}
          </h2>
          <p className="font-oswald font-extralight text-lg text-white">
            {isNewUser
              ? 'El primer nivel se activará pronto'
              : 'Completaste el nivel'}
          </p>
        </div>

        <div className=" w-full px-6 py-1 flex items-center justify-between gap-2 bg-white border-2 border-[#78d3c6] rounded-xl">
          <div className=" flex items-center gap-2">
            <CalendarCheckIcon className=" stroke-[#28c2ab]" />
            <p className="text-lg font-oswald uppercase font-normal text-neutral-600">
              {formatDate(releaseDate)}
            </p>
          </div>
          <div className=" flex items-center gap-2">
            <AlarmClockIcon className=" stroke-[#28c2ab]" />
            <p className="text-lg font-oswald uppercase font-normal text-neutral-600">
              {formatTime(releaseDate)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center ">
          <Image
            src={configByLevel[nextLevel]?.iconLevel}
            alt={`Icono ${configByLevel[nextLevel]?.title}`}
            width={60}
            height={60}
            className="mr-3"
          />
          <h3 className="text-xl font-oswald font-normal uppercase text-white">
            Nivel 0{nextLevel} - {configByLevel[nextLevel]?.title}
          </h3>
        </div>

        {/* Contador regresivo opcional */}
        <CountdownTimer
          releaseDate={releaseDate}
          onFinish={() => {
            setIsAvailable(true)
          }}
        />

        {isAvailable ? (
          <button
            onClick={() => window.location.reload()}
            className=" relative px-6 py-1 mt-2 overflow-hidden font-oswald uppercase font-medium text-white text-xl bg-[#00d5c8] hover:bg-[#00d5c8]/80 border-2 border-[#00d5c8] rounded-full"
          >
            <span className="relative z-20 ">Jugar</span>
            <div className="z-0 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900/40"></div>
          </button>
        ) : (
          <Link
            href="/memotest/progreso"
            className=" relative px-6 py-1 mt-2 overflow-hidden font-oswald uppercase font-medium text-white text-xl bg-[#00d5c8] hover:bg-[#00d5c8]/80 border-2 border-[#00d5c8] rounded-full"
          >
            <span className="relative z-20 ">Ver progreso</span>
            <div className="z-0 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900/40"></div>
          </Link>
        )}
      </div>
    </div>
  )
}

// Componente opcional para mostrar cuenta regresiva
function CountdownTimer({
  releaseDate,
  onFinish,
}: {
  releaseDate: string
  onFinish?: () => void
}) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(releaseDate).getTime() - new Date().getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      return null
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [releaseDate])

  useEffect(() => {
    if (
      timeLeft &&
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      onFinish?.()
    }
  }, [timeLeft, onFinish])

  if (!timeLeft) return null

  return (
    <div className=" w-full px-3 py-1.5 bg-[#78d3c6] border-2 border-white rounded-xl">
      <div className="grid grid-cols-4 gap-0 text-center">
        <div className=" border-r-2 border-neutral-800/50">
          <div className="text-3xl font-normal text-white">
            {timeLeft.days >= 10 ? timeLeft.days : `0${timeLeft.days}`}
          </div>
          <div className="font-light text-xs uppercase text-white">días</div>
        </div>

        <div className=" border-r-2 border-neutral-800/50">
          <div className="text-3xl font-normal text-white">
            {timeLeft.hours >= 10 ? timeLeft.hours : `0${timeLeft.hours}`}
          </div>
          <div className="font-light text-xs uppercase text-white">horas</div>
        </div>

        <div className=" border-r-2 border-neutral-800/50">
          <div className="text-3xl font-normal text-white">
            {timeLeft.minutes >= 10 ? timeLeft.minutes : `0${timeLeft.minutes}`}
          </div>
          <div className="font-light text-xs uppercase text-white">min</div>
        </div>

        <div>
          <div className="text-3xl font-normal text-white">
            {timeLeft.seconds >= 10 ? timeLeft.seconds : `0${timeLeft.seconds}`}
          </div>
          <div className="font-light text-xs uppercase text-white">seg</div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const { userEnabled, isValidationLoading } =
    useContext(ValidationContext)
  const { completedLevels } = useGameStore()
  const { configByLevel, releaseDatesByLevel } = useMemotestConfigStore()


  // Mostrar loading/skeleton mientras:
  // 1. Está cargando la validación
  // 2. O userEnabled aún es null/undefined (estado inicial)
  if (isValidationLoading) {
    return (
      <div className="w-screen min-w-[280px] h-[100svh] overflow-auto lg:mt-[5rem] flex flex-col items-center justify-between font-oswald font-bold">
        <MemoTestSkeleton />
        <PanelFooterSkeleton />
      </div>
    )
  }

  // Solo mostrar Subscribe cuando definitivamente userEnabled es false
  if (userEnabled === false) {
    return (
      <div className="w-full h-full lg:pt-[2rem] bg-primary">
        <Subscribe />
      </div>
    )
  }

  // Lógica para verificar disponibilidad de niveles
  const currentDate = new Date()

  // Determinar qué nivel debería estar jugando
  const getAvailableLevel = () => {
    // Si el usuario no ha empezado (level 0), puede empezar en nivel 1 si está disponible
    if (completedLevels === 0) {
      const level1ReleaseDate = new Date(releaseDatesByLevel[1])
      return currentDate >= level1ReleaseDate ? 1 : null
    }

    // Si ya completó un nivel, verificar si el siguiente está disponible
    const nextLevel = completedLevels + 1
    if (releaseDatesByLevel[nextLevel]) {
      const nextLevelReleaseDate = new Date(releaseDatesByLevel[nextLevel])

      // Si el siguiente nivel no está disponible aún, mostrar mensaje
      if (currentDate < nextLevelReleaseDate) {
        return 'waiting' // Estado especial para mostrar pantalla de espera
      }

      // Si está disponible, puede jugar el siguiente nivel
      return nextLevel
    }

    // Si no hay más niveles, puede rejugar el último nivel completado
    return completedLevels
  }

  const availableLevel = getAvailableLevel()

  // Si no hay nivel disponible (el nivel 1 aún no se ha liberado)
  if (availableLevel === null) {
    const level1ReleaseDate = releaseDatesByLevel[1]
    return (
      <LevelNotAvailable
        nextLevel={1}
        releaseDate={level1ReleaseDate}
        currentLevel={0}
        configByLevel={configByLevel}
        isNewUser={true} // Indicar que es usuario nuevo
      />
    )
  }

  // Si está esperando que se libere el siguiente nivel
  if (availableLevel === 'waiting') {
    const nextLevel = completedLevels + 1
    const nextLevelReleaseDate = releaseDatesByLevel[nextLevel]
    return (
      <LevelNotAvailable
        nextLevel={nextLevel}
        releaseDate={nextLevelReleaseDate}
        currentLevel={completedLevels}
        configByLevel={configByLevel}
        isNewUser={false} // No es usuario nuevo, ya completó niveles
      />
    )
  }

  // Usar el nivel disponible para la configuración
  const gameLevel = availableLevel
  const currentConfig = configByLevel[gameLevel]

  // Solo mostrar el juego cuando definitivamente userEnabled es true y hay nivel disponible
  if (userEnabled === true && availableLevel !== null) {
    return (
      <div
        className="w-screen min-w-[280px] h-[100svh] overflow-auto lg:mt-[5rem] flex flex-col items-center justify-between font-oswald font-bold"
        style={{ backgroundColor: currentConfig?.bgColorApp }}
      >
        <div
          className="absolute top-0 z-0 w-full h-[30svh] min-h-60 sm:h-[40svh] lg:h-[45svh]"
          style={{ backgroundColor: currentConfig?.bgColorApp }}
        >
          <Image
            className="lg:hidden w-full h-full object-cover absolute top-0 left-0 z-0"
            src={currentConfig?.bgImageHeaderMobile}
            alt="background"
            width={0}
            height={0}
          />
          <Image
            className="hidden lg:block w-full h-full object-cover absolute top-0 left-0 z-0"
            src={currentConfig?.bgImageHeaderDesktop}
            alt="background"
            width={0}
            height={0}
          />
        </div>
        <MemoTest />
        <PanelFooter />
      </div>
    )
  }
}

//Skeleton que imita la estructura del MemoTest
const MemoTestSkeleton = () => (
  <div
    className="z-20 w-[90%] h-5/6 min-h-[420px] px-2 mt-6 mb-4 
          flex flex-col items-center
          sm:w-4/6 sm:h-fit md:w-5/6 md:max-w-[700px] md:mt-20 lg:w-9/12 lg:max-w-[800px] lg:mt-10 xl:w-7/12 2xl:w-5/12 2xl:max-w-[700px] 2xl:mt-4 lg:px-10 xl:px-10 "
  >
    {/* Grid de cartas skeleton */}
    <div className="w-full h-full grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-6 animate-pulse">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="min-w-50 min-h-50 p-0 md:p-4 lg:p-2 bg-gray-200 rounded-xl"
          style={{ aspectRatio: '1/1', minWidth: '60px', minHeight: '60px' }}
        />
      ))}
    </div>
  </div>
)

//Skeleton que imita la estructura del PanelFooter
const PanelFooterSkeleton = () => (
  <div className="z-10 w-screen max-w-xl h-[10vh] min-h-[60px] max-h-[80px] mb-4 px-2 flex items-center justify-center">
    <div className="w-full min-w-[260px] h-full flex items-center justify-around border-2 border-gray-200 rounded-xl bg-gray-100 animate-pulse">
      {/* Level section */}
      <div className="w-2/12 h-full flex flex-col justify-center items-center">
        <div className="h-4 bg-gray-200 rounded w-12 mb-2" />
        <div className="h-8 bg-gray-200 rounded w-8" />
      </div>

      {/* Timer section */}
      <div className="w-3/12 h-full flex flex-col justify-center items-center">
        <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
        <div className="h-8 bg-gray-200 rounded w-20" />
      </div>

      {/* Points section */}
      <div className="w-5/12 h-full flex justify-center items-center">
        <div className="w-10 h-10 bg-gray-200 rounded mr-2" />
        <div className="h-8 bg-gray-200 rounded w-16" />
      </div>
    </div>
  </div>
)
