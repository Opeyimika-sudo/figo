import React from 'react'
import axios from 'axios'

interface Image {
    id: number,
    image_url: string,
    image_desc: string,
    created_on: string
}

const Main = () => {
    const [images, setImages] = React.useState<Image[]>([])

    React.useEffect(() => {
        axios('http://127.0.0.1:5000/').then(response => setImages(response.data)).catch(error => console.log(error))
    }, [])

    console.log(images);

    const imageWall = images.map(item => (
        <img src={item.image_url} alt={item.image_desc}/>
    ))
  return (
    <div>{imageWall}</div>
  )
}

export default Main