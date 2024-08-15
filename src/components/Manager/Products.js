import React, { useContext, useState } from "react";
import { Box, Heading, Input, FormControl, FormLabel, VStack, Text } from "@chakra-ui/react";
import { handleChatbotConfigChange, formatProductList } from "./functions";
import { ProfileContext } from "../../hooks/ProfileContext";
import { SessionContext } from '../../hooks/SessionContext';

function Products({ products, setProducts, setSyncStatus }) {
  const { profile } = useContext(ProfileContext);
  const { session, } = useContext(SessionContext);

  const updateData = (key, value) => {
    if (session.connectionStatus === 'connected' || session.connectionStatus === 'disconnected'){
      handleChatbotConfigChange(key, value, `${profile.countryCode} ${profile.phoneNumber}`, setSyncStatus);
    }
  }

  // State variables for error messages
  const [dayErrorMessage, setDayErrorMessage] = useState("");
  const [nightErrorMessage, setNightErrorMessage] = useState("");

  const handleProductsChange = (field, value) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [field]: value,
    }));
    updateData(field, value);
  };

  const handleFileUpload = (field, file) => {
    const validTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    if (!validTypes.includes(file.type)) {
      const errorMessage = `Tipo de arquivo inválido. Apenas arquivos .csv e .xlsx são aceitos.`;
      if (field === "dayCsvFile") {
        setDayErrorMessage(errorMessage);
      } else {
        setNightErrorMessage(errorMessage);
      }
      return;
    }

    // Update the state with the file name
    setProducts((prevProducts) => ({
      ...prevProducts,
      [field]: file.name,
    }));

    // Format the product list
    formatProductList(file, (formattedList, errors) => {
      if (errors.length > 0) {
        const errorMessage = errors.join("\n");
        if (field === "dayCsvFile") {
          setDayErrorMessage(errorMessage);
        } else {
          setNightErrorMessage(errorMessage);
        }
      } else {
        const listField = field === "dayCsvFile" ? "dayProductsList" : "nightProductsList";
        setProducts((prevProducts) => ({
          ...prevProducts,
          [listField]: formattedList,
        }));
        updateData(listField, formattedList);

        // Clear the error message
        if (field === "dayCsvFile") {
          setDayErrorMessage("");
        } else {
          setNightErrorMessage("");
        }
      }
    });
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>
        Cardápio Diurno
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Tabela de Cardápio Diurno:</FormLabel>
          <Input type="file" onChange={(e) => handleFileUpload("dayCsvFile", e.target.files[0])} height="40px" p={1} />
          <Text fontSize="sm" color="gray.500">
            Envie um arquivo .csv ou .xlsx com o cardápio diurno.
          </Text>
          {dayErrorMessage && (
            <Text fontSize="sm" color="red.500">
              {dayErrorMessage}
            </Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Lista de IDs dos Produtos Mais Pedidos Diurno:</FormLabel>
          <Input type="text" value={products.topDayProductsId} onChange={(e) => handleProductsChange("topDayProductsId", e.target.value)} />
          <Text fontSize="sm" color="gray.500">
            Insira uma lista de IDs dos produtos mais pedidos durante o dia.
          </Text>
        </FormControl>
        <Heading as="h2" size="md" mb={4}>
          Cardápio Noturno
        </Heading>
        <FormControl>
          <FormLabel>Tabela de Cardápio Noturno:</FormLabel>
          <Input type="file" onChange={(e) => handleFileUpload("nightCsvFile", e.target.files[0])} height="40px" p={1} />
          <Text fontSize="sm" color="gray.500">
            Envie um arquivo .csv ou .xlsx com o cardápio noturno.
          </Text>
          {nightErrorMessage && (
            <Text fontSize="sm" color="red.500">
              {nightErrorMessage}
            </Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Lista de IDs dos Produtos Mais Pedidos Noturno:</FormLabel>
          <Input type="text" value={products.topNightProductsId} onChange={(e) => handleProductsChange("topNightProductsId", e.target.value)} />
          <Text fontSize="sm" color="gray.500">
            Insira uma lista de IDs dos produtos mais pedidos durante a noite.
          </Text>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Products;