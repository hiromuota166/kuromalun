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
    <div className='flex'>
      <DefaultIcon icon={icon} width={width} height={height}/>
      <p>{text}</p>
    </div>
  )
}

export default CircleDetailTextItem