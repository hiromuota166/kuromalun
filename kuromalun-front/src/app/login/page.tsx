"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogin } from "../../components/Auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isSuccess = await handleLogin({ email, password, setIsLoading, displayName: "" });
    if (isSuccess) {
      router.push('/user');
    }
  };

  if (!isClient) {
    return null; // クライアントサイドでのみレンダリング
  }

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <div className='w-full h-[20vh] flex items-center justify-center'>
        <p className='text-4xl font-bold '>Log in</p>
      </div>
      <form className='w-full flex-1 flex flex-col items-center justify-start' onSubmit={onSubmit}>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>メールアドレス</p>
          </div>
          <input 
            placeholder={""}
            type='email'
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>パスワード</p>
          </div>
          <input 
            placeholder={""}
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='w-4/5 h-16 p-3 mt-10 text-white font-bold rounded-lg shadow-lg bg-emphasisColor hover:bg-backgroundColor hover:text-emphasisColor transition duration-150 active:scale-90'
          disabled={isLoading}
        >
          ログイン
        </button>
        <a href='/signUp' className='mt-6 mb-10'>
          新規作成ページ
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
