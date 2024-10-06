import { Button, Input, Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
  } from "firebase/storage";
import { storage } from "@/firebase/clientApp";

function FileUploadButton({ updateFile } : any) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click(); // Simulate a click on the hidden input
        }
    };

    const [imageUpload, setImageUpload] = useState<File | null>(null);

    useEffect(() => {
        if (imageUpload === null) {          
          return;
        }
        const imageRef = storageRef(storage, crypto.randomUUID());
    
        uploadBytes(imageRef, imageUpload)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                console.log(url)
                updateFile(url)
              })
              .catch((error) => {
                console.log(error)
              });
          })
          .catch((error) => {            
          });
      }, [imageUpload])

    return (
        <Box>
            <Button
                colorScheme='teal'
                onClick={handleButtonClick}
                size='md'                
            >
                Choose File
            </Button>
            <Input
                type="file"
                ref={inputRef}
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setImageUpload(e.target.files[0]);
                    }
                }}
                display="none" // Hide the default input element
                accept="image/*"
            />
        </Box>
    );
}

export default FileUploadButton;
