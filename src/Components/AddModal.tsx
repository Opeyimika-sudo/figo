import React from 'react';
import axios from 'axios';
import { ImageContext } from './ImageContextProvider';
import { toast } from 'react-toastify';


const AddModal: React.FC = ({setModal}) => {
    const {images, setImages} = React.useContext(ImageContext)
    const [newPhoto, setNewPhoto] = React.useState({
        image_desc: '',
        image_url: ''
    })

    const handleChange = (event) => {
        setNewPhoto({...newPhoto, [event.target.id]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        await axios.post(`http://127.0.0.1:5000/add_image/`, {
            headers: { 
                'Content-Type': 'application/json' 
            },
            data: {
                image_desc: newPhoto.image_desc,
                image_url: newPhoto.image_url
            }
        })
              .then((response) => {
                setImages(response.data)
                toast.success('Image added successfully')
              })
              .catch((error) => {
                console.log(error.response.data);
                toast.error('Error adding image')
              });
              setModal(false)
    }

    const randomPhoto = async () => {
        await axios.post(`http://127.0.0.1:5000/add_image/`, {
            headers: { 
                'Content-Type': 'application/json' 
            },
            data: "random"
            }
            ).then((response) => {
                setImages(response.data)
                toast.success("Random image added successfully")
              }).catch((error) => {
                console.log(error.response.data);
                toast.error('Error adding random image')
              })
              setModal(false)
    }

  return (
    <div className='fixed inset-0 grid place-items-center overflow-y-auto bg-black bg-opacity-50'>
        <div className='mx-2 w-5/6 max-w-[500px] bg-white p-4 rounded-md'>
                            <h2 className='text-lg mb-1'>Add a new photo</h2>
                            <p className='underline text-teal-600 cursor-pointer text-xs' onClick={randomPhoto}>Or add a random photo</p>
                            <div className="flex items-center space-x-2 mt-3">
                            <div className="grid flex-1 gap-2">
                                <label htmlFor="image_desc" className="text-base">
                                Description
                                </label>
                                <input
                                id="image_desc"
                                placeholder="Suspendisse elit massa"
                                type='text'
                                onChange={handleChange}
                                className='border border-gray-400 rounded-lg px-2 py-1 w-full'
                                />

                                <label htmlFor="image_url" className="text-base">
                                Photo URL
                                </label>
                                <input
                                id="image_url"
                                placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
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
                                    <button onClick={(e) => handleSubmit(e)} type="submit" className="text-white px-3 bg-red-500 hover:bg-red-600 py-2 rounded-2xl">
                                        Add
                                    </button>   
                            </footer>
        </div>
    </div>
  );
};

export default AddModal;
