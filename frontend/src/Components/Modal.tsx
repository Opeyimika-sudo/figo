import React from 'react'

const Modal = ({clickedItem, handleChange, handleSubmit, setModal}) => {

  return (
    <div className='fixed inset-0 grid place-items-center overflow-y-auto bg-black bg-opacity-50'>
      <div className='max-w-[500px] bg-white p-4 rounded-md'>
                          <h2 className='text-lg mb-1'>Are you sure?</h2>
                          <p className='text-sm'>
                          Type the image's description - <code className='font-bold bg-teal-600'>{clickedItem[0].image_desc}</code> in the box to delete the image
                          </p>
                          <div className="flex items-center space-x-2 mt-3">
                            <div className="grid flex-1 gap-2">
                                <label htmlFor="text" className="text-base">
                                Image Description
                                </label>
                                <input
                                id="text"
                                placeholder="******************"
                                type='text'
                                onChange={handleChange}
                                className='border border-gray-400 rounded-lg px-2 py-1 w-full'
                                />
                            </div>
                          </div>
                      
                          <footer className="sm:justify-end flex my-2 gap-2">
                                  <button onClick={() => setModal(false)} className="text-white px-3 bg-gray-500 hover:bg-gray-600 py-2 rounded-2xl">
                                      Cancel  
                                  </button>
                                  <button onClick={(e) => handleSubmit(e, clickedItem[0].id)} type="submit" className="text-white px-3 bg-red-500 hover:bg-red-600 py-2 rounded-2xl">
                                      Delete
                                  </button>   
                          </footer>
          </div>

    </div>
  )
}

export default Modal