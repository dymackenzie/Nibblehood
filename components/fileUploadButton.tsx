/**
 * @file fileUploadButton.tsx, a TypeScript file that defines the FileUploadButton functional component.
 * 
 * This component is used to upload files to the server.
 */

import { Button, Input, Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
  } from "firebase/storage";
import { storage } from "@/firebase/clientApp";

function FileUploadButton({ updateFile } : any) {
    // create a reference to the input element
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click(); // simulates a click
        }
    };

    // state to store the image file
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    useEffect(() => {
        if (imageUpload === null) {          
          return;
        }

        const imageRef = storageRef(storage, crypto.randomUUID());
    
        // upload the file and metadata
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
            console.log(error)          
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
                display="none" // hide the default input element
                accept="image/*"
            />
        </Box>
    );
}

export default FileUploadButton;
