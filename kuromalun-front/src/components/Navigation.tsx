'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SettingIcon from './SettingIcon';
import UserIcon from './UserIcon';
import { supabase } from '../utils/supabase';

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  const handleCreateClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      router.push('/circleCreateEdit');
    } else {
      alert('ログインしてください');
      router.push('/login');
    }
  };

  return (
    <div>
      <nav className='fixed z-50 bg-backgroundColor w-full flex justify-between items-center'>
        <ul className='items-center flex'>
          <li className='justify-center'>
            <a href="/" className={getLinkClasses('/')}>ホーム</a>
          </li>
          <li className='justify-center'>
            <a href="/circleCreateEdit" onClick={handleCreateClick} className={getLinkClasses('/circleCreateEdit')}>作成</a>
          </li>
        </ul>
        <ul className='flex items-center'>
          {/* {userEmail && <li className='mr-4'>{userEmail}</li>} */}
          <UserIcon />
        </ul>
      </nav>
      <div></div>
    </div>
  );
};

export default Navigation;
