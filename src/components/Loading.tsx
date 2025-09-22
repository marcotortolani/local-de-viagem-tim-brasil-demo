'use client'
import Lottie from 'lottie-react'
import LoadingLottie from '@/components/lottie/loading.json'

type LoadingProps = {
  text?: string
}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Lottie
        animationData={LoadingLottie}
        loop={true}
        style={{
          width: 150,
          height: 150,
        }}
      />
    </div>
  )
}

export default Loading
