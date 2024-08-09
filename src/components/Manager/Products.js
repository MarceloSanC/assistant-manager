import React, {useContext} from 'react';
import { Box, Heading, Input, FormControl, FormLabel, VStack, Text } from '@chakra-ui/react';
import { handleChatbotConfigChange, formatProductList } from './functions';
import { ProfileContext } from '../../contexts/Profile';

function Products({ products, setProducts, setSyncStatus }) {
  const { profile, } = useContext(ProfileContext);
  
  const handleProductsChange = (field, value) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [field]: value,
    }));
    handleChatbotConfigChange(field, value, profile.phoneNumber, setSyncStatus);
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      formatProductList(file, (formattedList) => {
        setProducts((prevProducts) => ({
          ...prevProducts,
          [field]: formattedList,
        }));
        handleChatbotConfigChange(field, formattedList, profile.phoneNumber, setSyncStatus);
      });
    }
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>Produtos e Adicionais</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Tabela de Cardápio Diurno:</FormLabel>
          <Input
            type="file"
            onChange={(e) => handleFileUpload('dayCsvFile', e.target.files[0])}
          />
          <Text fontSize="sm" color="gray.500">Envie um arquivo .csv ou .xlsx com o cardápio diurno.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Lista de IDs dos Produtos Mais Pedidos Diurno:</FormLabel>
          <Input
            type="text"
            value={products.topDayProductsId}
            onChange={(e) => handleProductsChange('topDayProductsId', e.target.value)}
          />
          <Text fontSize="sm" color="gray.500">Insira uma lista de IDs dos produtos mais pedidos durante o dia.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Tabela de Cardápio Noturno:</FormLabel>
          <Input
            type="file"
            onChange={(e) => handleFileUpload('nightCsvFile', e.target.files[0])}
          />
          <Text fontSize="sm" color="gray.500">Envie um arquivo .csv ou .xlsx com o cardápio noturno.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Lista de IDs dos Produtos Mais Pedidos Noturno:</FormLabel>
          <Input
            type="text"
            value={products.topNightProductsId}
            onChange={(e) => handleProductsChange('topNightProductsId', e.target.value)}
          />
          <Text fontSize="sm" color="gray.500">Insira uma lista de IDs dos produtos mais pedidos durante a noite.</Text>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Products;