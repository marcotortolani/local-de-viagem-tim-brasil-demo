// @/lib/constants
import dictionary from '@/dictionary/lang.json'

export const WP_BACKEND = process.env.NEXT_PUBLIC_API_URL
const OPERATOR_COUNTRY = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY

export const REVALIDATE = 3600 * 12 // 12 hour

export const PREFIX_PERSIST_STORE = `${dictionary['siteName']}-${OPERATOR_COUNTRY}`

export const PRIMARY_COLOR = '#497D98'
export const PRIMARY_LIGHT_COLOR = '#3DC1C9'
export const PRIMARY_DARK_COLOR = '#1B5675'
export const SECONDARY_COLOR = '#F28B82'
export const SECONDARY_DARK_COLOR = '#F04A3C'
export const TERTIARY_COLOR = '#FFCC5C'
export const TERTIARY_LIGHT_COLOR = '#F6EAC2'
export const TERTIARY_DARK_COLOR = '#EEBB00'
export const QUATERNARY_COLOR = '#43D5C8'
export const QUATERNARY_COLOR_DARK = '#3D514F'

export const HASH_TAG = [dictionary['siteName']]

export const CATEGORIES = {
  'inspired-by': 24, // Cat
  itineraries: 114, // Sub Cat
  travelers: 21, // Sub Cat
  'local-travelers': 161,
  'international-travelers': 162,
  'around-the-world': 20, // Cat
  destinations: 26, // Sub Cat
  'traveling-the-world': 25, // Sub Cat
  'culture-and-flavor': 22, // Cat
  'flavors-of-the-world': 28, // Sub Cat
  'behind-the-map': 27, // Sub Cat
  checklist: 23,
  'destinations-of-the-month': 115, // Categoria de contenido promocional
  shorts: 37,
}

export const GRID_VIDEOS = {
  destinations: 'https://vimeo.com/1122287148',
  itineraries: 'https://vimeo.com/1122287191',
  checklist: 'https://vimeo.com/1122292840',
  'behind-the-map': 'https://vimeo.com/1122292798',
  'culture-and-flavor': 'https://vimeo.com/1122292816',
  'around-the-world': 'https://vimeo.com/1122292695',
  landscapes: 'https://vimeo.com/1122292577',
  // 'itineraries-venezuela':
  //   'https://vimeo.com/1122292742',
  //'promotional-venezuela': 'https://vimeo.com/1102290426',
}
// export const GRID_VIDEOS = {
//   destinations:
//     'https://player.vimeo.com/progressive_redirect/playback/1122287148/rendition/1080p/file.mp4?loc=external&log_user=0&signature=ef277726cf6a1855fdb972a0d367f4b97280ddf92c0a9f9b714264bddf9e2118',
//   itineraries:
//     'https://player.vimeo.com/progressive_redirect/playback/1122287191/rendition/1080p/file.mp4?loc=external&log_user=0&signature=6715bae5ec9d4b3fafe50b48d96eb0dbd4cec0b164ec25a35a817bd052d1599b',
//   checklist:
//     'https://player.vimeo.com/progressive_redirect/playback/1122292840/rendition/720p/file.mp4?loc=external&log_user=0&signature=03ba443a5c8574fcebab5b243aab017ee8e3d232e7dab96c4357975d22ece931',
//   'behind-the-map':
//     'https://player.vimeo.com/progressive_redirect/playback/1122292798/rendition/540p/file.mp4?loc=external&log_user=0&signature=27c94aeef028a40afe0c6e58929a89aa9c4321dc87a560f7bf3c5fd654358c66',
//   'culture-and-flavor':
//     'https://player.vimeo.com/progressive_redirect/playback/1122292816/rendition/720p/file.mp4?loc=external&log_user=0&signature=11ca49867141bd6b243e0c98dff1156c95a7c3f7b4cf7cd71ddfcbc1982c70f3',
//   'around-the-world':
//     'https://player.vimeo.com/progressive_redirect/playback/1122292695/rendition/720p/file.mp4?loc=external&log_user=0&signature=08b57915ec8d1b47d1b7ab4e96d58cccc2520f4810b8fdc94b4c7b2e7175b0ce',
//   landscapes:
//     'https://player.vimeo.com/progressive_redirect/playback/1122292577/rendition/1080p/file.mp4?loc=external&log_user=0&signature=4b221d8f48234bf19f2d5beea234eaba4f43019dcc21ea6c8d41217cffe9c19d',
//   // 'itineraries-venezuela':
//   //   'https://player.vimeo.com/progressive_redirect/playback/1122292742/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fb4b63772c29b1c58332bd64ba4a256a3b6182488065cf2d402fc1856a3a1bc6',
//   // 'promotional-venezuela': 'https://player.vimeo.com/progressive_redirect/playback/1102290426/rendition/1080p/file.mp4?loc=external&log_user=0&signature=895f1d2460cf0b5bb2c4ff17bf223049562e96799de0f4cd582f688c63077251',
// }

export const REGION_TAGS = [
  { id: 143, name: 'Canaima', slug: 'canaima', color: QUATERNARY_COLOR },
  { id: 134, name: 'Morrocoy', slug: 'morrocoy', color: QUATERNARY_COLOR },
  { id: 135, name: 'Los Roques', slug: 'los-roques', color: QUATERNARY_COLOR },
  { id: 126, name: 'Mérida', slug: 'merida', color: QUATERNARY_COLOR },
  { id: 133, name: 'El Ávila', slug: 'el-avila', color: QUATERNARY_COLOR },
]

export const DESTINATION_TAGS = [
  {
    id: 130,
    name: dictionary['Attraction'],
    slug: 'atraccion',
    color: PRIMARY_COLOR,
  },
  {
    id: 129,
    name: dictionary['Culture'],
    slug: 'cultura',
    color: PRIMARY_COLOR,
  },
  {
    id: 131,
    name: dictionary['Gastronomy'],
    slug: 'gastronomia',
    color: PRIMARY_COLOR,
  },
  {
    id: 127,
    name: dictionary['Nature'],
    slug: 'naturaleza',
    color: PRIMARY_COLOR,
  },
  { id: 66, name: dictionary['Beach'], slug: 'playa', color: PRIMARY_COLOR },
  { id: 128, name: dictionary['Town'], slug: 'pueblo', color: PRIMARY_COLOR },
  { id: 132, name: dictionary['Urban'], slug: 'urbano', color: PRIMARY_COLOR },
]

export const CHECKLIST_TAGS = [
  { id: 148, name: dictionary['Apps'], slug: 'apps', color: PRIMARY_COLOR },
  {
    id: 149,
    name: dictionary['Documentation'],
    slug: 'documentacion',
    color: PRIMARY_COLOR,
  },
  {
    id: 147,
    name: dictionary['Baggage'],
    slug: 'equipajes',
    color: PRIMARY_COLOR,
  },
  {
    id: 144,
    name: dictionary['Information'],
    slug: 'informacion',
    color: PRIMARY_COLOR,
  },
  {
    id: 145,
    name: dictionary['Organization'],
    slug: 'organizacion',
    color: PRIMARY_COLOR,
  },
  // { id: 142, name: dictionary['Budget'], slug: 'presupuesto', color: PRIMARY_COLOR },
  {
    id: 146,
    name: dictionary['Travel'],
    slug: 'viajes',
    color: PRIMARY_COLOR,
  },
]
