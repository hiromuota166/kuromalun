import React from 'react'
import Image from 'next/image'

interface CircleImageTopProps {
  src: string
  text: string
}

const CircleImageTop = (props: CircleImageTopProps) => {
  const { src, text } = props
  return (
    <>
      <div className='relative'>
        <div>
          <Image
            src={src}
            alt='サークル画像'
            width={1200}
            height={900}
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>
        <div className='absolute bottom-4 left-4'>
          <h1 className='text-2xl'>
            {text}
          </h1>
        </div>
      </div>
    </>    
  )
}

export default CircleImageTop