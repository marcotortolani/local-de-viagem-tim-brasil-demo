import React from 'react'
import { LogoWhite } from './LogoWhite'

import dictionary from '@/dictionary/lang.json'

const MobileHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center gap-6 mb-4 px-1">
      <LogoWhite className="h-12 w-[130px] md:h-16 md:w-[150px] " />
      <p className=" w-2/4 md:max-w-[160px] mt-4 text-xs text-left md:text-sm">
        {dictionary['slogan']}
      </p>
    </div>
  )
}

export { MobileHeader }
