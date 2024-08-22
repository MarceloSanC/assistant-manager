import React, { useContext } from "react";
import { Box, Heading, FormLabel, Switch, Input, VStack, Text } from "@chakra-ui/react";
import { handleChatbotConfigChange } from "./functions";
import { ProfileContext } from "../../hooks/ProfileContext";
import { SessionContext } from '../../hooks/SessionContext';

function Sales({ sales, setSales, setSyncStatus }) {
  const { profile } = useContext(ProfileContext);
  const { session, } = useContext(SessionContext);

  const updateData = (key, value) => {
    if (session.connectionStatus === 'connected' || session.connectionStatus === 'disconnected'){
      handleChatbotConfigChange(key, value, `${profile.countryCode} ${profile.phoneNumber}`, setSyncStatus);
    }
  }

  const handleSalesChange = (field) => {
    setSales((sales) => ({
      ...sales,
      [field]: !sales[field],
    }));
    updateData(field, sales[field]);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setSales((sales) => ({
      ...sales,
      timeToOfferRecurringProducts: value,
    }));
    updateData("timeToOfferRecurringProducts", value);
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h1" size="lg" mb={6}>
        Vendas
      </Heading>

      <Box mb={4}>
        <Heading as="h2" size="md" mb={4}>
          Cardapio Whats App
        </Heading>
        <VStack spacing={4} align="left">
          <FormLabel htmlFor="only-top-products" mb="0">
            Mostrar apenas produtos mais pedidos:
          </FormLabel>
          <Switch
            id="only-top-products"
            isChecked={sales.onlyTopProducts}
            onChange={() => handleSalesChange("onlyTopProducts")}
          />
        </VStack>
        <Text fontSize="sm" color="gray.500" mt={2} mb={4}>
          Ative para mostrar apenas a categoria dos produtos mais pedidos no fluxo do Cardapio no Whats App (O Cardapio online não é alterado).
        </Text>
      </Box>

      <Box mb={4}>
        <Heading as="h2" size="md" mb={4}>
          Produtos Recomendados
        </Heading>
        <VStack spacing={4} align="left">
          <FormLabel htmlFor="product-recommendations" mb="0">
            Recomendação de Produtos:
          </FormLabel>
          <Switch
            id="product-recommendations"
            isChecked={sales.productRecommendations}
            onChange={() => handleSalesChange("productRecommendations")}
          />
        </VStack>
        <Text fontSize="sm" color="gray.500" mt={2} mb={4}>
          Ative ou desative a recomendação de produtos.
        </Text>
      </Box>

      <Box mb={4}>
        <Heading as="h2" size="md" mb={4}>
          Produtos Recorrentes
        </Heading>
        <VStack spacing={4} align="left">
          <FormLabel htmlFor="recurring-products-resell" mb="0">
            Revenda de Produtos Recorrentes:
          </FormLabel>
          <Switch
            id="recurring-products-resell"
            isChecked={sales.recurringProductsResell}
            onChange={() => handleSalesChange("recurringProductsResell")}
          />
        </VStack>
        <Text fontSize="sm" color="gray.500" mt={2} mb={4}>
          Ative ou desative a revenda de produtos recorrentes.
        </Text>

        <VStack spacing={4} align="left">
          <FormLabel htmlFor="time-to-offer" mb="0">
            Tempo para Oferecer Produtos Recorrentes:
          </FormLabel>
          <Input
            id="time-to-offer"
            type="text"
            style={{ width: "10%", minWidth: "100px", textAlign: "center" }}
            value={sales.timeToOfferRecurringProducts}
            onChange={handleTimeChange}
          />
        </VStack>
      </Box>
    </Box>
  );
}

export default Sales;
