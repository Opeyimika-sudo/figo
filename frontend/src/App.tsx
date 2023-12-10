import React from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import ImageContextProvider from './Components/ImageContextProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="mx-3 lg:mx-10 my-3">
      <ImageContextProvider>
        <Header/>
        <Main/>
        <ToastContainer />
      </ImageContextProvider>
    </div>
  )
}

export default App
 