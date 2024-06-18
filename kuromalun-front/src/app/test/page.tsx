"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    // Supabaseのリスナーを設定して、ログイン状態の変化を監視する
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <div className='w-full h-[20vh] flex items-center justify-center'>
        <p className='text-4xl font-bold '>{isLoggedIn ? 'ログイン済み' : '未ログイン'}</p>
      </div>
    </div>
  );
};

export default Page;
