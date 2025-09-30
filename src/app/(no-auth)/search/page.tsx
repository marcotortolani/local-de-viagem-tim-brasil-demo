// src/app/(no-auth)/search/page.tsx

'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { SearchItem } from '@/components/search/SearchItem'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontalIcon, ChevronDown } from 'lucide-react'
import { Post } from '@/lib/api/wp/wp-types'
import { getWpPosts } from '@/lib/api/wp/wp-actions'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/text/SectionTitle'
import { Pagination } from '@/components/pagination/Pagination'
import Breadcrumb from '@/components/ui/Breadcrumb'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { REGION_TAGS, DESTINATION_TAGS, CHECKLIST_TAGS } from '@/lib/constants'

import dictionary from '@/dictionary/lang.json'

const PER_PAGE = 12

const Page = () => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)

  // Estados separados para cada tipo de filtro
  const [regionTags, setRegionTags] = useState<number[]>([])
  const [destinationTags, setDestinationTags] = useState<number[]>([])
  const [checklistTags, setChecklistTags] = useState<number[]>([])

  // Función para manejar la selección de tags por tipo
  const handleTagSelection = (
    tagId: number,
    tagType: 'region' | 'destination' | 'checklist',
  ) => {
    setCurrentPage(0)

    switch (tagType) {
      case 'region':
        setRegionTags((prev) =>
          prev.includes(tagId)
            ? prev.filter((id) => id !== tagId)
            : [...prev, tagId],
        )
        break
      case 'destination':
        setDestinationTags((prev) =>
          prev.includes(tagId)
            ? prev.filter((id) => id !== tagId)
            : [...prev, tagId],
        )
        break
      case 'checklist':
        setChecklistTags((prev) =>
          prev.includes(tagId)
            ? prev.filter((id) => id !== tagId)
            : [...prev, tagId],
        )
        break
    }
  }

  // Función para limpiar filtros específicos
  const clearFilters = (type?: 'region' | 'destination' | 'checklist') => {
    setCurrentPage(0)
    if (type) {
      switch (type) {
        case 'region':
          setRegionTags([])
          break
        case 'destination':
          setDestinationTags([])
          break
        case 'checklist':
          setChecklistTags([])
          break
      }
    } else {
      // Limpiar todos
      setRegionTags([])
      setDestinationTags([])
      setChecklistTags([])
    }
  }

  // Función para convertir todos los tags seleccionados a string
  const getAllSelectedTagsAsString = () => {
    const allSelectedTags = [
      ...regionTags,
      ...destinationTags,
      ...checklistTags,
    ]

    if (allSelectedTags.length === 0) {
      // Si no hay filtros, incluir todos los tags disponibles
      const allTags = [
        ...REGION_TAGS.map((tag) => tag.id),
        ...DESTINATION_TAGS.map((tag) => tag.id),
        ...CHECKLIST_TAGS.map((tag) => tag.id),
      ]
      return allTags.join(',')
    }

    return allSelectedTags.join(',')
  }

  const callback = useCallback(
    async (search: string, currentPage: number) => {
      const data = await getWpPosts({
        search,
        per_page: PER_PAGE,
        tags: getAllSelectedTagsAsString(),
        offset: currentPage * PER_PAGE,
      })
      setPosts(data.posts)
      setPages(data.totalPages)
      setLoading(false)
    },
    [regionTags, destinationTags, checklistTags, currentPage],
  )

  useEffect(() => {
    setLoading(true)
    callback(search, currentPage)
  }, [search, currentPage, regionTags, destinationTags, checklistTags])

  // Componente para el dropdown de filtros
  const FilterDropdown = ({
    title,
    tags,
    selectedTags,
    onTagSelect,
    onClear,
    // type,
  }: {
    title: string
    tags: Array<{ id: number; name: string; slug: string; color: string }>
    selectedTags: number[]
    onTagSelect: (tagId: number) => void
    onClear: () => void
    // type: 'region' | 'destination' | 'checklist'
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`
          px-3 md:px-4 py-1 font-oswald text-sm md:text-base lg:text-lg
          text-nowrap border-2 border-white rounded-full 
          transition-all duration-200 ease-in-out
          flex items-center gap-2
          ${
            selectedTags.length > 0
              ? 'bg-white text-neutral-500 hover:bg-white/80'
              : 'bg-transparent text-quaternary hover:bg-white/40'
          }
        `}
        >
          {title} {selectedTags.length > 0 && `(${selectedTags.length})`}
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 max-h-60 overflow-y-auto">
        {selectedTags.length > 0 && (
          <>
            <DropdownMenuItem
              onClick={onClear}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              {dictionary['Clear']} {title}
            </DropdownMenuItem>
            <div className="border-b my-1" />
          </>
        )}
        {tags.map((tag) => (
          <DropdownMenuCheckboxItem
            key={tag.id}
            checked={selectedTags.includes(tag.id)}
            onCheckedChange={() => onTagSelect(tag.id)}
            className="cursor-pointer"
          >
            #{tag.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const content = loading ? (
    <div className="mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {new Array(PER_PAGE).fill(0).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  ) : (
    <div className="mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {posts.map((item, key) => (
        <SearchItem item={item} key={key} />
      ))}
    </div>
  )

  const hasActiveFilters =
    regionTags.length > 0 ||
    destinationTags.length > 0 ||
    checklistTags.length > 0

  return (
    <main className="mt-[5rem] md:mt-[6rem] pb-20 bg-primary">
      <div className="w-full max-w-screen-xl md:pt-2 md:px-4 md:mx-auto mb-4">
        <Breadcrumb homeElement={dictionary['Home']} />
        <Input
          Icon={Search}
          className="bg-primary-light/40 w-full h-[50px] mt-4 border-none rounded-none text-white md:rounded-md placeholder:text-white indent-2 placeholder:text-[16px] placeholder:font-normal"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(0)
          }}
          placeholder={dictionary['Enter your search']}
          handleCloseIcon={() => setSearch('')}
        />
      </div>

      {/* Filters */}
      <div className="sticky top-20 md:top-[5.8rem] lg:top-24 bg-primary z-30 w-full max-w-screen-xl mx-auto h-full px-2 py-2 md:px-4 md:py-3 mb-2">
        {/* Botón limpiar todo y filtros principales */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => clearFilters()}
                  className={`
                      relative group hover:scale-105 active:scale-100 
                      transition-all duration-200 ease-in-out
                      ${hasActiveFilters ? 'text-red-400' : 'text-quaternary'}
                    `}
                  disabled={!hasActiveFilters}
                >
                  <SlidersHorizontalIcon className="w-6 h-6 group-hover:opacity-80 transition-all duration-200 ease-in-out" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={4}
                className="bg-white text-neutral-600 font-oswald text-sm"
              >
                <p>
                  {hasActiveFilters
                    ? dictionary['Clear All Filters']
                    : dictionary['No Active Filters']}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <FilterDropdown
            title={dictionary['Regions']}
            tags={REGION_TAGS}
            selectedTags={regionTags}
            onTagSelect={(tagId) => handleTagSelection(tagId, 'region')}
            onClear={() => clearFilters('region')}
            // type="region"
          />

          <FilterDropdown
            title={dictionary['Destinations']}
            tags={DESTINATION_TAGS}
            selectedTags={destinationTags}
            onTagSelect={(tagId) => handleTagSelection(tagId, 'destination')}
            onClear={() => clearFilters('destination')}
            // type="destination"
          />

          <FilterDropdown
            title={dictionary['Checklists']}
            tags={CHECKLIST_TAGS}
            selectedTags={checklistTags}
            onTagSelect={(tagId) => handleTagSelection(tagId, 'checklist')}
            onClear={() => clearFilters('checklist')}
            // type="checklist"
          />
        </div>

        {/* Mostrar tags seleccionados */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <span className="text-white/70">
              {dictionary['Active Filters']}:
            </span>
            {regionTags.map((tagId) => {
              const tag = REGION_TAGS.find((t) => t.id === tagId)
              return tag ? (
                <span
                  key={`region-${tag.id}`}
                  className="px-2 py-1 bg-quaternary/20 text-quaternary rounded-full"
                >
                  #{tag.name}
                </span>
              ) : null
            })}
            {destinationTags.map((tagId) => {
              const tag = DESTINATION_TAGS.find((t) => t.id === tagId)
              return tag ? (
                <span
                  key={`destination-${tag.id}`}
                  className="px-2 py-1 bg-tertiary/30 text-tertiary-dark rounded-full"
                >
                  #{tag.name}
                </span>
              ) : null
            })}
            {checklistTags.map((tagId) => {
              const tag = CHECKLIST_TAGS.find((t) => t.id === tagId)
              return tag ? (
                <span
                  key={`checklist-${tag.id}`}
                  className="px-2 py-1 bg-secondary/20 text-secondary rounded-full"
                >
                  #{tag.name}
                </span>
              ) : null
            })}
          </div>
        )}
      </div>
      <Container className=" ">
        {!search && <SectionTitle>{dictionary['Sugestions']}</SectionTitle>}
        {content}
        <Pagination
          pages={pages}
          currentPage={currentPage}
          onChangePrev={(newPage) => setCurrentPage(newPage)}
          onChangeNext={(newPage) => setCurrentPage(newPage)}
        />
      </Container>
    </main>
  )
}

