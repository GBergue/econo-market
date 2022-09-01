import React, { useState } from 'react';
import { VStack, Heading, Center } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { theme } from '../../theme/theme';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';

import LogoAzul from '@assets/logo_azul.svg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <VStack
      bg="gray.100"
      paddingX={8}
      flex={1}
    >
      <Center marginBottom={8}>
        <LogoAzul height={200} width={200} />
      </Center>

      <Heading
        color="primary.400"
        marginBottom={2}
        fontSize="lg"
      >
        Esqueceu a senha?
      </Heading>

      <Text
        color="gray.400"
        marginBottom={4}  
      >
        Digite o email vinculado a conta para receber instruções para redefinir a sua senha. 
      </Text>

      <Input 
        placeholder='Email'
        marginBottom={8}
        value={email}
        onChangeText={setEmail}
        InputLeftElement={
          <MaterialIcons
            name="email"
            size={20}
            color={theme.colors.gray[700]}
            style={{ paddingStart: 8 }}
          />
        }
      />

      <Button>
        Redefinir
      </Button>
    </VStack>
  );
}
