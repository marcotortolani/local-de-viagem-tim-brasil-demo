// @/providers/validation-provider.tsx
'use client'
import { createContext, useEffect, useState } from 'react'
import { validateUser } from '@/app/actions/auth'
import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'
import useGameStore from '@/stores/memotest-state-store'

const ValidationContext = createContext({
  userEnabled: null as boolean | null,
  userID: '',
  isValidationLoading: true, // Agregamos estado de loading
})

function ValidationProvider({ children }: { children: React.ReactNode }) {
  const { additionalConfig } = useAdditionalComponentsStore()
  const [userEnabled, setUserEnabled] = useState<boolean | null>(null)
  const [userID, setUserID] = useState<string>('')
  const { setUserHashID } = useGameStore()
  const [isValidationLoading, setIsValidationLoading] = useState(true)

  const getParamHashID = () => {
    if (typeof window === 'undefined') return ''
    return window.location.href.split('/?')[1] || ''
  }

  useEffect(() => {
    const initValidation = async () => {
      // Si el validador no está activo, no hacer nada
      if (!additionalConfig || !additionalConfig?.validatorActive) {
        setIsValidationLoading(false)
        return
      }

      try {
        const hashID = getParamHashID()
        const res = await validateUser(hashID)
        setUserEnabled(res.userSubscribed)
        setUserID(res.hashID || '')
        setUserHashID(res.hashID || '')
      } catch (error) {
        console.error('Error validating user:', error)
        // En caso de error, asumir usuario no habilitado
        setUserEnabled(false)
        setUserID('')
        setUserHashID('')
      } finally {
        setIsValidationLoading(false)
      }
    }

    initValidation()
  }, [additionalConfig])

  if (additionalConfig && additionalConfig?.validatorActive) {
    return (
      <ValidationContext.Provider
        value={{ userEnabled, userID, isValidationLoading }}
      >
        {children}
      </ValidationContext.Provider>
    )
  }

  // Si el validador no está activo, renderizar directamente sin loading
  return <>{children}</>
}

export { ValidationContext, ValidationProvider }

// @/providers/validation-provider.tsx

// 'use client'
// import { createContext, useEffect, useState } from 'react'
// import { validateUser } from '@/app/actions/auth'
// import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'

// const ValidationContext = createContext({ userEnabled: false, userID: '' })

// function ValidationProvider({ children }: { children: React.ReactNode }) {
//   const { additionalConfig } = useAdditionalComponentsStore()
//   const [userEnabled, setUserEnabled] = useState(false)
//   const [userID, setUserID] = useState<string>('')

//   console.log(userEnabled);

//   const getParamHashID = () => {
//     if (typeof window === 'undefined') return
//     return window.location.href.split('/?')[1]
//   }

//   useEffect(() => {
//     const hashID = getParamHashID() || ''

//     validateUser(hashID).then((res) => {
//       setUserEnabled(res.userSubscribed)
//       setUserID(res.hashID || '')
//     })
//   }, [])

//   if (additionalConfig && additionalConfig?.validatorActive) {
//     return (
//       <ValidationContext.Provider value={{ userEnabled, userID }}>
//         {children}
//       </ValidationContext.Provider>
//     )
//   }

//   return <>{children}</>
// }

// export { ValidationContext, ValidationProvider }
