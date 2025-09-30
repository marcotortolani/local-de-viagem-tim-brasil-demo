This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Versions

- v1.4.4:
  Se toma de base el producto de QGV (Mov - Ven)
  Se saca el memotest
  Se arma traducciones a portugués de Brasil
  Se cambian imagenes para regionalizar
  Se modifican logos y banderas para Brasil

- v1.4.3:
  Se modifica la sección Viajeros con nuevo diseño
  Se sube el eBook para el desafío del MemoTest

- v1.4.2:
  Se modifican secciones internas con rediseño nuevo
  Se corrigen subsecciones para editorial y videos
  Se agregan dropdowns para filtrar por tags en la sección "Búsqueda"
  Se ajusta la sección "Destinos del Mes"

- v1.4.1:
  Se corrige el update de la prueba trial (3 clicks) para acceder a secciones internas

- v1.4.0:
  Se arregló la sección de shorts para una mejor visualización en mobile
  Se arregla el carrousel H1 para mostrar un random de los posts mas recientes
  Se arreglan imagenes de progreso del memotest (mapa corregido)
  Corrección de "Inspírate" con tilde en textos e imágenes

- v1.3.8:
  Se agrega memotest con 4 niveles (Playa, Selva, Montaña y Ciudad)
  Se agrega sección de progreso para Memotest y descarga de eBook
  Se agrega Banner de Memotest en Home (Desktop & Mobile)

- v1.3.6:
  Fix image elements y configByLevel que no se estaba usando

- v1.3.5:
  Se saca la consulta del endpoint de additional config
  Se pone el validatorActive en true por default

- v1.3.3:
  Se arregla el Validator & Trial Provider

- v1.3.1:
  Se agrega Memotest (acciones verano) de 04/08 al 31/08

- v1.3.0:
  Se cambia el diseño de la home
  Se agregan videos Shorts
  Se modifican los iconos del MenuMobile (Shorts e Inspírate)
  Se agrega página Memotest para descarga de documento PDF

- v1.2.0:
  Se agregan filtros
  Se reordena la categoria Conociendo Venezuela
  La categoría "Conociendo Venezuela" pasa a llamarse "Inspírate en Venezuela"
  Se colocan badges degun los tags de las regiones destacadas
  Se modifican Trial Provider y Validation provider para evitar parpadeos

- v1.1.2:
  Modificaciones en diseño y ajustes
  Se agrega boton de suscripcion

- v1.1.0:
  Se genera nuevo producto para Movistar-Venezuela únicamente (diseño especial)

- v1.0.2:
  Se agrega activacion/desactivacion de Validator y Trial en el endpoint de AdditionalConfig

- v1.0.1:
  Corrección en petición de Additional Config cuando falla el endpoint

- v1.0.0:
  Versión inicial
