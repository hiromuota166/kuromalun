'use client'
import { useState } from 'react';
import { signup } from './actions' 

const Page = () => {
  // 挿入するデータ
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main>
      <form action={signup}>
        <label htmlFor="displayName">displayName:</label>
        <input aria-label='名前' type='text' value={displayName} name='displayName' onChange={ (e: React.ChangeEvent<HTMLInputElement>)=>setDisplayName(e.target.value) } />
        <label htmlFor="email">Email:</label>
        <input aria-label='メール' type="email" value={email} name='email' onChange={ (e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value) } />
        <label htmlFor="password">Password:</label>
        <input aria-label='パスワード' type="password" value={password} name='password' onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
        <button type='submit'>Sign up</button>
      </form>
    </main>
  );
}

export default Page;
