import React, { useContext } from 'react';
import { Box, Heading, FormControl, FormLabel, Switch, Input, VStack, Text } from '@chakra-ui/react';
import { handleChatbotConfigChange } from './functions';
import { ProfileContext } from '../../contexts/Profile';

function Sales({ sales, setSales, setSyncStatus }) {
  const { profile, } = useContext(ProfileContext);

  const handleSalesChange = (field) => {
    setSales(sales => ({
      ...sales,
      [field]: !sales[field]
    }));
    handleChatbotConfigChange(field, sales[field], profile.phoneNumber, setSyncStatus);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setSales(sales => ({
      ...sales,
      timeToOfferRecurringProducts: value
    }));
    handleChatbotConfigChange('timeToOfferRecurringProducts', sales.timeToOfferRecurringProducts, profile.phoneNumber, setSyncStatus);
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>Vendas</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="product-recommendations" mb="0">
            Recomendação de Produtos:
          </FormLabel>
          <Switch
            id="product-recommendations"
            isChecked={sales.productRecommendations}
            onChange={() => handleSalesChange('productRecommendations')}
          />
          <Text fontSize="sm" color="gray.500" ml={2}>Ative ou desative a recomendação de produtos.</Text>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="recurring-products-resell" mb="0">
            Revenda de Produtos Recorrentes:
          </FormLabel>
          <Switch
            id="recurring-products-resell"
            isChecked={sales.recurringProductsResell}
            onChange={() => handleSalesChange('recurringProductsResell')}
          />
          <Text fontSize="sm" color="gray.500" ml={2}>Ative ou desative a revenda de produtos recorrentes.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Tempo para Oferecer Produtos Recorrentes:</FormLabel>
          <Input
            type="text"
            style={{ width: "10%", minWidth: "100px", textAlign: "center" }}
            value={sales.timeToOfferRecurringProducts}
            onChange={handleTimeChange}
            placeholder="hh:mm"
          />
          <Text fontSize="sm" color="gray.500">Insira o tempo para oferecer produtos recorrentes.</Text>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Sales;