'use client'
import Link from 'next/link'

const SUBSCRIBE_URL = process.env.NEXT_PUBLIC_LANDING_SUBSCRIPTION || ''

export default function Subscribe() {
  return (
    <div className=" w-full h-[95svh] lg:h-[85svh] flex items-center justify-center">
      <div className=" mx-4 sm:mx-auto max-w-[400px] flex flex-col items-center gap-6 p-6 text-white rounded-lg shadow-xl bg-neutral-700">
        <p className=" px-4 text-center">
          Necesitas estar suscripto al servicio <br />
          ¿Quieres vivir las mejores experiencias?
        </p>

        <Link
          href={SUBSCRIBE_URL}
          target="_blank"
          className="uppercase inline-flex items-center justify-center rounded-[5px] text-neutral-200 font-semibold text-[14px] h-10 py-[3px] px-[10px] bg-secondary-dark hover:bg-secondary-dark/80 hover:text-neutral-300"
        >
          SUSCRÍBETE
        </Link>
      </div>
    </div>
  )
}
