import React from 'react'
import axios from 'axios'
// import Masonry from 'react-masonry-component'
import MasonryComponent from './MasonryComponent'

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
        <div className=''>
            <img key={item.id} src={item.image_url} alt={item.image_desc} className='object-contain'/>
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