import React from 'react'

const Modal = ({clickedItem, handleChange, handleSubmit}) => {

  return (
    <div className='absolute sm:max-w-md"'>
                        <h2>Are you sure?</h2>
                        <p>
                        Type the image's description - <span className='font-bold'>{clickedItem.image_desc}</span> in the box to delete the image
                        </p>
                        <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <label htmlFor="text" className="">
                            Image Description
                            </label>
                            <input
                            id="text"
                            placeholder="******************"
                            type='text'
                            onChange={handleChange}
                            // readOnly
                            />
                        </div>
                        </div>
                    
                        <footer className="sm:justify-start">
                                <button onClick={(e) => handleSubmit(e, clickedItem.id)} type="submit" className="text-white px-3 bg-red-500">
                                    Delete
                                </button>   
                        </footer>
        </div>
  )
}

export default Modal