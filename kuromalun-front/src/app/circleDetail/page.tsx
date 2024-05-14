'use client'

import { IoClipboardSharp, IoLocationSharp, IoTime, IoPeopleSharp, IoLink} from "react-icons/io5";
import CircleDetailTextItem from '@/components/CircleDetailTextItem';
import CircleDetailText from '@/components/CircleDetailText';
import CircleImageTop from '@/components/CircleImageTop';

const page = () => {
  return (
    <div className=' md:flex md:h-[calc(100vh-156px)] mb-24'>
      {/* サークル名 */}
      <div className='relative md:w-1/2 flex items-center justify-center'>
        <CircleImageTop src="/haikei.png" text="watnow"/>
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