import React, {useContext} from 'react';
import { Box, Heading, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import { handleChatbotConfigChange } from './functions';
import { ProfileContext } from '../../hooks/ProfileContext';
import { SessionContext } from '../../hooks/SessionContext';

function Messages({ messages, setMessages, setSyncStatus }) {
  const { profile, } = useContext(ProfileContext);
  const { session, } = useContext(SessionContext);

  const updateData = (key, value) => {
    if (session.connectionStatus === 'connected' || session.connectionStatus === 'disconnected'){
      handleChatbotConfigChange(key, value, `${profile.countryCode} ${profile.phoneNumber}`, setSyncStatus);
    }
  }

  const handleMessagesChange = (field, value) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [field]: value
    }));
    updateData(field, value);
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>Mensagens</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Mensagem de finalização do pedido:</FormLabel>
          <Input
            type="text"
            value={messages.orderCompletionMessage}
            onChange={(e) => handleMessagesChange('orderCompletionMessage', e.target.value)}
          />
          <Text fontSize="sm" color="gray.500">Escreva a mensagem que será enviada aos clientes quando o pedido estiver pronto. Deve instruir o cliente sobre como retirar seu pedido..</Text>
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