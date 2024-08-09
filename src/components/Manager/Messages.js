import React, {useContext} from 'react';
import { Box, Heading, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import { handleChatbotConfigChange } from './functions';
import { ProfileContext } from '../../contexts/Profile';

function Messages({ messages, setMessages, setSyncStatus }) {
  const { profile, } = useContext(ProfileContext);

  const handleMessagesChange = (field, value) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [field]: value
    }));
    handleChatbotConfigChange(field, value, profile.phoneNumber, setSyncStatus);
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>Mensagens</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Mensagem Genérica 1:</FormLabel>
          <Input
            type="text"
            value={messages.genericMessage1}
            onChange={(e) => handleMessagesChange('genericMessage1', e.target.value)}
          />
          <Text fontSize="sm" color="gray.500">Insira a mensagem genérica 1.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Mensagem Genérica 2:</FormLabel>
          <Input
            type="text"
            value={messages.genericMessage2}
            onChange={(e) => handleMessagesChange('genericMessage2', e.target.value)}
          />
          <Text fontSize="sm" color="gray.500">Insira a mensagem genérica 2.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Mensagem Genérica 3:</FormLabel>
          <Input
            type="text"
            value={messages.genericMessage3}
            onChange={(e) => handleMessagesChange('genericMessage3', e.target.value)}
          />
          <Text fontSize="sm" color="gray.500">Insira a mensagem genérica 3.</Text>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Messages;