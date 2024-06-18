"use client";

import React, { useState } from 'react';
import { handleSignUp } from "../../components/Auth";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isSuccess = await handleSignUp({ email, password, displayName, setIsLoading });
    if (isSuccess) {
      // Redirect or show success message
    }
  };

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <div className='w-full h-[20vh] flex items-center justify-center'>
        <p className='text-4xl font-bold '>Create New Account</p>
      </div>
      <form className='w-full flex-1 flex flex-col items-center justify-start' onSubmit={onSubmit}>
        <div className='w-4/5'>
          <div className=''>
            <p className=''>ユーザー名</p>
          </div>
          <input 
            placeholder={""}
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
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
          登録
        </button>
        <a href='/login' className='mt-6 mb-10'>
          ログインページ
        </a>
      </form>
    </div>
  );
};

export default SignUpPage;
