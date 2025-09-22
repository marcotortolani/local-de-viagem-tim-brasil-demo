'use server'
import { NextRequest, NextResponse } from 'next/server'

const ENDPOINT_CREATE_USER = process.env.ENDPOINT_CREATE_USER || ''

export async function POST(req: NextRequest) {
  try {
    const { game_user_id } = await req.json()
    const response = await fetch(ENDPOINT_CREATE_USER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_user_id,
      }),
    })
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