export default Page

const SkeletonCard = () => {
  return (
    <div className="relative w-full h-[184px] md:h-[300px] bg-neutral-300 opacity-70 p-1 lg:p-2 rounded-xl animate-pulse">
      <div className="w-full h-full bg-neutral-700 rounded-[inherit]"></div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 bg-neutral-600 rounded-full"></div>
      </div>
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-600 h-8 w-5/6 mx-auto"></p>
    </div>
  )
}

// // src/app/(no-auth)/search/page.tsx

// 'use client'
// import React, { useState, useEffect, useCallback } from 'react'
// //import dynamic from 'next/dynamic'
// import { SearchItem } from '@/components/search/SearchItem'
// import { Input } from '@/components/ui/input'
// import { Search, SlidersHorizontalIcon } from 'lucide-react'
// import { Post } from '@/lib/api/wp/wp-types'
// import { getWpPosts } from '@/lib/api/wp/wp-actions'
// import { Container } from '@/components/Container'
// import { SectionTitle } from '@/components/text/SectionTitle'
// import { Pagination } from '@/components/pagination/Pagination'
// import Breadcrumb from '@/components/ui/Breadcrumb'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
//   TooltipProvider,
// } from '@/components/ui/tooltip'
// import { REGION_TAGS } from '@/lib/constants'

