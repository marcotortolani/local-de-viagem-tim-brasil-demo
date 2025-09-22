// src/app/actions/google-api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { google } from 'googleapis'

export type SaveToSheetInput = {
  hashID: string
  unlockedContent: string
  levelCompleted?: number
}

export async function submitData(data: SaveToSheetInput) {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error(
        'Las credenciales de Google no están configuradas en el entorno.',
      )
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = '1xAT_KgXzIpKerkX9XisJHOs8D0bcRNsSn6JLZvQ_SLo'

    // Crear fecha en zona horaria de Venezuela
    const venezuelaDate = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Caracas',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    // Preparar fila de datos con información adicional del nivel
    const rowData = [
      data.hashID,
      data.unlockedContent,
      data.levelCompleted || 'N/A',
      `${venezuelaDate}hs`,
    ]

    // Verificar si existe la hoja de encabezados y crearla si es necesario
    try {
      const sheetInfo = await sheets.spreadsheets.get({
        spreadsheetId,
      })

      // Verificar si existe una hoja llamada 'MemoTest_Progress'
      const memotestSheet = sheetInfo.data.sheets?.find(
        (sheet) => sheet.properties?.title === 'MemoTest_Progress',
      )

      if (!memotestSheet) {
        // Crear la hoja si no existe
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: 'MemoTest_Progress',
                  },
                },
              },
            ],
          },
        })

        // Agregar encabezados
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'MemoTest_Progress!A1:D1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [
                'Hash ID',
                'Contenido Desbloqueado',
                'Nivel Completado',
                'Fecha',
              ],
            ],
          },
        })
      }
    } catch (error) {
      console.log('Error verificando/creando hoja:', error)
    }

    // Agregar los datos a la hoja
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'MemoTest_Progress!A1:D1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    if (response.status !== 200) {
      throw new Error(`Error de la API de Google: ${response.statusText}`)
    }

    const message = `¡Nivel completado! Desbloqueado ${data.unlockedContent}`
    return { success: true, message: message }
  } catch (error: any) {
    console.error('Error submitting data:', error.message)
    const errorMessage = error.message.includes('permission')
      ? "Error de permisos. Asegúrate de que la API de Google Sheets está habilitada y que la cuenta de servicio tiene permisos de 'Editor' en el documento."
      : 'Ocurrió un error al guardar los datos. Revisa la configuración de las credenciales en el archivo .env.'
    return { success: false, message: errorMessage }
  }
}

// // src/app/actions/google-api.ts
// /* eslint-disable @typescript-eslint/no-explicit-any */

// 'use server'

// //import { z } from 'zod'
// import { google } from 'googleapis'
// // import { format } from 'date-fns'
// // import { es } from 'date-fns/locale'

// // const formSchema = z.object({
// //   name: z.string().min(2, {
// //     message: 'El nombre debe tener al menos 2 caracteres.',
// //   }),
// //   email: z.string().email({
// //     message: 'Por favor, ingresa un email válido.',
// //   }),
// //   unlockedContent: z.enum(['playa', 'ciudad', 'montaña', 'selva'], {
// //     required_error: 'Debes seleccionar una opción.',
// //   }),
// // })

// export type SaveToSheetInput = {
//   name: string
//   email: string
//   unlockedContent: string
// }

// export async function submitData(data: SaveToSheetInput) {
//   try {
//     if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
//       throw new Error(
//         'Las credenciales de Google no están configuradas en el entorno.',
//       )
//     }

//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_email: process.env.GOOGLE_CLIENT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//       },
//       scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//     })

//     const sheets = google.sheets({ version: 'v4', auth })
//     const spreadsheetId = '1xAT_KgXzIpKerkX9XisJHOs8D0bcRNsSn6JLZvQ_SLo'

//     // Usamos el nombre de la hoja (por defecto 'Hoja 1' o 'Sheet1') para añadir los datos.
//     // Esto es más robusto que usar un rango fijo.
//     const range = 'A1:D1'
//     const venezuelaDate = new Date().toLocaleString('es-ES', {
//       timeZone: 'America/Caracas',
//       hour12: false,
//       hour: '2-digit',
//       minute: '2-digit',
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     })

//     const response = await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range,
//       valueInputOption: 'USER_ENTERED',
//       requestBody: {
//         values: [[data.name, data.email, data.unlockedContent, `${venezuelaDate}hs`]],
//       },
//     })

//     if (response.status !== 200) {
//       throw new Error(`Error de la API de Google: ${response.statusText}`)
//     }

//     const message = `¡Gracias, ${data.name}! Tus datos se han guardado.`
//     return { success: true, message: message }
//   } catch (error: any) {
//     console.error('Error submitting data:', error.message)
//     const errorMessage = error.message.includes('permission')
//       ? "Error de permisos. Asegúrate de que la API de Google Sheets está habilitada y que la cuenta de servicio tiene permisos de 'Editor' en el documento."
//       : 'Ocurrió un error al guardar los datos. Revisa la configuración de las credenciales en el archivo .env.'
//     return { success: false, message: errorMessage }
//   }
// }
