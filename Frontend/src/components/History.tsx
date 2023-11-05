import React from "react";
import {
  Box, Text, VStack,
  Icon, Heading
} from "@chakra-ui/react";
import {ChatIcon } from "@chakra-ui/icons";

const chatMessages = [
    { id: 1, content: "Reviewing Terms in a New Rental Agreement" },
    { id: 2, content: "Analyzing a Job Offer Contract for Unusual Clauses" },
    { id: 3, content: "Spotting Red Flags in a Service Agreement" },
    { id: 4, content: "Checking a Business Contract for Deceptive Terms" },
    { id: 5, content: "Understanding Fine Print in an Insurance Policy" },
    { id: 6, content: "Comparing Two Contracts for Differences in Terms" },
    { id: 7, content: "Examining a Loan Agreement for Unfair Conditions" },
    { id: 8, content: "Clarifying Complex Language in a Legal Document" },
    { id: 9, content: "Identifying Hidden Fees in a Subscription Service Contract" },
    { id: 10, content: "Verifying Compliance in a Company's Terms of Service" },
    { id: 11, content: "Evaluating a Non-Disclosure Agreement for Clarity" },
    { id: 12, content: "Reviewing a Lease Contract for Ambiguous Terms" },
    { id: 13, content: "Assessing a Partnership Agreement for Equitability" },
    { id: 14, content: "Detecting Potential Loopholes in a Sales Contract" },
    { id: 15, content: "Investigating a Vendor Agreement for Hidden Obligations" }
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