'use client'
import Image from 'next/image'
import { IoClipboardSharp, IoLocationSharp, IoTime, IoPeopleSharp, IoLink} from "react-icons/io5";
import CircleDetailTextItem from '@/components/CircleDetailTextItem';
import CircleDetailText from '@/components/CircleDetailText';

const page = () => {
  return (
    <div className=' md:flex md:h-[calc(100vh-156px)]'>
      {/* サークル名 */}
      <div className='relative md:w-1/2 flex items-center justify-center'>
        <div className='relative'>
          <Image
            src='/haikei.png'
            alt='サークル画像'
            width={1200}
            height={900}
            sizes='(max-width: 768px) 100vw, 33vw'
          />
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
      </div>
      {/* 内容 */}
      <div className='bg-mainColor md:w-1/2 m-4 flex-col overflow-y-auto'>
        <CircleDetailText icon={IoClipboardSharp} width={6} height={6} text='活動内容' exampletext='イベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさんイベントたくさん！' />
        <CircleDetailText icon={IoLocationSharp} width={6} height={6} text='活動場所' exampletext='OIC屋上' />
        <CircleDetailText icon={IoTime} width={6} height={6} text='活動時間' exampletext='放課後' />
        <CircleDetailText icon={IoPeopleSharp} width={6} height={6} text='人数' exampletext='30人前後' />
        <CircleDetailTextItem icon={IoLink} width={6} height={6} text='リンク'/>
        <a href="http://www.watnow.jp/" target="_blank" rel="noopener noreferrer">HPはこちら</a>
      </div >
    </div>
  )
}

export default page