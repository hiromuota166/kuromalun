'use client'
import React, { useState } from 'react';
import { signup } from './actions' 

const Page = () => {
  // 挿入するデータ
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <div className='w-full h-[20vh] flex items-center justify-center'>
        <p className='text-4xl font-bold text-center'>Create New <br/> Account</p>
      </div>
      <form className='w-full flex-1 flex flex-col items-center justify-start' action={signup}>
        <div className='w-4/5'>
          <div className=''>
            <p className=''>ユーザー名</p>
          </div>
          <input
            aria-label='名前'
            placeholder=""
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={displayName}
            name='displayName'
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>メールアドレス</p>
          </div>
          <input
            aria-label='メアド'
            placeholder=""
            type='email'
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>パスワード</p>
          </div>
          <input
            aria-label='パスワード'
            placeholder=""
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            type='password'
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='w-4/5 h-16 p-3 mt-10 text-white font-bold rounded-lg shadow-lg bg-emphasisColor hover:bg-backgroundColor hover:text-emphasisColor transition duration-150 active:scale-90'>
          登録
        </button>
        <a href='/signUp' className='mt-6 mb-10'>
          ログインページ
        </a>
      </form>
    </div>
  );
}

export default Page;
