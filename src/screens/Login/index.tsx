import React, { useState } from 'react';
import { VStack, Heading, Center, Stack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { theme } from '../../theme/theme';

import Input from '@components/Input';
import Button from '@components/Button';
import Text from '@components/Text';

import LogoAzul from '@assets/logo_azul.svg';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useNavigation();

  return (
    <VStack
      bg="gray.100"
      paddingX={8}
      flex={1}
    >
      <Center>
        <LogoAzul height={200} width={200} />
      </Center>

      <Heading
        color="primary.400"
        textAlign="center"
        marginBottom={8}
        fontSize="lg"
      >
        Oi, Vamos começar?
      </Heading>

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
        marginBottom={2}
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

      <Text
        color="gray.400"
        marginBottom={8}
        textAlign="right"
        onPress={() => navigate("forgotPassword")}
      >
        Esqueceu a senha?
      </Text>

      <Button
        marginBottom={2}
        endIcon={<Feather name="log-in" size={16} color="white"/>}
        onPress={() => navigate("registerProduct")}
      >
        Login
      </Button>

      <Text color="gray.400">
        Ainda não possui cadastro? <Text color="primary.400" fontSize="sm" onPress={() => navigate("signup")}>Cadastre-se</Text>
      </Text>
      
    </VStack>
  );
}
