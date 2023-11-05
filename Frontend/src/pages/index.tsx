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
} from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi';
import { useState } from 'react';

const HomePage = () => {
    const toast = useToast();
    const [file, setFile] = useState(null);
    const background = useColorModeValue('gray.200', 'gray.700'); // You can replace this with an image if you prefer

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleFileUpload = () => {
        // Implement the actual upload logic here
        toast({
            title: 'File Uploaded!',
            description: "We've received your file.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };
    return (
        <Box>
            {/* Top Bar */}
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1rem"
                bg="teal.500"
                color="white"
            >
                <Flex align="center" mr={5}>
                    <Image
                        src="/your-logo.svg" // Replace with your logo image path
                        alt="Your Logo"
                        boxSize="50px"
                    />
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        Your App Name
                    </Heading>
                </Flex>

                <Spacer />

                <Box display={{ base: 'none', md: 'flex' }} mt={{ base: 4, md: 0 }}>
                    {/* Navigation Menu Items */}
                    <Text mr={6}>Home</Text>
                    <Text mr={6}>Features</Text>
                    <Text mr={6}>Pricing</Text>
                    <Text>Support</Text>
                </Box>

                <Button
                    variant="outline"
                    color="white"
                    _hover={{ bg: 'teal.700', borderColor: 'white' }}
                    leftIcon={<FiLogIn />}
                >
                    Log in
                </Button>
            </Flex>

            {/* Graphic / Background Section */}
            <Flex
                height="50vh"
                alignItems="center"
                justifyContent="center"
                bg={background}
            >
                <Heading as="h2" size="2xl" textAlign="center">
                    Inspiring Quote or Tagline Here
                </Heading>
                {/* You can replace the background with an Image component if you have a specific graphic in mind */}
            </Flex>

            {/* File Upload Section */}
            <Center flexDirection="column" py={12}>
                <VStack spacing={5} width="100%" maxW="lg" mx="auto">
                    <Heading as="h3" size="lg">
                        Upload Your File
                    </Heading>
                    <Text textAlign="center" color="gray.600">
                        If you have a file you want to work with, start by uploading it here.
                    </Text>
                    <Input
                        type="file"
                        p={1}
                        accept="*/*" // You can specify the file types you want to accept
                        onChange={handleFileChange}
                    />
                    {file && (
                        <Button
                            colorScheme="blue"
                            size="md"
                            onClick={handleFileUpload}
                        >
                            Upload
                        </Button>
                    )}
                </VStack>
            </Center>
        </Box>
    );
};

export default HomePage;