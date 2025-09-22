'use server'
import { cookies } from 'next/headers'
import NextCrypto from 'next-crypto'
import { PREFIX_PERSIST_STORE } from '@/lib/constants'

const ENDPOINT_VALIDATION_HASH = process.env.ENDPOINT_VALIDATION_HASH

const cryptoUser = new NextCrypto('user enabled')
const cryptoTrial = new NextCrypto('trial')

export async function validateUser(hashID: string) {
  const cookieStore = await cookies()

  // Lógica para verificar usuario existente y trial
  const userExist = cookieStore.get(`enabledUser-${PREFIX_PERSIST_STORE}`)
  const trial = cookieStore.get(`trial-${PREFIX_PERSIST_STORE}`)

  if (!userExist && !trial) {
    await createTrialToken(3)
  }

  if (hashID.length > 0) {
    const userIsAuth = await getValidationEndpoint(hashID)
    await createToken({ authValue: userIsAuth, hash: hashID })
  } else {
    const storedHashID = await getHashID()

    if (storedHashID) {
      const userIsAuth = await getValidationEndpoint(storedHashID)
      await createToken({ authValue: userIsAuth, hash: storedHashID })
    } else {
      await createToken({ authValue: false, hash: '' })
    }
  }

  // Revisar si el usuario está activo
  const activeUser = cookieStore.get(`enabledUser-${PREFIX_PERSIST_STORE}`)
  const id = await getHashID()

  if (activeUser && (await cryptoUser.decrypt(activeUser.value)) === 'true') {
    return { userSubscribed: true, hashID: id }
  }

  return { userSubscribed: false, hashID: id }
}

export async function getHashID() {
  const cookieStore = await cookies()
  const hashID = cookieStore.get(`hashID-${PREFIX_PERSIST_STORE}`)

  if (hashID) {
    return hashID.value // Retornar el valor de la cookie
  } else {
    return null // O cualquier valor que decida manejar en caso de que la cookie no exista
  }
}

async function getValidationEndpoint(hashID: string) {
  const res = await fetch(ENDPOINT_VALIDATION_HASH + hashID)
  const data = await res.json()  

  return data.success && data.isValid
}

async function createToken({
  authValue,
  hash,
}: {
  authValue: boolean
  hash: string
}) {
  const cookieStore = await cookies()
  const encryptedAuth = await cryptoUser.encrypt(String(authValue ?? false))
  cookieStore.set(`enabledUser-${PREFIX_PERSIST_STORE}`, encryptedAuth, {
    httpOnly: false,
    secure: false,
    path: '/',
  })
  cookieStore.set(`hashID-${PREFIX_PERSIST_STORE}`, hash, {
    httpOnly: false,
    secure: false,
    path: '/',
  })
}

async function createTrialToken(trialValue: number) {
  const cookieStore = await cookies()
  const encryptedTrial = await cryptoTrial.encrypt(trialValue.toString())
  cookieStore.set(`trial-${PREFIX_PERSIST_STORE}`, encryptedTrial, {
    httpOnly: false,
    secure: false,
  })
}

export async function getTrialValue() {
  const cookieStore = await cookies()
  const trial = cookieStore.get(`trial-${PREFIX_PERSIST_STORE}`)
  
  if (trial) {
    const decryptedValue = await cryptoTrial.decrypt(trial.value)
    return parseInt(decryptedValue || '0', 10)
  }

  return null
  // return 0
}

export async function updateTrialValue(newValue: number) {
  const cookieStore = await cookies()
  const encryptedTrial = await cryptoTrial.encrypt(newValue.toString())
  cookieStore.set(`trial-${PREFIX_PERSIST_STORE}`, encryptedTrial, {
    httpOnly: false,
    secure: false,
    maxAge: 60 * 60 * 24 * 10, // 10 días
  })
  return newValue
}
