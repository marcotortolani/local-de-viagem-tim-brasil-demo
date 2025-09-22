// @/providers/trial-provider.tsx

'use client'
import React, { createContext, useEffect, useState, useContext } from 'react'

import { ValidationContext } from '@/providers/validation-provider'
import { usePathname } from 'next/navigation'
import { getTrialValue, updateTrialValue } from '@/app/actions/auth'

import Subscribe from '@/components/subscribe/Subscribe'

const TrialContext = createContext({
  trialToken: 0,
  // updateTrialToken: () => {},
})

function TrialProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const { userEnabled } = useContext(ValidationContext)
  const [trialToken, setTrialToken] = useState(4)
  const [prevPath, setPrevPath] = useState('/')

  useEffect(() => {
    if (path !== prevPath && trialToken > 0 && !userEnabled) {
      updateTrialToken()
      setTrialToken((prev) => prev - 1)
      setPrevPath(path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  useEffect(() => {
    async function fetchTrialValue() {
      const value = await getTrialValue()

      if (value === null) return

      if (value > 0) {
        setTrialToken(value)
        updateTrialToken()
        return
      }

      setTrialToken(0)
    }
    fetchTrialValue()
  }, [])

  async function updateTrialToken() {
    const value = await getTrialValue()
    if (value === null) return
    if (value <= 0) return
    return await updateTrialValue(value - 1)
  }

  return (
    <TrialContext.Provider value={{ trialToken }}>
      {trialToken > 0 || userEnabled ? (
        children
      ) : (
        <div className=" bg-primary/60">
          <Subscribe />
        </div>
      )}
    </TrialContext.Provider>
  )
}

export { TrialContext, TrialProvider }

// @/providers/trial-provider.tsx

// 'use client'
// import React, { createContext, useEffect, useState, useContext } from 'react'

// import { ValidationContext } from '@/providers/validation-provider'
// import { usePathname } from 'next/navigation'
// import { getTrialValue, updateTrialValue } from '@/app/actions/auth'
// import { useAdditionalComponentsStore } from '@/lib/modules/additional-components/additional-components-store'
// import Subscribe from '@/components/subscribe/Subscribe'

// const TrialContext = createContext({
//   trialToken: 0,
//   updateTrialToken: () => {},
// })

// function TrialProvider({ children }: { children: React.ReactNode }) {
//   const { additionalConfig } = useAdditionalComponentsStore()
//   const path = usePathname()
//   const { userEnabled } = useContext(ValidationContext)
//   const [trialToken, setTrialToken] = useState(0)
//   const [prevPath, setPrevPath] = useState('/')

//   console.log(trialToken);

//   useEffect(() => {
//     if (!additionalConfig || !additionalConfig?.validatorActive) return
//     if (path !== prevPath && trialToken > 0 && !userEnabled) {
//       updateTrialToken()
//       setTrialToken((prev) => prev - 1)
//       setPrevPath(path)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [path])

//   useEffect(() => {
//     if (!additionalConfig || !additionalConfig?.validatorActive) return

//     async function fetchTrialValue() {
//       const value = await getTrialValue()
//       setTrialToken(value)
//       if (value > 0) {
//         updateTrialToken()
//       }
//     }
//     fetchTrialValue()
//   }, [])

//   async function updateTrialToken() {
//     const value = await getTrialValue()
//     return await updateTrialValue(value - 1)
//   }

//   if (additionalConfig && additionalConfig?.validatorActive) {
//     return (
//       <TrialContext.Provider value={{ trialToken, updateTrialToken }}>
//         {trialToken > 0 || userEnabled ? children : <Subscribe />}
//       </TrialContext.Provider>
//     )
//   }

//   return <>{children}</>
// }

// export { TrialContext, TrialProvider }
