'use client'
import { Image } from '@chakra-ui/react'
import { IoClipboardSharp } from "react-icons/io5";
import DefaultIcon from '@/components/DefaultIcon';

const page = () => {
  return (
    <div className='bg-color'>
      {/* サークル名 */}
      <div className='bg-backgroundColor'>
        <h1>
          <input type='text' placeholder='サークル名' />
        </h1>
      </div >
      {/* 内容 */}
      <div className='bg-mainColor'>
        <div>
          <div>
            <DefaultIcon icon={IoClipboardSharp} width={4} height={4}/>
          </div>
          <textarea placeholder='内容' />
        </div>
        {/* バツボタン */}
        <div>
          <button aria-label='store'>
            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov'/>
          </button>
        </div>

      </div >
    </div>
  )
}

export default page