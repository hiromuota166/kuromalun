'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Spinner, Center } from '@chakra-ui/react';
import UserIcon from './UserIcon';
import { supabase } from '../utils/supabase';

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUserEmail(session.user.email ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUserEmail(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const getLinkClasses = (path: string): string => {
    return pathname === path ? 'py-3 px-4 block font-bold border-b-2 text-black' : 'py-3 px-4 block';
  };

  const handleNavigation = async (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setIsLoading(true); // スピナーを表示
    const { data: { user } } = await supabase.auth.getUser();
    if (user || path === '/' || path === '/login') {
      router.push(path);
    } else {
      alert('ログインしてください');
      router.push('/login');
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <Center position="fixed" top="0" left="0" width="100vw" height="100vh" bg="rgba(255, 255, 255, 0.7)" zIndex="1000">
          <Spinner size="xl" />
        </Center>
      )}
      <nav className='fixed z-50 bg-backgroundColor w-full flex justify-between items-center'>
        <ul className='items-center flex'>
          <li className='justify-center'>
            <a href="/" onClick={(e) => handleNavigation(e, '/')} className={getLinkClasses('/')}>ホーム</a>
          </li>
          <li className='justify-center'>
            <a href="/circleCreateEdit" onClick={(e) => handleNavigation(e, '/circleCreateEdit')} className={getLinkClasses('/circleCreateEdit')}>作成</a>
          </li>
        </ul>
        <ul className='flex items-center pr-5'>
          <UserIcon w={34} h={34} />
        </ul>
      </nav>
      <div></div>
    </div>
  );
};

export default Navigation;