// // const Loading = dynamic(() => import('@/components/Loading'), {
// //   ssr: false,
// // })

// const PER_PAGE = 12

// const Page = () => {
//   const [search, setSearch] = useState('')
//   const [posts, setPosts] = useState<Post[]>([])
//   const [loading, setLoading] = useState(true)
//   const [pages, setPages] = useState<number>(0)
//   const [currentPage, setCurrentPage] = useState<number>(0)
//   const [tagsSelected, setTagsSelected] = useState<number[]>([])

//   const handleTagSelected = ({ tagSelected }: { tagSelected: number }) => {
//     setCurrentPage(0)
//     if (tagsSelected.includes(tagSelected)) {
//       setTagsSelected(tagsSelected.filter((item) => item !== tagSelected))
//     } else {
//       setTagsSelected([...tagsSelected, tagSelected])
//     }
//   }

//   const convertTagsToString = ({
//     tagsSelected,
//   }: {
//     tagsSelected: number[]
//   }) => {
//     let tags = ''
//     if (tagsSelected.length === 0) {
//       REGION_TAGS.forEach((tag, index) => {
//         if (index === 0) {
//           tags += tag.id
//         } else {
//           tags += `,${tag.id}`
//         }
//       })
//       return tags
//     }
//     tagsSelected.forEach((tag, index) => {
//       if (index === 0) {
//         tags += tag
//       } else {
//         tags += `,${tag}`
//       }
//     })
//     return tags
//   }

//   const callback = useCallback(
//     async (search: string, currentPage: number) => {
//       const data = await getWpPosts({
//         search,
//         per_page: PER_PAGE,
//         tags: convertTagsToString({ tagsSelected }),
//         offset: currentPage * PER_PAGE,
//       })
//       setPosts(data.posts)
//       setPages(data.totalPages)
//       setLoading(false)
//     },
//     [currentPage],
//   )

