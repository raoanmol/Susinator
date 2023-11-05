import React, { useState } from "react";
import {
  Box, Flex, Text, VStack, Button, useToast, Input, Textarea,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from "@chakra-ui/react";
import Header from "../components/Header";
import { AttachmentIcon } from "@chakra-ui/icons";
import AWS from "aws-sdk";
import axios from "axios";

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID_1,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_1,
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION_1,
});

const s3 = new AWS.S3();

const HomePage = () => {
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputText, setModalInputText] = useState("");

  const handleModalInputChange = (event) => {
    setModalInputText(event.target.value);
  };

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  const handleFileChange = (event) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    setFile(uploadedFile);
  };
  


  const handleFileUpload = async () => {
    if (file) {
      setIsUploading(true);

      try {
        const response = await axios.get("http://127.0.0.1:80/bucket"); // Make Axios request
        console.log(response);
        const bucketName = response.data;

        const params = {
          Bucket: bucketName,
          Key: "input_file",
          Body: file,
          ContentType: "application/pdf",
        };

        s3.upload(params, (err, data) => {
          setIsUploading(false);
          if (err) {
            console.error("There was an error uploading your file: ", err);
            toast({
              title: "Upload Failed",
              description: "There was an error uploading your file.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          console.log("Successfully uploaded file.", data);
          toast({
            title: "File Uploaded!",
            description: "We've received your file.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setFile(null); // Reset the file
        });
      } catch (error) {
        console.error("Error fetching bucket name: ", error);
        setIsUploading(false);
        toast({
          title: "Error",
          description: "There was an error fetching the bucket name.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex flexDirection="column" h="150vh">
      <Header />
      <Flex flexGrow={1} pt={{ base: "60px", md: "150px" }}>
        <Box w="25%" bg="gray.50" p={4} overflowY="auto">
          {/* Chat history here */}
        </Box>
        <Flex w="75%" flexDirection="column" p={4} bg="white">
          {/* Other components or content related to text display or chat interactions */}
          
          {/* Fixed Bottom File Upload and Text Input Panel */}
          <Box position="fixed" bottom="0" w="75%" p={4} bg="gray.100" borderTop="1px solid gray">
            <Flex justifyContent="center">
              {/* File Upload Section */}
              <Flex alignItems="center" mr={6}>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  hidden
                />
                <Button
                  leftIcon={<AttachmentIcon />}
                  colorScheme="blue"
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  Upload File
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
              </Flex>
  
              {/* Text Input Section */}
              <Button onClick={() => setIsModalOpen(true)}>Insert Text</Button>
            </Flex>
          </Box>
  
          {/* Modal for Text Input */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Insert Text</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Textarea
                  value={modalInputText}
                  onChange={handleModalInputChange}
                  placeholder="Enter your text here..."
                  size="lg"
                  minHeight="600px"
                  width="100%"
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button variant="ghost">Insert</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Flex>
  );
  

  
  
};

export default HomePage;
