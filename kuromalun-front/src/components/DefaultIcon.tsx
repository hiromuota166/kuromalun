'use client'
import { Icon } from '@chakra-ui/icons';
import { IconType } from 'react-icons';

interface DefaultIconProps {
  icon: IconType;
  width?: number;
  height?: number;
}

const DefaultIcon = (props: DefaultIconProps) => {
  const { icon, width, height } = props;
  return (
    <Icon as={icon} w={width} h={height}/>
  );
};

export default DefaultIcon;