//   useEffect(() => {
//     setLoading(true)
//     callback(search, currentPage)
//   }, [search, currentPage, tagsSelected])

//   const content = loading ? (
//     <div className="mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
//       {new Array(PER_PAGE).fill(0).map((_, index) => (
//         <SkeletonCard key={index} />
//       ))}
//     </div>
//   ) : (
//     <div className="mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
//       {posts.map((item, key) => (
//         <SearchItem item={item} key={key} />
//       ))}
//     </div>
//   )

//   return (
//     <main className=" mt-[5rem] md:mt-[6rem] pb-20 bg-primary">
//       <div className="w-full max-w-screen-xl md:pt-2 md:px-4 md:mx-auto mb-4">
//         <Breadcrumb homeElement="Inicio" />
//         <Input
//           Icon={Search}
//           className="bg-primary-light/40 w-full h-[50px] mt-4 border-none rounded-none text-white md:rounded-md placeholder:text-white indent-2 placeholder:text-[16px] placeholder:font-normal"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value)
//             setCurrentPage(0)
//           }}
//           placeholder="Ingrese su búsqueda"
//           handleCloseIcon={() => setSearch('')}
//         />
//       </div>
//       <Container>
//         {/* Filters */}
//         <div className=" sticky top-20 md:top-[5.8rem] lg:top-24 bg-primary z-30 w-full h-full md:px-2 py-2 md:py-3 mb-2 flex flex-row items-center justify-between gap-2 ">
//           <div
//             className=" w-full md:min-w-fit overflow-x-auto bg-scroll sm:overflow-hidden flex items-center justify-start lg:justify-center gap-2 "
//             style={{ scrollbarWidth: 'none' }}
//           >
//             <TooltipProvider delayDuration={100}>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <button
//                     type="button"
//                     onClick={() => setTagsSelected([])}
//                     className=" relative group hover:scale-105 active:scale-100 transition-all duration-200 ease-in-out"
//                   >
//                     <SlidersHorizontalIcon className="w-6 h-6 stroke-quaternary group-hover:opacity-80 transition-all duration-200 ease-in-out" />
//                   </button>
//                 </TooltipTrigger>
//                 <TooltipContent
//                   sideOffset={4}
//                   className=" bg-white text-neutral-600 font-oswald text-sm"
//                 >
//                   <p>Limpiar Filtros</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//             {REGION_TAGS.map((tag) => (
//               <button
//                 key={tag.slug}
//                 className={` px-4 md:px-4 lg:px-6 pb-0.5 font-oswald text-base xl:text-xl text-nowrap lowercase border-2 border-white rounded-full transition-all duration-200 ease-in-out ${
//                   tagsSelected.includes(tag.id)
//                     ? 'bg-white text-neutral-500 hover:bg-white/60'
//                     : 'bg-transparent text-quaternary hover:bg-white/40 hover:text-quaternary/80'
//                 }`}
//                 onClick={() => handleTagSelected({ tagSelected: tag.id })}
//               >
//                 #{tag.name}
//               </button>
//             ))}
//           </div>
//         </div>
//         {!search && <SectionTitle>Sugerencias</SectionTitle>}
//         {content}
//         <Pagination
//           pages={pages}
//           currentPage={currentPage}
//           onChangePrev={(_currentPage) => setCurrentPage(_currentPage)}
//           onChangeNext={(_currentPage) => setCurrentPage(_currentPage)}
//         />
//       </Container>
//     </main>
//   )
// }

// export default Page

// const SkeletonCard = () => {
//   return (
//     <div className="relative w-full h-[184px] md:h-[300px] bg-neutral-300 opacity-70 p-1 lg:p-2 rounded-xl animate-pulse">
//       <div className=" w-full h-full bg-neutral-700 rounded-[inherit]"></div>
//       <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center ">
//         <div className=" w-20 h-20 bg-neutral-600 rounded-full"></div>
//       </div>
//       <p className=" absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-600 h-8 w-5/6 mx-auto"></p>
//     </div>
//   )
// }
