import React, { useContext } from "react";
import { Box, Heading, Switch, FormControl, FormLabel, VStack, Text } from "@chakra-ui/react";
import { handleChatbotConfigChange } from "./functions";
import { ProfileContext } from "../../hooks/ProfileContext";
import { SessionContext } from '../../hooks/SessionContext';

function Groups({ groups, setGroups, setSyncStatus }) {
  const { profile } = useContext(ProfileContext);
  const { session, } = useContext(SessionContext);

  const updateData = (key, value) => {
    if (session.connectionStatus === 'connected' || session.connectionStatus === 'disconnected'){
      handleChatbotConfigChange(key, value, `${profile.countryCode} ${profile.phoneNumber}`, setSyncStatus);
    }
  }

  const handleGroupChange = (field) => {
    updateData(field, groups[field]);
    setGroups((groups) => ({
      ...groups,
      [field]: !groups[field],
    }));
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>
        Grupos
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl display="flex" alignItems="center">
          <VStack spacing={4} align="left">
            <FormLabel htmlFor="orders" mb="0">
              Pedidos
            </FormLabel>
            <Switch id="orders" isChecked={groups.orders} onChange={() => handleGroupChange("orders")} />
            <Text fontSize="sm" color="gray.500" ml={2}>
              Ative ou desative o grupo de pedidos.
            </Text>
          </VStack>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <VStack spacing={4} align="left">
            <FormLabel htmlFor="cashier" mb="0">
              Caixa
            </FormLabel>
            <Switch id="cashier" isChecked={groups.cashier} onChange={() => handleGroupChange("cashier")} />
            <Text fontSize="sm" color="gray.500" ml={2}>
              Ative ou desative o grupo de caixa.
            </Text>
          </VStack>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <VStack spacing={4} align="left">
            <FormLabel htmlFor="attendant" mb="0">
              Atendente
            </FormLabel>
            <Switch id="attendant" isChecked={groups.attendant} onChange={() => handleGroupChange("attendant")} />
            <Text fontSize="sm" color="gray.500" ml={2}>
              Ative ou desative o grupo de atendentes.
            </Text>
          </VStack>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <VStack spacing={4} align="left">
            <FormLabel htmlFor="waiter" mb="0">
              Garçom
            </FormLabel>
            <Switch id="waiter" isChecked={groups.waiter} onChange={() => handleGroupChange("waiter")} />
            <Text fontSize="sm" color="gray.500" ml={2}>
              Ative ou desative o grupo de garçons.
            </Text>
          </VStack>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Groups;
