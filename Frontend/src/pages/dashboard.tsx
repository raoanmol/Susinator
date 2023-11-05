import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  useToast,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  List,
  ListItem,
  IconButton,
  Checkbox,
  Icon,
  Heading,
} from "@chakra-ui/react";

import Header from "../components/Header";
import History from "../components/History";
import { AttachmentIcon, DeleteIcon, ChatIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
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

  const handleFileUpload = async (fileToUpload) => {
    if (fileToUpload) {
      setIsUploading(true);

      try {
        const response = await axios.get("http://127.0.0.1:80/bucket");
        console.log(response);
        const bucketName = response.data;

        const s3 = new AWS.S3();
        const params = {
          Bucket: bucketName,
          Key: file.name, // use the file name as the key
          Body: file,
          ContentType: file.type,
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

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [dropzoneFiles, setDropzoneFiles] = useState([]);

  const handleDropzoneChange = (files) => {
    setDropzoneFiles(files);
  };

  const handleUploadModalClose = () => {
    setUploadModalOpen(false);
  };

  const handleRemoveFile = (fileName) => {
    setDropzoneFiles(dropzoneFiles.filter((file) => file.name !== fileName));
  };

  const handleUpload = () => {
    dropzoneFiles.forEach((file) => {
      handleFileUpload(file);
    });

    setUploadModalOpen(false);
    toast({
      title: "Uploading Files...",
      description: "Your files are being uploaded.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    onDrop: handleDropzoneChange,
  });

  return (
    <Flex flexDirection="column" h="150vh">
      <Header />
      <Flex flexGrow={1} pt={{ base: "60px", md: "150px" }}>
        <History />
        <Flex w="75%" flexDirection="column" p={4} bg="gray.200">
          <Box
            position="fixed"
            bottom="0"
            w="75%"
            p={4}
            bg="gray.200"
            borderTop="1px solid gray"
            shadow="md"
          >
            <Flex justifyContent="center" alignItems="center">
              {/* File Upload Section */}
              <Flex
                alignItems="center"
                mr={6}
                borderRadius="md"
                p={2}
                shadow="sm"
              >
                <Button
                  leftIcon={<AttachmentIcon />}
                  colorScheme="purple"
                  onClick={() => setUploadModalOpen(true)}
                >
                  Upload File
                </Button>
              </Flex>

              {/* Text Input Section */}
              <Button colorScheme="purple" onClick={() => setIsModalOpen(true)}>
                Insert Text
              </Button>
            </Flex>
          </Box>

          {/* Modal for Text Input */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            size="xl"
          >
            <ModalOverlay />
            <ModalContent shadow="xl">
              <ModalHeader>Insert Text</ModalHeader>
              <ModalCloseButton />
              <ModalBody p={4}>
                <Textarea
                  value={modalInputText}
                  onChange={handleModalInputChange}
                  placeholder="Enter your text here..."
                  size="lg"
                  minHeight="600px"
                  width="100%"
                  border="1px solid blue"
                  borderRadius="md"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
                <Button variant="ghost">Insert</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Upload Modal */}
          <Modal isOpen={uploadModalOpen} onClose={handleUploadModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Upload Files</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box
                  {...getRootProps()}
                  borderWidth="2px"
                  borderStyle="dashed"
                  borderColor={isDragActive ? "blue.300" : "gray.300"}
                  p={5}
                  textAlign="center"
                >
                  <input {...getInputProps()} />
                  <p>Drag and drop files here, or click to select files</p>
                  <p>Accepted file types: PDF, TXT</p>
                </Box>
                <List spacing={3} mt={4}>
                  {dropzoneFiles.map((file, index) => (
                    <ListItem
                      key={index}
                      d="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box flex="1">{file.name}</Box>
                      <IconButton
                        aria-label="Remove file"
                        icon={<DeleteIcon />}
                        onClick={() => handleRemoveFile(file.name)}
                      />
                    </ListItem>
                  ))}
                </List>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleUploadModalClose}>Cancel</Button>
                <Button colorScheme="blue" onClick={handleUpload}>
                  Upload
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePage;
