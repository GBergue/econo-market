import React, { useState } from 'react';
import { VStack, ScrollView } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { theme } from '../../theme/theme';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Header from '../../components/Header';
import Heading from "../../components/Heading";

import LogoAzul from '@assets/logo_azul.svg';

export default function RegisterProduct() {
  return (
    <VStack
      bg="gray.100"
      flex={1}
    >

      <Header title="Cadastro"/>
      <ScrollView paddingX={8}>      
        <Heading
          marginY={8}
        >
          Informe os dados do produto
        </Heading>

        <Input 
          placeholder='Produto'
          marginBottom={4}
        />

        <Input 
          placeholder='Marca'
          marginBottom={4}
        />

        <Input 
          placeholder='Categoria'
          marginBottom={4}
        />

        <Input 
          placeholder='Unidade'
          marginBottom={4}
        />

        <Input 
          placeholder='Mercado'
          marginBottom={4}
        />

        <Input 
          placeholder='Preço'
          marginBottom={8}
        />      

        <Button>
          Cadastrar
        </Button>
      </ScrollView>
    </VStack>
  );
}
