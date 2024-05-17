import React from 'react'

const HomeCirclePageList = () => {
  return (
    <>
      <div className="text-mainColor">
        <h1 className="text-xl">大学公認部活動</h1>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-4 overflow-x-scroll py-4">
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/hackathon.PNG" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/tennisCircle.JPG" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/haikei.png" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/haikei.png" alt="背景を挿入" />
          </div>
      </div>
    </>
  )
}

export default HomeCirclePageList