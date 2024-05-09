'use client'
import Image from 'next/image'
import { IoClipboardSharp, IoLocationSharp, IoTime, IoPeopleSharp, IoLink} from "react-icons/io5";
import CircleDetailTextItem from '@/components/CircleDetailTextItem';
import CircleInputText from '@/components/CircleInputText';
import LinkInItem from '@/components/LinkInItem';

const page = () => {
  return (
    <div className='bg-color md:flex h-[calc(100vh-156px)]'>
      {/* サークル名 */}
      <div className='relative'>
        <Image 
          src='/haikei.png'
          alt='サークル画像'
          width={500}
          height={200}
          className=''
        />
        <div className='absolute bottom-4 left-4'>
          <Image 
            src='/iconGreen.png'
            alt='ユーザー画像'
            width={40}
            height={40}
            className='rounded-xl'
          />
          <h1>
            <input type='text' placeholder='サークル名' />
          </h1>
        </div>
      </div >
      {/* 内容 */}
      <div className='bg-mainColor'>
        <CircleInputText icon={IoClipboardSharp} width={4} height={4} text='活動内容' exampletext='イベントたくさん！' />
        <CircleInputText icon={IoLocationSharp} width={4} height={4} text='活動場所' exampletext='OIC屋上' />
        <CircleInputText icon={IoTime} width={4} height={4} text='活動時間' exampletext='放課後' />
        <CircleInputText icon={IoPeopleSharp} width={4} height={4} text='人数' exampletext='30人前後' />
        <CircleDetailTextItem icon={IoLink} width={4} height={4} text='リンク'/>
        <div>
          <LinkInItem text='タイトル' exampletext='HPはこちら' />
          <LinkInItem text='URL' exampletext='http://watnow.com' />
        </div>
        {/* 保存ボタン */}
        <div>
          <button aria-label='store'>
            {/* <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov'/> */}
          </button>
        </div>

      </div >
    </div>
  )
}

export default page