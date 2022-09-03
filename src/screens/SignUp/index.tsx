import React, { useState } from 'react';
import { VStack, Heading, Center } from 'native-base';
import {
  Ionicons,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';

import LogoBlack from '../../../assets/logo_black.svg';

import { theme } from '../../theme/theme';

import Input from '../../components/Input';
import Button from '../../components/Button';



export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack
      bg="gray.200"
      padding={50}
      flex={1}
    >
      <Center>
        <LogoBlack height={200} width={200} />
      </Center>

      <Heading
        color="gray.700"
        textAlign="center"
        marginBottom={8}
        fontSize="lg"
      >
        Cadastrar
      </Heading>

      <Input 
        placeholder='Nome'
        marginBottom={8}
        InputLeftElement={
          <Ionicons
            name="person"
            size={20}
            color={theme.colors.gray[700]}
            style={{ paddingStart: 8 }}
          />
        }
      />

      <Input 
        placeholder='Email'
        marginBottom={8}
        InputLeftElement={
          <MaterialIcons
            name="email"
            size={20}
            color={theme.colors.gray[700]}
            style={{ paddingStart: 8 }}
          />
        }
      />

      <Input 
        placeholder='Senha'
        secureTextEntry={!showPassword}
        marginBottom={8}
        InputLeftElement={
          <FontAwesome5
            name="key"
            size={20}
            color={theme.colors.gray[700]}
            style={{ paddingStart: 8 }}
          />
        }
        InputRightElement={
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={theme.colors.gray[700]}
            style={{ paddingEnd: 8 }}
            onPress={() => setShowPassword((x) => !x)}
          />
        }
      />

      <Button>
        Cadastrar
      </Button>
    </VStack>
  );
}
