import React from 'react'
import Logo from './Logo'
import { Input } from "../Components/ui/input"
import { Button } from './ui/button'
import { createPortal } from 'react-dom'
import AddModal from './AddModal'


const Header = () => {
  const [addModal, setAddModal] = React.useState<boolean>(false)
  const addPhoto = () => {
    setAddModal(true)
  }

  return (
    <div className='flex gap-x-2 lg:gap-x-6'>
        <Logo/>
        <div className='relative w:3/5 lg:w-4/5 flex items-center'>
            <span className="material-symbols-outlined absolute left-1 lg:left-2 text-xs lg:text-lg">
                search
            </span>
            <Input type="text" placeholder="Search by name" className='font-noto text-xs w:3/5 lg:w-2/4 pl-4 lg:pl-10'/>
        </div>
        <Button className='bg-teal-600 rounded-lg' onClick={addPhoto}>Add a photo</Button>
        {addModal && createPortal(<AddModal setModal={setAddModal}/>, document.body)}
    </div>
  )
}

export default Header