import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'
import MasonryComponent from './MasonryComponent'
import { Button } from './ui/button'
import Modal from './DeleteModal'
import { ImageContext } from './ImageContextProvider'

interface ClickedItem {
    id: number,
    image_url: string,
    image_desc: string,
    created_on: string
}
// interface stateProps {
//     children: React.ReactNode,
//     setImages: React.Dispatch<React.SetStateAction<Image[]>>,
//     images: Image[],
// }
  
const Main = () => {
    const {images, setImages} = React.useContext(ImageContext);
    const [inputValue, setInputValue] = React.useState('');
    const [deleteModal, setDeleteModal] = React.useState<boolean>(false)
    const [clickedItem, setClickedItem] = React.useState<ClickedItem[]>([])
   
        React.useEffect(() => {
                axios.get('http://127.0.0.1:5000/')
                    .then((response) => {
                        if(response.data.length == 0){
                            axios.get('http://127.0.0.1:5000/populate').then(response => setImages(response.data)).catch(error => console.log(error))
                        }  
                        setImages(response.data)
                    })
                    .catch(error => console.log(error))
            
        }, [])

    

    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    const handleSubmit = async (event, id: number) => {
            event.preventDefault()
            
            await axios.delete(`http://127.0.0.1:5000/delete_image/${id}/`, {
                headers: { 
                    'Content-Type': 'application/json' 
                },
                data: inputValue
            })
                  .then((response) => {
                    setImages(response.data)
                  })
                  .catch((error) => {
                    console.log(error.response.data);
                  });
                  setDeleteModal(false)
    }

    const handleDelete = (item) => {
        setDeleteModal(true)
        setClickedItem([item])
    }
    
    const imageWall = images.map(item => (
        <div className='relative'>
            <img key={item.id} src={item.image_url} alt={item.image_desc} className='object-contain rounded-2xl cursorChange'/>
            <Button className='absolute right-2 top-2 border-red-500 border-2 text-red-500 bg-inherit px-2 py-0.5 rounded-2xl button' onClick={() => handleDelete(item)}>delete</Button>
            <p className='absolute bottom-1 text-white left-1 pl-1 paragraph'>{item.image_desc.charAt(0).toUpperCase().concat(item.image_desc.slice(1))}</p>
        </div>
    ))


  return (
    <div className='mt-5'>
            {deleteModal && createPortal(<Modal 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            clickedItem={clickedItem}
            setModal={setDeleteModal}
            />, document.body) }
        <MasonryComponent>
            {imageWall}
        </MasonryComponent>
    </div>
  )
}

export default Main