import React from 'react'
import axios from 'axios'
// import Masonry from 'react-masonry-component'
import MasonryComponent from './MasonryComponent'
import { Button } from './ui/button'

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

    const imageWall = images.map(item => (
        <div className='relative'>
            <img key={item.id} src={item.image_url} alt={item.image_desc} className='object-contain rounded-2xl cursorChange'/>
            <Button className='absolute right-2 top-2 border-red-500 border-2 text-red-500 bg-inherit px-2 py-0.5 rounded-2xl button'>delete</Button>
            <p></p>
        </div>
    ))


  return (
    <div className='mt-5'>
        <MasonryComponent>
            {imageWall}
        </MasonryComponent>
    </div>
  )
}

export default Main