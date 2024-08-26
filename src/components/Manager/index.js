import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Flex, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import logoBix from "../../assets/images/Logo.png";
import Profile from "./Profile";
import Products from "./Products";
import OnlineMenu from "./OnlineMenu";
import Functionalities from "./Functionalities";
import Modality from "./Modality";
import Groups from "./Groups";
import Sales from "./Sales";
import Messages from "./Messages";
import Session from "./Session";
import { handlePageConfigChange, checkConnectionStatus } from "./functions";
import { ProfileProvider, ProfileContext } from "../../hooks/ProfileContext";
import { SessionProvider, SessionContext } from "../../hooks/SessionContext";

function Manager() {
  const { session, setSession } = useContext(SessionContext);
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    console.log('useEffect');
    checkConnectionStatus(profile.countryCode + profile.phoneNumber, setSession);
  }, [profile.phoneNumber, profile.countryCode, setSession]);

  const [pageConfig, setPageConfig] = useState({
    currentSection: "session",
    errors: {},
  });

  const [products, setProducts] = useState({
    dayCsvFile: null,
    dayProductsList: {},
    topDayProductsId: "2,6,9,35,39,48",
    nightCsvFile: null,
    nightProductsList: {},
    topNightProductsId: "2,6,9,24,30,86,119",
  });

  const [onlineMenu, setOnlineMenu] = useState({
    enabled: true,
    link: "https://tocadosurubim.menudigital.net.br/#/catalogo",
  });

  const [functionalities, setFunctionalities] = useState({
    satisfactionPoll: true,
    enableFAQ: true,
    faqLink: "",
  });

  const [modality, setModality] = useState({
    modality: "Mesa",
    tableInterval: { min: 1, max: 100 },
    excludedValues: "",
  });

  const [groups, setGroups] = useState({
    orders: true,
    cashier: true,
    attendant: true,
    waiter: true,
  });

  const [sales, setSales] = useState({
    onlyTopProducts: false,
    productRecommendations: true,
    recurringProductsResell: true,
    timeToOfferRecurringProducts: "30",
    satisfactionPoll: true,
  });

  const [messages, setMessages] = useState({
    orderCompletionMessage: "",
    genericMessage2: "",
    genericMessage3: "",
  });

  const renderSection = () => {
    switch (pageConfig.currentSection) {
      case "session":
        return (
          <Session
            session={session}
            setSession={setSession}
            chatbotConfig={{
              products: products,
              modality: modality,
              groups: groups,
              sales: sales,
              messages: messages,
              onlineMenu: onlineMenu,
            }}
          />
        );
      case "profile":
        return <Profile setSyncStatus={(status) => setSession((prev) => ({ ...prev, syncStatus: status }))} />;
      case "products":
        return (
          <Products
            products={products}
            setProducts={setProducts}
            setSyncStatus={(status) => setSession((prev) => ({ ...prev, syncStatus: status }))}
          />
        );
      case "onlineMenu":
        return (
          <OnlineMenu
            onlineMenu={onlineMenu}
            setOnlineMenu={setOnlineMenu}
            setSyncStatus={(status) => setSession((prev) => ({ ...prev, syncStatus: status }))}
          />
        );
      case "functionalities":
        return (
          <Functionalities
            functionalities={functionalities}
            setFunctionalities={setFunctionalities}
            setSyncStatus={(status) => setSession((prev) => ({ ...prev, syncStatus: status }))}
          />
        );
      case "modality":
        return (
          <Modality
            modality={modality}
            setModality={setModality}
            setSyncStatus={(status) => setSession((prev) => ({ ...prev, syncStatus: status }))}
          />
        );
      case "groups":
        return <Groups groups={groups} setGroups={setGroups} setSyncStatus={(status) => setSession((prev) => ({ ...prev, syncStatus: status }))} />;
      case "sales":
        return <Sales sales={sales} setSales={setSales} setSyncStatus={(status) => setSession((prev) => ({ ...prev, syncStatus: status }))} />;
      case "messages":
        return (
          <Messages
            messages={messages}
            setMessages={setMessages}
            setSyncStatus={(status) => setSession((prev) => ({ ...prev, syncStatus: status }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SessionProvider>
      <ProfileProvider>
        <Flex direction="column" width="100%">
          {/* Cabeçalho */}
          <Flex justify="flex-start" align="center" bg="#4b5e7d" p={4} width="100%">
            {/* Logo à esquerda */}
            <Image src={logoBix} alt="Logo Bix" maxWidth="100px" height="auto" cursor="pointer" onClick={() => (window.location.href = "/")} />

            {/* Texto ao lado da logo */}
            <Heading as="h1" paddingLeft={50} size="lg" color="white" ml={4} fontFamily="Helvetica" fontSize="4xl">
              Gerenciador Assistente Bix
            </Heading>
          </Flex>

          {/* Barra de Status */}
          <Box bg="gray.200" p={2} height="20px">
            <Flex justify="flex-start" align="center" height="100%">
              {" "}
              {/* Alinhamento à esquerda */}
              <HStack spacing={4}>
                <Box onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "session")} cursor="pointer">
                  {session.connectionStatus === "online" && <Box color="green.500">Status Chatbot: Online</Box>}
                  {session.connectionStatus === "disable" && <Box color="gray.500">Status Chatbot: Desabilitado</Box>}
                  {session.connectionStatus === "waiting-scan" && <Box color="blue.500">Status Chatbot: Aguardando Sincronização</Box>}
                  {session.connectionStatus === "offline" && <Box color="red.500">Status Chatbot: Offline</Box>}
                </Box>
                <Box height="15px" borderLeft="1px" borderColor="gray.400" />
                <Box>
                  {session.syncStatus === "saved" && <Box color="green.500">Dados: Salvo ✓</Box>}
                  {session.syncStatus === "saving" && <Box color="blue.500">Dados: Salvando...</Box>}
                  {session.syncStatus === "error" && <Box color="red.500">Dados: Erro de Sincronização</Box>}
                </Box>
                <Box height="15px" borderLeft="1px" borderColor="gray.400" />
              </HStack>
            </Flex>
          </Box>

          {/* Painel de Conteúdo */}
          <Flex width="100%" justify="center">
            <VStack align="stretch" spacing={4} width="250px" bg="white" p={4}>
              <Button
                colorScheme={pageConfig.currentSection === "session" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "session")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Sessão Whats App
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === "profile" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "profile")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Perfil Whats App
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === "products" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "products")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Produtos e Adicionais
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === "onlineMenu" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "onlineMenu")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Cardápio Online
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === "modality" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "modality")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Modalidade
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === "functionalities" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "functionalities")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Funcionalidades
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === "groups" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "groups")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Grupos
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === "sales" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "sales")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Vendas
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === "messages" ? "blue" : "gray"}
                onClick={() => handlePageConfigChange(setPageConfig, "currentSection", "messages")}
                justifyContent="flex-start"
                textAlign="left"
                minWidth="200px"
              >
                Mensagens
              </Button>
            </VStack>

            {/* Seção de Conteúdo Dinâmico */}
            <Box flex="1" p={6} width="600px">
              {renderSection()}
            </Box>
          </Flex>
        </Flex>
      </ProfileProvider>
    </SessionProvider>
  );
}

export default Manager;
