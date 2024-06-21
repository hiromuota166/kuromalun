"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // useRouterの代わりにuseParamsを使用
import { supabase } from '@/utils/supabase';

interface Circle {
  uid: string;
  name: string;
  description: string;
  circlesImageId: string;
}

const CircleDetailPage = () => {
  const { id } = useParams();
  const [circle, setCircle] = useState<Circle | null>(null);

  useEffect(() => {
    if (id) {
      fetchCircleDetail(id as string);
    }
  }, [id]);

  const fetchCircleDetail = async (circleId: string) => {
    const { data, error } = await supabase
      .from('circles')
      .select('uid, name, description, circlesImageId')
      .eq('uid', circleId)
      .single();

    if (error) {
      console.log('Error fetching circle details:', error);
      return;
    }

    setCircle(data);
  };

  if (!circle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">{circle.name}</h1>
      <div className="flex flex-col items-center">
        <img src={circle.circlesImageId} alt={circle.name} className="w-full h-64 object-cover mb-4" />
        <p>{circle.description}</p>
      </div>
    </div>
  );
};

export default CircleDetailPage;
