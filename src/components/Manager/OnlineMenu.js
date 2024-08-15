import React, { useContext } from "react";
import { FormControl, FormLabel, Input, Switch, VStack, Heading } from "@chakra-ui/react";
import { handleChatbotConfigChange } from "./functions";
import { ProfileContext } from "../../hooks/ProfileContext";
import { SessionContext } from '../../hooks/SessionContext';

function OnlineMenu({ onlineMenu, setOnlineMenu, setSyncStatus }) {
  const { profile } = useContext(ProfileContext);
  const { session, } = useContext(SessionContext);

  const updateData = (key, value) => {
    if (session.connectionStatus === 'connected' || session.connectionStatus === 'disconnected'){
      handleChatbotConfigChange(key, value, `${profile.countryCode} ${profile.phoneNumber}`, setSyncStatus);
    }
  }

  const handleToggle = (e) => {
    const isEnabled = e.target.checked;
    setOnlineMenu((prev) => ({ ...prev, enabled: isEnabled, }));
    setSyncStatus("saving");
    updateData('enableOnlineMenu' , isEnabled);
  };
  
  const handleLinkChange = (e) => {
    const link = e.target.value
    setOnlineMenu((prev) => ({ ...prev, link: link }));
    setSyncStatus("saving");
    updateData('menuLink', link);
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Heading as="h2" size="md" mb={4}>
        Cardápio Online
      </Heading>
      <FormControl display="flex" alignItems="center">
        <VStack spacing={4} align="left">
          <FormLabel htmlFor="enable-online-menu" mb="0">
            Habilitar cardápio online
          </FormLabel>
          <Switch id="enable-online-menu" isChecked={onlineMenu.enabled} onChange={handleToggle} />
        </VStack>
      </FormControl>

      <FormControl>
        <VStack spacing={4} align="left">
          <FormLabel htmlFor="online-menu-link">Link do cardápio online</FormLabel>
          <Input
            id="online-menu-link"
            type="url"
            value={onlineMenu.link}
            onChange={handleLinkChange}
            isDisabled={!onlineMenu.enabled}
            bg={!onlineMenu.enabled ? "gray.300" : "white"}
            cursor={!onlineMenu.enabled ? "not-allowed" : "text"}
          />
        </VStack>
      </FormControl>
    </VStack>
  );
}

export default OnlineMenu;
