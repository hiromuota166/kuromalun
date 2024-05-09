'use client'
import { IconType } from 'react-icons';
import CircleDetailTextItem from './CircleDetailTextItem';

interface CircleDetailTextProps {
  icon: IconType;
  width: number;
  height: number;
  text: string;
  exampletext: string;
}

const CircleDetailText = (props: CircleDetailTextProps) => {
  const { icon, width, height, text, exampletext } = props;
  return (
    <div className='mb-4'>
      <CircleDetailTextItem icon={icon} width={width} height={height} text={text}/>
      <p className='w-full md:h-90vh border-backgroundColor border rounded-xl p-2 mt-2'>
        {exampletext}
      </p>
    </div>
  )
}

export default CircleDetailText