import { Button, Input, Box } from "@chakra-ui/react";
import React, { useRef } from "react";

function FileUploadButton({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click(); // Simulate a click on the hidden input
        }
    };

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
                onChange={onChange}
                display="none" // Hide the default input element
                accept="image/*"
            />
        </Box>
    );
}

export default FileUploadButton;
