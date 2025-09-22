export const getAdditionalConfig = async () => {
  const res = await fetch('/api/additional-config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    console.log(
      `Endpoint Additional Config - Error ${res.status}: ${res.statusText}`,
    )
    return null
    // throw new Error(`Error ${res.status}: ${res.statusText}`)
  }

  return await res.json()
}
