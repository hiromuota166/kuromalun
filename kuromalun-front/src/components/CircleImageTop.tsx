import React from 'react'
import Image from 'next/image'

const CircleImageTop = () => {
  return (
    <>
      <div className='relative'>
        <div>
          <Image
            src='/haikei.png'
            alt='サークル画像'
            width={1200}
            height={900}
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>
        <div className='absolute bottom-4 left-4'>
          <Image
            src='/iconGreen.png'
            alt='ユーザー画像'
            width={40}
            height={40}
            className='rounded-xl mb-2'
          />
          <h1 className='text-2xl'>
            watnow
          </h1>
        </div>
      </div>
    </>    
  )
}

export default CircleImageTop