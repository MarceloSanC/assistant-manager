import React, { useState, useEffect } from 'react';
import { Box, Heading, Input, FormControl, FormLabel, Image, VStack, Text } from '@chakra-ui/react';

function Profile({ profile, setProfile }) {
  const [profileImageUrl, setProfileImageUrl] = useState('');

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
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <Box className="form-section" p={5}>
      <Heading as="h2" size="md" mb={4}>Perfil Whats App</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Imagem de perfil do Whats App</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          <Text fontSize="sm" color="gray.500">Selecione uma imagem para o perfil do Whats App.</Text>
        </FormControl>
        {profileImageUrl && (
          <FormControl>
            <Image src={profileImageUrl} alt="Profile" boxSize="150px" objectFit="cover" />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>Nome do Estabelecimento</FormLabel>
          <Input
            type="text"
            name="establishmentName"
            value={profile.establishmentName}
            onChange={handleInputChange}
          />
          <Text fontSize="sm" color="gray.500">Digite o nome do seu estabelecimento.</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Número de telefone do Assistente</FormLabel>
          <Input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
          />
          <Text fontSize="sm" color="gray.500">Digite o número de telefone do assistente.</Text>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Profile;