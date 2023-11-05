import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    VStack,
    Button,
    useToast
} from '@chakra-ui/react';
import Header from '../components/Header';
import { AttachmentIcon } from '@chakra-ui/icons';
import AWS from 'aws-sdk';


// Configure the AWS SDK
AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();
const HomePage = () => {
    const toast = useToast();
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files ? event.target.files[0] : null;
        setFile(uploadedFile);
    };

    const handleFileUpload = () => {
        if (file) {
            setIsUploading(true);
            const params = {
                Bucket: 'sunhacks23',
                Key: `pdf/${file.name}`,
                Body: file,
                ContentType: 'application/pdf',
            };

            s3.upload(params, (err, data) => {
                setIsUploading(false);
                if (err) {
                    console.error('There was an error uploading your file: ', err);
                    toast({
                        title: 'Upload Failed',
                        description: "There was an error uploading your file.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                    return;
                }
                console.log('Successfully uploaded file.', data);
                toast({
                    title: 'File Uploaded!',
                    description: "We've received your file.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                setFile(null); // Reset the file
            });
        }
    };

    return (
        <Flex flexDirection="column" h="150vh">
          <Header />
          <Flex flexGrow={1} pt={{ base: "60px", md: "150px" }}> {/* Adjust pt based on Header's height */}
            {/* History Section */}
            <Box w="25%" bg="gray.50" p={4} overflowY="auto">
              {/* ... Your history content ... */}
            </Box>
      
            {/* File Upload and Result Section */}
            <Flex w="75%" flexDirection="column" p={4} bg="white">
              <VStack spacing={4}>
                <Text fontSize="xl" fontWeight="bold">Upload a file</Text>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  hidden
                />
                <Button
                  leftIcon={<AttachmentIcon />}
                  colorScheme="blue"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  Choose File
                </Button>
                {file && (
                  <Button
                    colorScheme="blue"
                    onClick={handleFileUpload}
                    isLoading={isUploading}
                    loadingText="Uploading..."
                  >
                    Upload
                  </Button>
                )}
                {/* Here you could also add the component that will display the upload result */}
              </VStack>
            </Flex>
          </Flex>
        </Flex>
      );
      
};

export default HomePage;
