'use client'
import { Icon } from '@chakra-ui/icons';
import { IoHomeOutline, IoCreateOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import FooterIcon from './FooterIcon';

const Footer = () => {
  return (
    <div className='fixed inset-x-0 bottom-0 bg-background'>
      <div className='text-center p-4 bg-gray-100 flex justify-center gap-10'>
        <FooterIcon href='/' text='ホーム' icon={IoHomeOutline} />
        <FooterIcon href='/create' text='作成' icon={IoCreateOutline} />
        <FooterIcon href='/user' text='ユーザー' icon={CiUser} />
      </div>
    </div>
  );
}

export default Footer;
