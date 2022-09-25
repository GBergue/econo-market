
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { theme } from '../../theme/theme';
import React, { useState, useContext } from 'react';
import { VStack, ScrollView } from 'native-base';
import { useForm, Controller  } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Heading from "../../components/Heading";

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
