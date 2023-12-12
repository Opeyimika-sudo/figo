import React from "react"

export const ImageContext = React.createContext([])
const ImageContextProvider = ({children}) => {
    const [images, setImages] = React.useState([])
    return (<ImageContext.Provider value={{images, setImages}}>
        {children}
    </ImageContext.Provider>)
}

export default ImageContextProvider;