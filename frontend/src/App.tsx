import React from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'


function App() {
  const [modal, setModal] = React.useState(false)


  return (
    <div className="mx-3 lg:mx-10 my-3">
      <Header/>
      <Main 
      modal={modal} 
      setModal={setModal}/>
    </div>
  )
}

export default App
 