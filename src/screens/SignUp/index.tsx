import React, { useState } from 'react';
import { VStack, Heading, Center } from 'native-base';
import Input from '../../components/Input';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import LogoBlack from '../../../assets/logo_black.svg';

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
            color="gray.800"
            textAlign="center"
            marginBottom={8}
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

      <Button>
        Cadastrar
      </Button>
    </VStack>
  );
}
