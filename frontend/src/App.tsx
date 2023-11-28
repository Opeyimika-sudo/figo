import React from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import Modal from './Components/Modal'
import axios from 'axios'

interface Image {
  id: number,
  image_url: string,
  image_desc: string,
  created_on: string
}

function App() {
  const [modal, setModal] = React.useState(false)
  const [clickedItem, setClickedItem] = React.useState([])
  const [images, setImages] = React.useState<Image[]>([])
  const [inputValue, setInputValue] = React.useState('');

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
              setModal(false)
}

const handleDelete = (item) => {
    setModal(true)
    setClickedItem(item)
    console.log(item)
}


  return (
    <div className="mx-3 lg:mx-10 my-3">
      <Header/>
      <Main 
      handleDelete={handleDelete}
      setImages={setImages}
      images={images}
      >
            {modal && <Modal
                clickedItem = {clickedItem}
                handleChange = {handleChange}
                handleSubmit = {() => handleSubmit(e, id)}
            />}
      </Main>
    </div>
  )
}

export default App
 