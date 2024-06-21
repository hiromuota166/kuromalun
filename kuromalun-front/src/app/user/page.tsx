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
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (user) {
        setUserEmail(user.email ?? null);
        // ユーザーのdisplayNameを取得
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('displayName')
          .eq('userId', user.id)
          .single();

        if (userData) {
          setDisplayName(userData.displayName ?? null);
        }

        // ユーザーが作成したサークルを取得
        const { data: circleData, error: circleError } = await supabase
          .from('circles')
          .select('id, name')
          .eq('ownerId', user.id);

        if (circleData) {
          setCircles(circleData);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleCircleClick = (id: string) => {
    router.push(`/circleDetail/${id}`);
  };

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <div className='w-full h-[20vh] flex items-center justify-center'>
        <p className='text-2xl font-bold'>{displayName} ({userEmail})</p>
      </div>
      <div className='w-full flex-1 flex flex-col items-center justify-start'>
        <h2 className='text-xl font-bold mt-10'>作成したサークル</h2>
        <ul className='w-4/5 mt-5'>
          {circles.map((circle) => (
            <li key={circle.id} className='p-2 border-b border-gray-300 cursor-pointer' onClick={() => handleCircleClick(circle.id)}>
              {circle.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
