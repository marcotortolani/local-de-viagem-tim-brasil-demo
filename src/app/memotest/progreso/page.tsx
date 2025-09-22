// @/app/memotest/progreso/page.tsx

'use client'
import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ValidationContext } from '@/providers/validation-provider'
import useMemotestConfigStore from '@/stores/memotest-config-store'

import Subscribe from '@/components/subscribe/Subscribe'
import useGameStore from '@/stores/memotest-state-store'
import { submitData } from '@/app/actions/google-api'

export default function Page() {
  const { userEnabled, isValidationLoading } = useContext(ValidationContext)
  const [message, setMessage] = useState('')

  const {
    userHashID,
    currentLevel,
    challengeCompleted,
    resetProgress,
    resetGame,
  } = useGameStore()
  const { configByLevel, images } = useMemotestConfigStore()
  const { progressUnlocked } = images

  const handleResetProgress = () => {
    resetProgress()
    setMessage('Progreso borrado')
  }

  // Función para registrar la descarga del eBook
  const trackEbookDownload = async () => {
    if (!userHashID) {
      console.error('❌ No se pudo registrar la descarga del eBook')
      return
    }
    try {
      // Datos del usuario (ajusta según tu sistema)
      const downloadData = {
        hashID: userHashID,
        unlockedContent: 'ebook descargado',
      }

      // Enviar datos al Google Sheet
      const result = await submitData({
        hashID: downloadData.hashID || '',
        unlockedContent: downloadData.unlockedContent,
      })

      if (result.success) {
        console.log('✅ Descarga de eBook registrada:', result.message)
        setMessage('¡Descarga registrada!')

        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setMessage(''), 3000)
      } else {
        console.error('❌ Error al registrar descarga:', result.message)
      }
    } catch (error) {
      console.error('❌ Error registrando descarga del eBook:', error)
    }
  }

  useEffect(() => {
    resetGame()
  }, [])

  // Mostrar loading/skeleton mientras:
  // 1. Está cargando la validación
  // 2. O userEnabled aún es null/undefined (estado inicial)
  if (isValidationLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <span className="text-2xl text-white animate-pulse">Cargando...</span>
      </div>
    )
  }

  // Solo mostrar Subscribe cuando definitivamente userEnabled es false
  if (userEnabled === false && !isValidationLoading) {
    return (
      <div className="w-full h-full lg:pt-[2rem] bg-primary">
        <Subscribe />
      </div>
    )
  }

  // Solo mostrar el juego cuando definitivamente userEnabled es true
  if (userEnabled === true && !isValidationLoading) {
    return (
      <div
        className="  w-full h-[100svh] overflow-auto lg:mt-[3rem] flex flex-col items-center justify-between bg-[#1e5673]
      
       "
      >
        <div
          className="lg:hidden absolute top-0 z-0 w-full h-[25svh] min-h-60 sm:h-[40svh] lg:h-[45svh]"
          style={{ backgroundColor: configByLevel[currentLevel]?.bgColorApp }}
        >
          <Image
            className="lg:hidden w-full h-full object-cover absolute top-0 left-0 z-0"
            src="/memotest/img/progreso/memotest-inspirate-en-venezuela.webp"
            alt="background"
            width={0}
            height={0}
          />
          <div className=" absolute top-0 left-0 bg-gradient-to-b from-[#1e5673] to-transparent w-full h-1/2"></div>
          <div className=" absolute bottom-0 -mb-0.5 left-0 bg-gradient-to-t from-[#1e5673] to-transparent w-full h-1/2"></div>
        </div>
        <div
          className="hidden lg:block absolute top-0 -translate-y-0 z-0 w-full h-[25svh] min-h-60 sm:h-[30svh] lg:h-[35svh]  "
          style={{
            backgroundImage:
              "url('/memotest/img/progreso/memotest-inspirate-en-venezuela.webp')",
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center',
            // backgroundSize: 'auto', // o "contain" según necesites
            objectFit: 'cover',
          }}
        >
          <div className=" absolute top-0 left-0 bg-gradient-to-b from-[#1e5673] to-transparent w-full h-1/2 "></div>
          <div className=" absolute bottom-0 left-0 bg-gradient-to-t from-[#1e5673] to-transparent w-full h-1/2"></div>
        </div>
        <section className=" relative w-full  h-full pb-10 min-h-fit px-4 flex flex-col items-center justify-center gap-8">
          <div className="w-full">
            <h3 className=" font-oswald font-semibold text-3xl lg:text-4xl uppercase text-white text-center">
              {challengeCompleted ? '¡¡Felicidades!!' : 'Tu progreso'}
            </h3>
            {challengeCompleted ? (
              <p className=" font-oswald font-light text-xs text-white text-center uppercase">
                Desbloqueaste todas las pistas, ya puedes descargar el ebook.
              </p>
            ) : (
              <p className=" w-4/5 mx-auto mt-2 font-oswald font-light text-xs lg:text-base text-white text-center text-balance uppercase">
                Juega cada semana para desbloquear las pistas y poder descargar
                el ebook exclusivo.
              </p>
            )}
            {message && (
              <p className=" font-oswald font-normal text-sm text-red-500 text-center uppercase">
                {message}
              </p>
            )}
          </div>
          <div className=" w-full max-w-[500px] ">
            <Image
              className=" w-full aspect-square"
              src={
                challengeCompleted
                  ? progressUnlocked
                  : configByLevel[currentLevel]?.progressImage
              }
              alt="progress unlocked"
              width={200}
              height={200}
            />
          </div>
          {challengeCompleted && (
            <Link
              href="/docs/ebook-que_guay-inspirate_en_venezuela.pdf"
              onClick={trackEbookDownload}
              target="_blank"
              rel="noopener noreferrer"
              download={true}
              className=" relative px-6 py-3 overflow-hidden font-oswald uppercase font-medium text-white text-xl bg-[#00d5c8] hover:bg-[#00d5c8]/80 border-2 border-[#00d5c8] rounded-full"
            >
              <span className="relative z-20 ">Descubre el ebook</span>
              <div className="z-0 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900/40"></div>
            </Link>
          )}

          <div className="w-full max-w-md md:max-w-lg px-1 md:px-4 mt-4 flex items-center justify-between gap-4 ">
            <button
              type="button"
              onClick={handleResetProgress}
              className=" w-1/2 max-w-[220px] relative px-3 py-2 overflow-hidden font-oswald uppercase font-medium text-white text-base md:text-xl bg-red-500 hover:bg-red-600 border-2 border-red-500 rounded-full"
            >
              <span className="relative z-20 ">Borrar progreso</span>
              <div className="z-0 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900/40"></div>
            </button>

            <Link
              href="/memotest"
              className="w-1/2 max-w-[220px] relative px-3 py-2 overflow-hidden font-oswald uppercase font-medium text-center text-white text-base md:text-xl bg-sky-500 hover:bg-sky-600 border-2 border-sky-500 rounded-full"
            >
              <span className="relative z-20 ">Jugar Memotest</span>
              <div className="z-0 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900/40"></div>
            </Link>
          </div>
        </section>
      </div>
    )
  }
}
