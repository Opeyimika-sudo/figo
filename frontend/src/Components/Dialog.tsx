{/* <Dialog>
                <DialogTrigger asChild>
                    <Button className='absolute right-2 top-2 border-red-500 border-2 text-red-500 bg-inherit px-2 py-0.5 rounded-2xl button' onClick={() => setOpen(true)}>delete</Button>
                </DialogTrigger>
                {/* <DialogPortal>
                    <DialogOverlay/> */}
                    <DialogContent className="sm:max-w-md"  >
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
                    
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                            {/* <Button type="button" variant="secondary">
                            Cancel
                            </Button> */}
                                <Button onClick={(e) => handleSubmit(e, item.id)} type="submit" size="sm" className="text-white px-3 bg-red-500">
                                    Delete
                                </Button>   
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>

                {/* </DialogPortal> */}
            </Dialog> */}