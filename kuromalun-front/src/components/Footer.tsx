'use client'
import { IoHomeOutline, IoCreateOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import FooterIcon from './FooterIcon';

const Footer = () => {
  return (
    <div className='fixed inset-x-0 bottom-0 bg-backgroundColor'>
      <div className='text-center p-4 bg-gray-100 flex justify-around'>
        <FooterIcon href='/' text='ホーム' icon={IoHomeOutline} />
        <FooterIcon href='/circleCreateEdit' text='作成' icon={IoCreateOutline} />
        <FooterIcon href='/user' text='ユーザー' icon={CiUser} />
      </div>
    </div>
  );
}

export default Footer;
