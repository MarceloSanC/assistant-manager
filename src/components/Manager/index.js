import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Image, VStack } from '@chakra-ui/react';
import logoBix from '../../assets/images/Logo-Bix.png';
import Profile from './Profile';
import Products from './Products';
import Modality from './Modality';
import Groups from './Groups';
import Sales from './Sales';
import Messages from './Messages';
import Session from './Session';
import { handlePageConfigChange } from './functions';
import { ProfileProvider } from '../../contexts/Profile';

function Manager() {
  const [pageConfig, setPageConfig] = useState({
    currentSection: 'profile',
    errors: {},
    isLoading: false,
    qrCode: null,
    qrError: null
  });

  const [products, setProducts] = useState({
    dayCsvFile: null,
    topDayProductsId: "2,6,9,35,39,48",
    nightCsvFile: null,
    topNightProductsId: "2,6,9,24,30,86,119"
  });

  const [modality, setModality] = useState({
    modality: 'Mesa',
    tableInterval: { min: 1, max: 10 },
    excludedValues: ""
  });

  const [groups, setGroups] = useState({
    orders: true,
    cashier: true,
    attendant: true,
    waiter: true
  });

  const [sales, setSales] = useState({
    productRecommendations: true,
    recurringProductsResell: true,
    timeToOfferRecurringProducts: "30"
  });

  const [messages, setMessages] = useState({
    genericMessage1: "",
    genericMessage2: "",
    genericMessage3: ""
  });

  const [session, setSession] = useState({
    connectionStatus: "Desconectado",
    qrCode: null
  });

  const [syncStatus, setSyncStatus] = useState('salvo'); // 'salvo', 'salvando...', 'erro de sincronização'

  const renderSection = () => {
    switch (pageConfig.currentSection) {
      case 'profile':
        return <Profile setSyncStatus={setSyncStatus} />;
      case 'products':
        return <Products products={products} setProducts={setProducts} setSyncStatus={setSyncStatus} />;
      case 'modality':
        return <Modality modality={modality} setModality={setModality} setSyncStatus={setSyncStatus} />;
      case 'groups':
        return <Groups groups={groups} setGroups={setGroups} setSyncStatus={setSyncStatus} />;
      case 'sales':
        return <Sales sales={sales} setSales={setSales} setSyncStatus={setSyncStatus} />;
      case 'messages':
        return <Messages messages={messages} setMessages={setMessages} setSyncStatus={setSyncStatus} />;
      case 'session':
        return <Session session={session} setSession={setSession} setSyncStatus={setSyncStatus} />;
      default:
        return null;
    }
  };

  return (
    <ProfileProvider>
      {/* Seção Heading */}
      <Flex direction="column" width="100%">
        <Flex justify="space-between" align="center" bg="blue.600" p={4} width="100%">
          <Image src={logoBix} alt="Logo Bix" maxWidth="100px" height="auto" cursor="pointer" onClick={() => window.location.href = '/'} />
          <Heading as="h1" size="lg" color="white">Gerenciador Assistente Bix</Heading>
        </Flex>

        {/* Painel Principal */}
        <Flex direction="column" flex="1" width="100%">
          {/* Barra de Ferramentas */}
          <Box bg="gray.200" p={2} height="20px">
            <Flex justify="flex-end" align="center" height="100%">
              {syncStatus === 'salvo' && <Box color="green.500">Salvo ✓</Box>}
              {syncStatus === 'salvando...' && <Box color="blue.500">Salvando...</Box>}
              {syncStatus === 'erro de sincronização' && <Box color="red.500">Erro de Sincronização</Box>}
            </Flex>
          </Box>

          {/* Painel de Conteúdo */}
          <Flex width="100%" justify="center">
            <VStack align="stretch" spacing={4} width="20%" bg="white" p={4}>
              <Button
                colorScheme={pageConfig.currentSection === 'session' ? 'blue' : 'gray'}
                onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'session')}
              >
                Sessão Whats App
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === 'profile' ? 'blue' : 'gray'}
                onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'profile')}
              >
                Perfil Whats App
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === 'products' ? 'blue' : 'gray'}
                onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'products')}
              >
                Produtos e Adicionais
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === 'modality' ? 'blue' : 'gray'}
                onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'modality')}
              >
                Modalidade
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === 'groups' ? 'blue' : 'gray'}
                onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'groups')}
              >
                Grupos
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === 'sales' ? 'blue' : 'gray'}
                onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'sales')}
              >
                Vendas
              </Button>
              <Button
                colorScheme={pageConfig.currentSection === 'messages' ? 'blue' : 'gray'}
                onClick={() => handlePageConfigChange(setPageConfig, 'currentSection', 'messages')}
              >
                Mensagens
              </Button>
            </VStack>
            <Box flex="1" p={4}>
              {renderSection()}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </ProfileProvider>
  );
}

export default Manager;