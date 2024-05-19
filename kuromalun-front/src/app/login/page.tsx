import React from 'react'

const page = () => {
  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <div className='w-full h-[20vh] flex items-center justify-center'>
      <p className='text-4xl font-bold '>Log in</p>
      </div>
      <form className='w-full flex-1 flex flex-col items-center justify-start'>
        <div className='w-4/5'>
          <div className=''>
            <p className=''>メールアドレス</p>
          </div>
          <input 
            placeholder={""}
            className='w-full h-16 rounded-xl p-2 mt-2 bg-color'
          />
        </div>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>パスワード</p>
          </div>
          <input 
            placeholder={""}
            className='w-full h-16 rounded-xl p-2 mt-2 bg-color'
            type='password'
          />
        </div>
        <button type='submit' className='w-4/5 h-16 p-3 mt-10 text-white font-bold rounded-lg shadow-lg bg-emphasisColor hover:bg-mainColor hover:text-emphasisColor transition duration-150 active:scale-90'>
          ログイン
        </button>
        <a href='/signUp' className='mt-6 mb-10' >
          新規作成ページ
        </a>
      </form>
    </div>
  )
}

export default page