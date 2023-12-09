import React from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import ImageContextProvider from './Components/ImageContextProvider'

interface Image {
  id: number,
  image_url: string,
  image_desc: string,
  created_on: string
}

const ImageContext = React.createContext<Image[]>([])

function App() {
      // const [images, setImages] = React.useState<Image[]>([])
  return (
    <div className="mx-3 lg:mx-10 my-3">
      <ImageContextProvider>
        <Header/>
        <Main/>
      </ImageContextProvider>
    </div>
  )
}

export default App
 