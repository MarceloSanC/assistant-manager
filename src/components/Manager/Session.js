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
        <HStack spacing={4} align="stretch" marginBottom="50px">
          <FormLabel>Status da Conexão:</FormLabel>
          {session.connectionStatus === "online" && <Box color="green.500">Online</Box>}
          {session.connectionStatus === "disable" && <Box color="gray.500">Desabilitado</Box>}
          {session.connectionStatus === "offline" && <Box color="red.500">Offline</Box>}
        </HStack>
        <FormControl>
          <Box width="264px" height="264px" display="flex" justifyContent="center" alignItems="center" border="1px solid #E2E8F0" borderRadius="md">
            {session.isLoading ? (
              <VStack>
                <Spinner size="xl" />
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Inicializando seu Assistente Bix...
                </Text>
              </VStack>
            ) : session.connectionStatus === "waiting-scan" && session.qrCode ? (
              <VStack>
                <Image src={session.qrCode} alt="QR Code" boxSize="264px" />
                <Text fontSize="sm" color="red.500" mt={2}>
                  Recarrege a página se precisar gerar um novo QRCode.
                </Text>
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Escaneie com o WhatsApp para sincronizar.
                </Text>
              </VStack>
            ) : session.connectionStatus === "online" ? (
              <VStack>
                <Text fontSize="xl" fontWeight="bold" align="center">
                  Assistente Bix já sincronizado!
                </Text>
              </VStack>
            ) : session.qrError ? (
              <VStack>
                <Text fontSize="xl" color="red.500" fontWeight="bold">
                  X
                </Text>
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Falha ao gerar QR Code, reinicie a página e tente novamente mais tarde.
                </Text>
              </VStack>
            ) : (
              <Box bg="gray.100" width="264px" height="264px" />
            )}
          </Box>
        </FormControl>

        <Button colorScheme="blue" width="200px" onClick={generateQRCode}>
          Conectar Dispositivo
        </Button>
      </VStack>
    </Box>
  );
}

export default Session;
