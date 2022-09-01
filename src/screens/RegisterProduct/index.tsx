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

export default function RegisterProduct() {
  return (
    <VStack
      bg="gray.100"
      paddingX={8}
      flex={1}
    >

      <Heading
        marginY={8}
        fontSize="lg"
        color="gray.600"
      >
        Informe os dados do produto
      </Heading>

      <Input 
        placeholder='Produto'
        marginBottom={8}
      />

      <Input 
        placeholder='Marca'
        marginBottom={8}
      />

      <Input 
        placeholder='Categoria'
        marginBottom={8}
      />

      <Input 
        placeholder='Unidade'
        marginBottom={8}
      />

      <Input 
        placeholder='Mercado'
        marginBottom={8}
      />

      <Input 
        placeholder='Preço'
        marginBottom={8}
      />

      <Button>
        Cadastrar
      </Button>
    </VStack>
  );
}
