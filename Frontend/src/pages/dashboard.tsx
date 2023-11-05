import React, { useState } from "react";
import { Box, Flex, Text, VStack, Button, useToast } from "@chakra-ui/react";
import Header from "../components/Header";
import { AttachmentIcon } from "@chakra-ui/icons";
import AWS from "aws-sdk";
import axios from "axios";

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: "AKIA4E4YW6AGEX2SKZT5",
  secretAccessKey: "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",
  region: "us-east-2",
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

  const handleFileUpload = async () => {
    if (file) {
      setIsUploading(true);

      try {
        const response = await axios.get("http://127.0.0.1:80/bucket"); // Make Axios request
        console.log(response);
        const bucketName = response.data;

        const params = {
          Bucket: bucketName,
          Key: `pdf/${file.name}`,
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
        {" "}
        {/* Adjust pt based on Header's height */}
        {/* History Section */}
        <Box w="25%" bg="gray.50" p={4} overflowY="auto">
          {/* ... Your history content ... */}
        </Box>
        {/* File Upload and Result Section */}
        <Flex w="75%" flexDirection="column" p={4} bg="white">
          <VStack spacing={4}>
            <Text fontSize="xl" fontWeight="bold">
              Upload a file
            </Text>
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
