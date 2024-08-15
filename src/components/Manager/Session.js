import React, { useContext } from "react";
import { Box, Heading, Text, Image, Button, FormControl, FormLabel, VStack, HStack, Spinner } from "@chakra-ui/react";
import { activateChatbot } from "./functions";
import { ProfileContext } from "../../hooks/ProfileContext";

/**
 * {
    connectionStatus: "inactive", // 'inactive', 'connected', 'desconnected'
    syncStatus: "saved", // 'saved', 'saving', 'error'
    isLoading: false,
    qrCode: null,
    qrError: null,
  }
 */

function Session({ session, setSession, chatbotConfig }) {
  const { profile } = useContext(ProfileContext);

  const generateQRCode = () => {
    // Define o estado de carregamento e limpa qualquer erro existente
    setSession((prevSession) => ({
      ...prevSession,
      isLoading: true,
      qrCode: null,
      qrError: null,
    }));

    // Chama a função para ativar o chatbot
    activateChatbot(session, setSession, { ...chatbotConfig, profile });
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>
        Sessão Whats App
      </Heading>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4} align="stretch">
          <FormLabel>Status da Conexão:</FormLabel>
          {session.connectionStatus === "online" && <Box color="green.500">Online</Box>}
          {session.connectionStatus === "disable" && <Box color="gray.500">Desabilitado</Box>}
          {session.connectionStatus === "offline" && <Box color="red.500">Offline</Box>}
        </HStack>
        <FormControl>
          {session.isLoading ? (
            <Spinner size="xl" />
          ) : session.qrCode ? (
            <Image src={`data:image/png;base64,${session.qrCode}`} alt="QR Code" boxSize="264px" />
          ) : session.qrError ? (
            <Box textAlign="center">
              <Text fontSize="xl" color="red.500">
                X
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2}>
                Falha ao gerar QR Code, tente novamente mais tarde.
              </Text>
            </Box>
          ) : (
            <Box width="264px" height="264px" bg="gray.100" />
          )}
          {!session.qrError && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              O QR Code aparecerá aqui quando disponível. Escaneie com o WhatsApp para sincronizar.
            </Text>
          )}
        </FormControl>

        <Button colorScheme="blue" width="200px" onClick={generateQRCode}>
          Conectar Dispositivo
        </Button>
      </VStack>
    </Box>
  );
}

export default Session;
