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
    <div>
      <CircleDetailTextItem icon={icon} width={width} height={height} text={text}/>
      <textarea placeholder={exampletext} />
    </div>
  )
}

export default CircleInputText