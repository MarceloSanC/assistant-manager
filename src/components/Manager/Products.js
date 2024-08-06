import React from 'react';
import { Box, Heading, Input, FormControl, FormLabel, VStack, Text } from '@chakra-ui/react';

function Products({ products, setProducts }) {
  const handleProductsChange = (field, value) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, file) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [field]: file,
    }));
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