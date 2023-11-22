import React from 'react'
import Logo from './Logo'
import { Input } from "../Components/ui/input"
import { Button } from './ui/button'


const Header = () => {
  return (
    <div className='flex gap-x-2 lg:gap-x-6'>
        <Logo/>
        <div className='relative w:3/5 lg:w-4/5 flex items-center'>
            <span className="material-symbols-outlined absolute left-1 lg:left-2 text-xs lg:text-lg">
                search
            </span>
            <Input type="text" placeholder="Search by name" className='font-noto text-xs w:3/5 lg:w-2/4 pl-4 lg:pl-10'/>
        </div>
        <Button className='bg-teal-600 rounded-lg'>Add a photo</Button>
    </div>
  )
}

export default Header