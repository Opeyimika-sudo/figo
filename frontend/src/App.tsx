import React from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import ImageContextProvider from './Components/ImageContextProvider'


function App() {
  
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
 