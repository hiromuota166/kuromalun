'use client'
import { Icon } from '@chakra-ui/icons';
import { IoHomeOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <div className='fixed inset-x-0 bottom-0 bg-background'>
      <div className='text-center p-4 bg-gray-100 flex justify-center gap-10'>
        <a href="/" className="text-mainColor flex flex-col items-center mx-4">
          <Icon as={IoHomeOutline} w={6} h={6}/>
          <span>ホーム</span>
        </a>
        <a href="/" className="text-mainColor flex flex-col items-center mx-4">
          <Icon as={IoHomeOutline} w={6} h={6}/>
          <span>ホーム</span>
        </a>
        <a href="/" className="text-mainColor flex flex-col items-center mx-4">
          <Icon as={IoHomeOutline} w={6} h={6}/>
          <span>ホーム</span>
        </a>
      </div>
    </div>
  );
}

export default Footer;
