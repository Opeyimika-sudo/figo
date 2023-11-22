import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap:x-0.5 lg:gap-x-2'>
        <span className="material-symbols-outlined">
        person
        </span>
        <div>
            <h2 className='font-medium font-noto text-sm md:text-base lg:text-xl'>Figo</h2>
            <p className='font-medium font-noto text-xs'>devchallenges.io</p>
        </div>
    </div>
  )
}

export default Logo