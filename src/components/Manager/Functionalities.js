import React, { useContext } from "react";
import { Box, Switch, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import { handleChatbotConfigChange } from "./functions";
import { ProfileContext } from "../../hooks/ProfileContext";
import { SessionContext } from '../../hooks/SessionContext';

function Functionalities({ functionalities, setFunctionalities, setSyncStatus }) {
  const { profile } = useContext(ProfileContext);
  const { session, } = useContext(SessionContext);

  const updateData = (key, value) => {
    if (session.connectionStatus === 'connected' || session.connectionStatus === 'disconnected') {
      handleChatbotConfigChange(key, value, `${profile.countryCode} ${profile.phoneNumber}`, setSyncStatus);
    }
  }

  const handleSwitchChange = (key) => {
    setFunctionalities((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      if (key === "enableFAQ" && !updated[key]) {
        updated.faqLink = "";
      }
      setSyncStatus("saving");
      updateData(key, updated[key]);
      return updated;
    });
  };

  const handleInputChange = (e) => {
    setFunctionalities((prev) => {
      const updated = { ...prev, faqLink: e.target.value };
      setSyncStatus("saving");
      updateData("faqLink", e.target.value);
      return updated;
    });
  };

  return (
    <Box>
      <Heading as="h2" size="md" mb={4}>
        Pesquisa de Satisfação
      </Heading>
      <FormControl display="flex" alignItems="center" mb={4}>
        <FormLabel htmlFor="satisfaction-poll" mb="0">
          Habilitar Pesquisa de Satisfação
        </FormLabel>
        <Switch id="satisfaction-poll" isChecked={functionalities.satisfactionPoll} onChange={() => handleSwitchChange("satisfactionPoll")} />
      </FormControl>
      <Heading as="h2" size="md" mb={4}>
        FAQ
      </Heading>
      <FormControl display="flex" alignItems="center" mb={4}>
        <FormLabel htmlFor="enable-faq" mb="0">
          Habilitar FAQ
        </FormLabel>
        <Switch id="enable-faq" isChecked={functionalities.enableFAQ} onChange={() => handleSwitchChange("enableFAQ")} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="faq-link">Link do FAQ</FormLabel>
        <Input
          id="faq-link"
          value={functionalities.faqLink}
          onChange={handleInputChange}
          isDisabled={!functionalities.enableFAQ}
          placeholder="Insira o link do FAQ"
          bg={!functionalities.enableFAQ ? "gray.200" : "white"}
        />
      </FormControl>
    </Box>
  );
}

export default Functionalities;
