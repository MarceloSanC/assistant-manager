import React from 'react';
import { Box, Heading, Switch, FormControl, FormLabel, VStack, Text } from '@chakra-ui/react';

function Groups({ groups, setGroups }) {
  const handleGroupChange = (field) => {
    setGroups(prevGroups => ({
      ...prevGroups,
      [field]: !prevGroups[field]
    }));
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>Grupos</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="orders" mb="0">
            Pedidos:
          </FormLabel>
          <Switch
            id="orders"
            isChecked={groups.orders}
            onChange={() => handleGroupChange('orders')}
          />
          <Text fontSize="sm" color="gray.500" ml={2}>Ative ou desative o grupo de pedidos.</Text>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="cashier" mb="0">
            Caixa:
          </FormLabel>
          <Switch
            id="cashier"
            isChecked={groups.cashier}
            onChange={() => handleGroupChange('cashier')}
          />
          <Text fontSize="sm" color="gray.500" ml={2}>Ative ou desative o grupo de caixa.</Text>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="attendant" mb="0">
            Atendente:
          </FormLabel>
          <Switch
            id="attendant"
            isChecked={groups.attendant}
            onChange={() => handleGroupChange('attendant')}
          />
          <Text fontSize="sm" color="gray.500" ml={2}>Ative ou desative o grupo de atendentes.</Text>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="waiter" mb="0">
            Garçom:
          </FormLabel>
          <Switch
            id="waiter"
            isChecked={groups.waiter}
            onChange={() => handleGroupChange('waiter')}
          />
          <Text fontSize="sm" color="gray.500" ml={2}>Ative ou desative o grupo de garçons.</Text>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Groups;