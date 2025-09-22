import { NextResponse } from 'next/server'

const ENDPOINT_ADDITIONAL_CONFIG =
  process.env.NEXT_PUBLIC_ENDPOINT_ADDITIONAL_COMPONENTS || ''

export async function POST() {
  try {
    const response = await fetch(ENDPOINT_ADDITIONAL_CONFIG)
    const data = await response.json()

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Permitir CORS
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: `${error} - Error al obtener los datos` },
      { status: 500 },
    )
  }
}
