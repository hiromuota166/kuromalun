'use client'
import { Icon } from '@chakra-ui/icons';
import { IconType } from 'react-icons'; // アイコンタイプの定義に使います

// FooterLink コンポーネントの props 型定義
interface FooterIconProps {
  href: string;
  text: string;
  icon: IconType;
}

const FooterIcon = (props: FooterIconProps) => {
  const { href, text, icon } = props;
  return (
    <a href={href} className="text-mainColor flex flex-col items-center mx-4">
      <Icon as={icon} w={6} h={6}/>
      <span>{text}</span>
    </a>
  );
};

export default FooterIcon;
