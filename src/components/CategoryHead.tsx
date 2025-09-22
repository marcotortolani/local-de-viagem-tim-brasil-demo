import Image from 'next/image'
import React from 'react'

export default function CategoryHead({
  bgImage,
  titleImage,
  paragraph,
}: {
  bgImage: string
  titleImage: string
  paragraph?: () => JSX.Element
}) {
  return (
    <section className="z-0 relative w-full h-[70svh] max-h-[400px] lg:max-h-[500px]    ">
      <div className="z-0 absolute top-0 left-0 w-full h-full ">
        <div className=" relative w-full  h-full  flex justify-end ">
          <Image
            className=" absolute top-0 w-full h-full  object-cover object-top lg:object-center"
            src={bgImage}
            alt="Image banner desktop version"
            fill
          />
        </div>
      </div>

      <div className="relative w-full h-full mx-auto py-10 pb-20 lg:pb-20 flex flex-col items-center justify-end gap-10">
        <Image
          className=" w-3/5 max-w-[200px] md:max-w-[300px] h-auto "
          src={titleImage}
          alt="Image Title Section"
          width={500}
          height={120}
        />

        {paragraph && (
          <div className=" w-5/6 md:max-w-[500px] bg-black/50 px-3 py-2 rounded-xl">
            {paragraph()}
          </div>
        )}
      </div>
    </section>
  )
}
