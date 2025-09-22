// @/lib/constants

export const WP_BACKEND = process.env.NEXT_PUBLIC_API_URL
const OPERATOR_COUNTRY = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY

export const REVALIDATE = 3600

export const PREFIX_PERSIST_STORE = `qgv-${OPERATOR_COUNTRY}`

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

export const HASH_TAG = ['queguay']

export const CATEGORIES = {
  'inspirate-en-venezuela': 24, // Cat
  itinerarios: 114, // Sub Cat
  viajeros: 21, // Sub Cat
  'por-el-mundo': 20, // Cat
  destinos: 26, // Sub Cat
  'recorriendo-el-mundo': 25, // Sub Cat
  'cultura-y-paladar': 22, // Cat
  'sabores-del-mundo': 28, // Sub Cat
  'detras-del-mapa': 27, // Sub Cat
  checklist: 23,
  'destinos-del-mes': 115, // Categoria de contenido promocional
  shorts: 37,
}

export const REGION_TAGS = [
  { id: 143, name: 'Canaima', slug: 'canaima', color: QUATERNARY_COLOR },
  { id: 134, name: 'Morrocoy', slug: 'morrocoy', color: QUATERNARY_COLOR },
  { id: 135, name: 'Los Roques', slug: 'los-roques', color: QUATERNARY_COLOR },
  { id: 126, name: 'Mérida', slug: 'merida', color: QUATERNARY_COLOR },
  { id: 133, name: 'El Ávila', slug: 'el-avila', color: QUATERNARY_COLOR },
]

export const DESTINO_TAGS = [
  { id: 130, name: 'Atracción', slug: 'atraccion', color: PRIMARY_COLOR },
  { id: 129, name: 'Cultura', slug: 'cultura', color: PRIMARY_COLOR },
  { id: 131, name: 'Gastronomía', slug: 'gastronomia', color: PRIMARY_COLOR },
  { id: 127, name: 'Naturaleza', slug: 'naturaleza', color: PRIMARY_COLOR },
  { id: 66, name: 'Playa', slug: 'playa', color: PRIMARY_COLOR },
  { id: 128, name: 'Pueblo', slug: 'pueblo', color: PRIMARY_COLOR },
  { id: 132, name: 'Urbano', slug: 'urbano', color: PRIMARY_COLOR },
]

export const CHECKLIST_TAGS = [
  { id: 148, name: 'Apps', slug: 'apps', color: PRIMARY_COLOR },
  {
    id: 149,
    name: 'Documentación',
    slug: 'documentacion',
    color: PRIMARY_COLOR,
  },
  { id: 147, name: 'Equipajes', slug: 'equipajes', color: PRIMARY_COLOR },
  { id: 144, name: 'Información', slug: 'informacion', color: PRIMARY_COLOR },
  { id: 145, name: 'Organización', slug: 'organizacion', color: PRIMARY_COLOR },
  // { id: 142, name: 'Presupuesto', slug: 'presupuesto', color: PRIMARY_COLOR },
  { id: 146, name: 'Viajes', slug: 'viajes', color: PRIMARY_COLOR },
]

export const STATE_MEMOTEST = {
  start: 'START',
  gaming: 'GAMING',
  next: 'NEXT',
  defeat: 'DEFEAT',
  finish: 'FINISH',
}
