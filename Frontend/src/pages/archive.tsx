import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Spacer,
    Image,
    VStack,
    Input,
    Center,
    useToast,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';
import AWS from 'aws-sdk';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { AttachmentIcon } from '@chakra-ui/icons';

// Configure the AWS SDK
AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

const uploadPDFToS3 = (file: any) => {
    const params = {
        Bucket: 'sunhacks23',
        Key: `pdf/${file.name}`,
        Body: file,
        ContentType: 'application/pdf',
    };

    s3.upload(params, function (err: any, data: any) {
        if (err) {
            console.error('There was an error uploading your file: ', err);
            return false;
        }
        console.log('Successfully uploaded file.', data);
        return true;
    });
};

const FileUploadButton = ({ onFileChange }) => {
    return (
        <>
            <Input
                id="file-input"
                type="file"
                p={1}
                accept="application/pdf"
                onChange={onFileChange}
                hidden
            />
            <Button
                leftIcon={<AttachmentIcon />}
                colorScheme="blue"
                size="md"
                onClick={() => document.getElementById('file-input').click()}
            >
                Choose File
            </Button>
        </>
    );
};


const NavBar = () => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1rem"
            bg="#1d0148"
            color="white"
        >
            <Link href="/" passHref>
                <Flex align="center" mr={5} cursor="pointer">
                <Image
                            src="/logo_square.webp"
                            alt="Your Logo"
                            width="70px"
                            height="70px"
                            mr="20px"
                        />
                        <Image
                            src="/logo_text.png"
                            alt="Your Logo"
                            width="300px"
                            height="50px"
                        />
                </Flex>
            </Link>
            <Spacer />
            <Box display={{ base: 'none', md: 'flex' }} mt={{ base: 4, md: 0 }}>
                {/* Navigation Menu Items */}
                <NavItem title="Home" href="/" />
                <NavItem title="Features" href="/features" />
                <NavItem title="Pricing" href="/pricing" />
                <NavItem title="Support" href="/support" />
            </Box>
            <Button variant="solid" backgroundColor="#4A90E2" color="white" _hover={{ bg: "#8C54FF" }} leftIcon={<FiLogIn />}>
                Log in
            </Button>
        </Flex>
    );
};

const NavItem = ({ title, href }) => {
    return (
        <Link href={href} passHref>
            <Text
                as="a"
                mr={6}
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                p={2}
            >
                {title}
            </Text>
        </Link>
    );
};

const FileUploadSection = ({ file, setFile, isUploading, uploadFile }) => {
    return (
        <Center flexDirection="column" py={12}>
            <VStack spacing={5} width="100%" maxW="lg" mx="auto">
                <Heading as="h3" size="lg">
                    Upload Your File
                </Heading>
                <Text textAlign="center" color="gray.600">
                    If you have a file you want to work with, start by uploading it here.
                </Text>
                <FileUploadButton onFileChange={setFile} />
                {file && (
                    <Button
                        colorScheme="blue"
                        size="md"
                        onClick={uploadFile}
                        isLoading={isUploading}
                        loadingText="Uploading..."
                    >
                        Upload
                    </Button>
                )}
            </VStack>
        </Center>
    );
};

const WelcomeBanner = ({ gradientStart, gradientEnd }) => {
    return (
        <Flex
            height={{ base: '50vh', md: '75vh' }}
            alignItems="center"
            justifyContent="center"
            position="relative"
            bgGradient={`linear(to-l, ${gradientStart}, ${gradientEnd})`}
            p={4}
        >
            <Heading
                as="h2"
                size="2xl"
                textAlign="center"
                color="white"
                position="absolute"
            >
                Welcome to Susinator
            </Heading>
        </Flex>
    );
};



const HomePage = () => {
    const toast = useToast();
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Define the gradients for light and dark mode
    const gradientStart = useColorModeValue("blue.200", "blue.600");
    const gradientEnd = useColorModeValue("purple.500", "purple.900");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files ? event.target.files[0] : null;
        setFile(uploadedFile);
    };

    const handleFileUpload = () => {
        if (file) {
            setIsUploading(true);
            uploadPDFToS3(file);
        }
    };

    const uploadPDFToS3 = (file: File) => {
        const params = {
            Bucket: 'sunhacks23',
            Key: `pdf/${file.name}`,
            Body: file,
            ContentType: 'application/pdf',
        };

        s3.upload(params, (err: any, data: any) => {
            setIsUploading(false);
            if (err) {
                console.error('There was an error uploading your file: ', err);
                toast({
                    title: 'Upload Failed',
                    description: "There was an error uploading your file.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            console.log('Successfully uploaded file.', data);
            toast({
                title: 'File Uploaded!',
                description: "We've received your file.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setFile(null); // Reset the file
        });
    };


    return (
        <Box>
            <NavBar />
            <WelcomeBanner gradientStart={gradientStart} gradientEnd={gradientEnd} />
            <Center flexDirection="column" py={12}>
                <VStack spacing={5} width="100%" maxW="lg" mx="auto">
                    <Heading as="h3" size="lg">
                        Upload Your File
                    </Heading>
                    <Text textAlign="center" color="gray.600">
                        If you have a file you want to work with, start by uploading it here.
                    </Text>
                    <FileUploadButton onFileSelected={handleFileChange} />
                    {file && !isUploading && (
                        <UploadButton onUpload={handleFileUpload} />
                    )}
                    {isUploading && (
                        <Text>Uploading...</Text>
                    )}
                </VStack>
            </Center>
            {/* Other sections would go here */}
        </Box>
    );
};

export default HomePage;