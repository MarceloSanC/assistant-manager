import React, {useContext} from 'react';
import { Box, Heading, FormControl, FormLabel, Select, Input, VStack, Text } from '@chakra-ui/react';
import { handleChatbotConfigChange } from './functions';
import { ProfileContext } from '../../hooks/ProfileContext';

function Modality({ modality, setModality, setSyncStatus }) {
  const { profile, } = useContext(ProfileContext);

  const handleInputChange = (field, value) => {
    setModality((prevModality) => ({
      ...prevModality,
      [field]: value,
    }));
    handleChatbotConfigChange(field, value, profile.phoneNumber, setSyncStatus);
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>Modalidade</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Modalidade de Atendimento:</FormLabel>
          <Select value={modality.modality} onChange={(e) => handleInputChange('modality', e.target.value)}>
            <option value="Mesa">Mesa</option>
            <option value="Comanda">Comanda</option>
            <option value="Delivery">Delivery</option>
          </Select>
          <Text fontSize="sm" color="gray.500">Escolha a modalidade de atendimento.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Intervalo de Mesas Disponíveis:</FormLabel>
          <VStack>
            <Input
              type="number"
              placeholder="Mínimo"
              value={modality.tableInterval.min}
              onChange={(e) => handleInputChange('tableInterval', { ...modality.tableInterval, min: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Máximo"
              value={modality.tableInterval.max}
              onChange={(e) => handleInputChange('tableInterval', { ...modality.tableInterval, max: e.target.value })}
            />
          </VStack>
          <Text fontSize="sm" color="gray.500">Insira o intervalo de mesas disponíveis.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Excluir Valores:</FormLabel>
          <Input
            type="text"
            value={modality.excludedValues}
            onChange={(e) => handleInputChange('excludedValues', e.target.value)}
          />
          <Text fontSize="sm" color="gray.500">Insira uma lista de valores a serem excluídos.</Text>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Modality;
