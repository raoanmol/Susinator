import React from "react";
import {
  Box, Text, VStack,
  Icon, Heading
} from "@chakra-ui/react";
import {ChatIcon } from "@chakra-ui/icons";


const chatMessages = [
    { id: 1, content: "Hey there! How can I help you today?" },
    { id: 2, content: "I'm looking for assistance with my account." },
    { id: 3, content: "Certainly! Could you please provide me with your account number?" },
    { id: 4, content: "It's 123456789. Thank you!" },
    { id: 5, content: "You're welcome! I'll look that up for you right now." },
    // ... add more sample messages as needed
  ];

  const ChatMessage = ({ content }) => (
    <Box
      pl={4}
      pr={4}
      pt={2}
      pb={2}
      display="flex"
      alignItems="center"
      bg="gray.300"
      borderBottom="1px solid"
      borderColor="gray.200"
      _last={{ borderBottom: 'none' }} // Removes border from the last item
    >
      <Icon as={ChatIcon} color="gray.500" mr={3} />
      <Text isTruncated maxWidth="90%">
        {content}
      </Text>
    </Box>
  );


  export default function History() {
  return(
    <Box w="25%" bg="gray.300" p={4} borderRight="1px solid gray" shadow="sm">
          <Heading size="md" mb={4}>History</Heading>
          <VStack align="stretch" spacing={4} overflowY="auto">
            {chatMessages.map((message) => (
              <ChatMessage key={message.id} content={message.content} />
            ))}
          </VStack>
        </Box>
  );
}