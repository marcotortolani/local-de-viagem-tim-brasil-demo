'use client'
import React, { useEffect, useState } from 'react'
import { TypeOption } from '@/components/ui/tab/tab-types'

type Props = {
  options: TypeOption[]
  selected?: TypeOption
  onChange?: (value: string) => void
}

export const Tabs: React.FC<Props> = ({ options = [], onChange }) => {
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    if (!selectedValue) setSelectedValue(options[0].value)
  }, [options.length])

  return (
    <div className="mb-4">
      <div className={`grid grid-cols-2 gap-4  px-4`}>
        {options.map(({ label, value }, index) => (
          <div
            key={index}
            className={`${
              value == selectedValue
                ? ' z-50 text-[#78D4C7] bg-black border-[#78D4C7] border-b-0 border-b-transparent '
                : ' z-0 text-[#4D4D4D]  border-[#4D4D4D] border-b-[#78D4C7] border-b-2 '
            } 
                cursor-pointer text-[10px] text-center py-1 border-t-2 border-r-2 border-l-2 rounded-t-lg bg-black relative top-[1px] md:top-0.5 lg:top-[1px] font-semibold md:text-lg transition-all duration-200 ease-in-out`}
            onClick={() => {
              if (value === selectedValue) return null
              if (onChange) onChange(value)
              setSelectedValue(value)
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="border-b-[#78D4C7] border-b-2 -top-[1px] relative"></div>
    </div>
  )
}
