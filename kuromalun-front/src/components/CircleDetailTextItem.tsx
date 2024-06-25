'use client'
import { IconType } from 'react-icons';
import DefaultIcon from './DefaultIcon';

interface CircleDetailTextItemProps {
  icon: IconType;
  width: number;
  height: number;
  text: string;
}

const CircleDetailTextItem = (props: CircleDetailTextItemProps) => {
  const { icon, width, height, text } = props;
  return (
    <div className='flex mb-4'>
      <DefaultIcon icon={icon} width={width} height={height}/>
      <p className='pl-4'>{text}</p>
    </div>
  )
}

export default CircleDetailTextItem