'use client'
import { IoClipboardSharp, IoLocationSharp, IoTime, IoPeopleSharp, IoLink} from "react-icons/io5";
import CircleDetailTextItem from '@/components/CircleDetailTextItem';
import CircleInputText from '@/components/CircleInputText';
import LinkInItem from '@/components/LinkInItem';
import CircleImageTop from '@/components/CircleImageTop';

const page = () => {
  return (
    <div className=' md:flex md:h-[calc(100vh-156px)] mb-24'>
      {/* サークル名 */}
      <div className='relative md:w-1/2 flex items-center justify-center'>
        <CircleImageTop src="/haikei.png" text="watnow"/>
      </div>
      {/* 内容 */}
      <div className='bg-backgroundColor md:w-1/2 m-4 flex-col overflow-y-auto'>
        <CircleInputText icon={IoClipboardSharp} width={6} height={6} text='活動内容' exampleText='イベントたくさん！' />
        <CircleInputText icon={IoLocationSharp} width={6} height={6} text='活動場所' exampleText='OIC屋上' />
        <CircleInputText icon={IoTime} width={6} height={6} text='活動時間' exampleText='放課後' />
        <CircleInputText icon={IoPeopleSharp} width={6} height={6} text='人数' exampleText='30人前後' />
        <CircleDetailTextItem icon={IoLink} width={6} height={6} text='リンク'/>
        <div className='p-2 my-3 border rounded-xl'>
          <LinkInItem text='タイトル' exampleText='HPはこちら' />
          <LinkInItem text='URL' exampleText='http://watnow.com' />
        </div>
        {/* 保存ボタン */}
        <div className='w-full flex justify-end'>
          <a href="/circleDetail">
            <p className='p-3 w-max border-zinc-500 border rounded-md'>保存</p>
          </a>
        </div>
      </div >
    </div>
  )
}

export default page