'use client'
import { IconType } from 'react-icons';
import CircleDetailTextItem from './CircleDetailTextItem';

interface CircleInputTextProps {
  icon: IconType;
  width: number;
  height: number;
  text: string;
  exampletext: string;
}

const CircleInputText = (props: CircleInputTextProps) => {
  const { icon, width, height, text, exampletext } = props;
  return (
    <div className='mb-4'>
      <CircleDetailTextItem icon={icon} width={width} height={height} text={text}/>
      <textarea 
        placeholder={exampletext}
        className='w-full md:h-90vh border-zinc-600 border rounded-xl p-2 mt-2'
      />
    </div>
  )
}

export default CircleInputText