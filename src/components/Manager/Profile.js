import React, { useState, useEffect, useContext } from "react";
import { Box, Heading, Input, FormControl, FormLabel, Image, VStack, Text, Select, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ProfileContext } from "../../hooks/ProfileContext";
import { handleChatbotConfigChange } from "./functions";
import { SessionContext } from "../../hooks/SessionContext";

function Profile({ setSyncStatus }) {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const { profile, setProfile } = useContext(ProfileContext);
  const { session } = useContext(SessionContext);

  const updateData = (key, value) => {
    if (session.connectionStatus === "connected" || session.connectionStatus === "disconnected") {
      handleChatbotConfigChange(key, value, `${profile.countryCode} ${profile.phoneNumber}`, setSyncStatus);
    }
  };

  useEffect(() => {
    if (profile.profileImage) {
      const url = URL.createObjectURL(profile.profileImage);
      setProfileImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [profile.profileImage]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: file,
      }));
      updateData("profileImage", file);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const formatted = formatPhoneNumber(value);

    setProfile((prevProfile) => ({
      ...prevProfile,
      phoneNumber: formatted,
    }));

    updateData("phoneNumber", `${profile.countryCode} ${formatted}`);
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      countryCode: selectedCountryCode,
    }));
    console.log("countryCode =", profile.countryCode);

    const formatted = formatPhoneNumber(profile.phoneNumber, selectedCountryCode);

    setProfile((prevProfile) => ({
      ...prevProfile,
      phoneNumber: formatted,
    }));

    updateData("phoneNumber", `${profile.countryCode} ${formatted}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    updateData(name, value);
  };

  const formatPhoneNumber = (value, countryCode = profile.countryCode) => {
    console.log("value: ", value);
    console.log("countryCode: ", countryCode);
    if (!value) return value;
    const phoneNumber = value.replace(/\D/g, ""); // Remove tudo que não for dígito
    const len = phoneNumber.length;
    if (!len) return "";
    switch (countryCode) {
      case "+55":
        if (len < 3) {
          if (/^\(\d{1}$/.test(value)) return "";
          if (/^\(\d{2}$/.test(value)) return `(${phoneNumber.slice(0, 1)})`;
          return `(${phoneNumber})`;
        } else if (len < 4) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
        else if (len < 8) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3)}`;
        else if (len < 12) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
        else if (len >= 12) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
        break;

      case "+1":
        if (len < 4) {
          if (/^\(\d{1}$/.test(value)) return "";
          if (/^\(\d{2}$/.test(value)) return `(${phoneNumber.slice(0, 1)})`;
          if (/^\(\d{3}$/.test(value)) return `(${phoneNumber.slice(0, 2)})`;
          return `(${phoneNumber})`;
        } else if (len < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        else if (len < 10) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        else if (len >= 10) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        break;

      default:
        break;
    }
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>
        Perfil WhatsApp
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Imagem de perfil do WhatsApp</FormLabel>
          <Input type="file" accept="image/*" onChange={handleProfileImageChange} height="40px" p={1} />
          <Text fontSize="sm" color="gray.500">
            Selecione uma imagem para o perfil do WhatsApp.
          </Text>
        </FormControl>
        {profileImageUrl && (
          <FormControl>
            <Image src={profileImageUrl} alt="Profile" boxSize="150px" objectFit="cover" />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>Nome do Estabelecimento</FormLabel>
          <Input type="text" name="establishmentName" value={profile.establishmentName} onChange={handleInputChange} />
          <Text fontSize="sm" color="gray.500">
            Digite o nome do seu estabelecimento.
          </Text>
        </FormControl>
        <FormControl>
          <FormLabel>Número de telefone do Assistente</FormLabel>
          <InputGroup>
            <InputLeftElement width="auto" display="flex" alignItems="center">
              <Select value={profile.countryCode} onChange={handleCountryChange} border="none" pr={2}>
                <option value="+55">🇧🇷 +55</option>
                <option value="+1">🇺🇸 +1</option>
              </Select>
              <Box height="70%" borderRight="1px solid" color="gray.300"></Box> {/* Linha vertical cinza */}
            </InputLeftElement>
            <Input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handlePhoneNumberChange} pl="7.5rem" />
          </InputGroup>
          <Text fontSize="sm" color="gray.500">
            Digite o número de telefone do assistente.
          </Text>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Profile;
