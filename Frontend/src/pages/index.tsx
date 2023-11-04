import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box textAlign="center" fontSize="xl" p={8}>
      <VStack spacing={8}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="/vercel.svg" // replace with your logo or image path
          alt="Chakra UI Logo"
        />
        <Heading>Welcome to My Next.js App!</Heading>
        <Text>Powered by Next.js and Chakra UI.</Text>
        <Button colorScheme="blue" size="lg">
          Get Started
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;
