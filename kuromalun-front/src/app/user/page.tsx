"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [circles, setCircles] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      console.log('User data:', data);
      console.log('User fetch error:', error);

      if (!user) {
        console.log('No user found, redirecting to login...');
        router.push('/login');
        return;
      }

      setUserEmail(user.email ?? null);

      // ユーザーのdisplayNameを取得
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('displayName')
        .eq('userId', user.id)
        .single();

      console.log('User profile data:', userData);
      console.log('User profile fetch error:', userError);

      if (userData) {
        setDisplayName(userData.displayName ?? null);
      }

      // ユーザーが作成したサークルを取得
      const { data: circleData, error: circleError } = await supabase
        .from('circles')
        .select('uid, name, circlesImageId')  // uidカラムを使用
        .eq('ownerId', user.id);

      console.log('Circles data:', circleData);
      console.log('Circles fetch error:', circleError);

      if (circleData) {
        setCircles(circleData);
      }
    };

    fetchUserData();

    // authStateChangeリスナーの設定
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change event:', event);
      console.log('Auth state change session:', session);

      if (event === 'SIGNED_OUT') {
        console.log('User signed out, redirecting to home...');
        router.push('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleCircleClick = (uid: string) => {
    console.log('Circle clicked:', uid);
    router.push(`/circleDetail/${uid}`);
  };

  const handleLogout = async () => {
    const confirmed = confirm('本当にログアウトしますか？');
    if (confirmed) {
      console.log('User confirmed logout');
      await supabase.auth.signOut();
    } else {
      console.log('User canceled logout');
    }
  };

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <div className='w-full h-[20vh] flex items-center justify-center'>
        <p className='text-2xl font-bold'>{displayName} ({userEmail})</p>
      </div>
      <div className='w-full flex-1 flex flex-col items-center justify-start'>
        <h2 className='text-xl font-bold mt-10'>作成したサークル</h2>
        <ul className='w-4/5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {circles.map((circle) => (
            <li key={circle.uid} className='p-2 border rounded shadow cursor-pointer' onClick={() => handleCircleClick(circle.uid)}>
              <img src={circle.circlesImageId} alt={circle.name} className='w-full h-48 object-cover rounded' />
              <p className='mt-2 text-center'>{circle.name}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className='mt-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700'
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Page;
