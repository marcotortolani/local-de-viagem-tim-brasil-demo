import React from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

type PaginationProps = {
  pages: number
  currentPage: number
  onChangePrev: (value: number) => void
  onChangeNext: (value: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  pages = 0,
  onChangeNext,
  onChangePrev,
  currentPage = 1,
}) => {
  const page = currentPage + 1

  if (!pages) return null
  return (
    <div className=" w-full max-w-screen-sm mx-auto flex justify-between items-center">
      <button
        type="button"
        className={` ${page === 1 ? 'opacity-50 pointer-events-none' : ''} hover:scale-105 hover:bg-neutral-500/60 cursor-pointer rounded-full p-1 transition-all duration-200 ease-in-out`}
        onClick={() => page > 1 && onChangePrev(currentPage - 1)}
      >
        <ChevronLeft className=" w-8 h-8 pr-1 stroke-white " />
      </button>
      <div className="text-lg font-poppins font-normal text-white mx-10 md:mx-0">
        {page} / {pages}
      </div>
      <button
        type="button"
        className={`${page === pages ? 'opacity-50 pointer-events-none' : ''} hover:scale-105 hover:bg-neutral-500/60 cursor-pointer  rounded-full p-1 transition-all duration-200 ease-in-out`}
        onClick={() => page < pages && onChangeNext(currentPage + 1)}
      >
        <ChevronRight className=" w-8 h-8 pl-1 stroke-white " />
      </button>
    </div>
  )
}
