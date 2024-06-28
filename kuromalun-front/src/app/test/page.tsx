"use client"

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';

interface Circle {
  uid: string;
  name: string;
  circlesImageId: string;
}

const Page = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  // 画像と名前を全て取得し、ステートに保存
  const listAllImage = async () => {
    const { data, error } = await supabase.from('circles').select('uid, name, circlesImageId');
    if (error) {
      console.error(error);
      return;
    }

    if (Array.isArray(data)) {
      const validatedData: Circle[] = data.filter((item): item is Circle => 
        typeof item.uid === 'string' && 
        typeof item.name === 'string' && 
        typeof item.circlesImageId === 'string'
      );
      setCircles(validatedData);
    } else {
      console.error('Unexpected data format:', data);
    }
  };

  useEffect(() => {
    listAllImage();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">サークル一覧</h1>
      <div className="flex flex-wrap">
        {circles.map(circle => (
          <div key={circle.uid} className="w-1/4 p-2">
            <Link href={`/circleDetail/${circle.uid}`} legacyBehavior>
              <a>
                <img src={circle.circlesImageId} alt={circle.name} className="w-full h-32 object-cover" />
                <p className="text-center mt-2">{circle.name}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
