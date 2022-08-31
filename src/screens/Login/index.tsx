import React, { useState } from 'react';
import { VStack, Heading, Center } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { theme } from '../../theme/theme';

import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoAzul from '../../../assets/logo_azul.svg';


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack
        bg="gray.100"
        padding={50}
        flex={1}
    >
        <Center>
          <LogoAzul height={200} width={200} />
        </Center>

        <Heading
            color="primary.400"
            textAlign="center"
            marginBottom={8}
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
        marginBottom={8}
      />

      <Button
        endIcon={<Feather name="log-in" size={16} color="white" />}
        >
        LOGIN
      </Button>
    </VStack>
  );
}
