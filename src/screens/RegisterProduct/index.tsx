import React, { useState, useContext } from 'react';
import { VStack, Heading, Center, ScrollView } from 'native-base';
import { useForm, Controller  } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

import AuthContext from '../../context/AuthContext';

export default function RegisterProduct() {
  const { navigate } = useNavigation();
  const { setAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  return (
    <VStack
      bg="gray.100"
      flex={1}
    >

      <Header/>
      <ScrollView paddingX={8}>      
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
      </ScrollView>
    </VStack>
  );
}
