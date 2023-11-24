import React from 'react'
import axios from 'axios'
// import Masonry from 'react-masonry-component'
import MasonryComponent from './MasonryComponent'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
  } from "./ui/dialog"
  import { Input } from './ui/input'
  import { Label } from "./ui/label"

  

interface Image {
    id: number,
    image_url: string,
    image_desc: string,
    created_on: string
}

interface stateProps {
    modal: Boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
  
const Main: React.FC<stateProps> = ({modal, setModal}) => {
    const [images, setImages] = React.useState<Image[]>([])
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        axios.get('http://127.0.0.1:5000/').then(response => setImages(response.data)).catch(error => console.log(error))
    }, [])

    

    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    const handleSubmit = async (event, id: number) => {
            event.preventDefault()
            await axios.post(`http://127.0.0.1:5000/delete_image/${id}/`, {
                headers: { 
                    'Content-Type': 'application/json' 
                },
                data: inputValue
            })
                  .then((response) => {
                    console.log("we got here")
                    console.log(response.status, response.data);
                    setImages(images.filter(image => image.id !== id))
                  })
                  .catch((error) => {
                    console.log(error.response.data);
                  });
    }

    const imageWall = images.map(item => (
        <div className='relative'>
            <img key={item.id} src={item.image_url} alt={item.image_desc} className='object-contain rounded-2xl cursorChange'/>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='absolute right-2 top-2 border-red-500 border-2 text-red-500 bg-inherit px-2 py-0.5 rounded-2xl button'>delete</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        Type the image's description - <span className='font-bold'>{item.image_desc}</span> in the box to delete the image
                    </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="text" className="">
                        Image Description
                        </Label>
                        <Input
                        id="text"
                        placeholder="******************"
                        type='text'
                        onChange={handleChange}
                        // readOnly
                        />
                    </div>
                    </div>
                    {/* <Button type="button" variant="secondary">
                    Cancel
                    </Button> */}
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button onClick={(e) => handleSubmit(e, item.id)} type="submit" size="sm" className="text-white px-3 bg-red-500">
                                Delete
                            </Button>   
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            <p className='absolute bottom-1 text-white left-1 pl-1 paragraph'>{item.image_desc.charAt(0).toUpperCase().concat(item.image_desc.slice(1))}</p>

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