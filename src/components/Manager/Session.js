import React from 'react';
import { Box, Heading, Text, Image, Button, FormControl, FormLabel, VStack } from '@chakra-ui/react';

function Session({ session, setSession }) {
  const generateQRCode = () => {
    // Função para gerar QR Code aqui
    // Exemplo de atualização do estado:
    setSession((prevSession) => ({
      ...prevSession,
      qrCode: 'new-qr-code-url'
    }));
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>Sessão Whats App</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Status da Conexão:</FormLabel>
          <Text>{session.connectionStatus}</Text>
          <Text fontSize="sm" color="gray.500">Exibe o status da conexão com o WhatsApp.</Text>
        </FormControl>
        <FormControl>
          {session.qrCode ? (
            <Image src={session.qrCode} alt="QR Code" />
          ) : (
            <Text>Nenhum QR Code disponível.</Text>
          )}
          <Text fontSize="sm" color="gray.500">Mostra o QR Code quando disponível.</Text>
        </FormControl>
        <Button colorScheme="blue" onClick={generateQRCode}>
          Gerar QR Code
        </Button>
      </VStack>
    </Box>
  );
}

export default Session;