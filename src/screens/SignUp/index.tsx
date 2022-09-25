import React, { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Center } from 'native-base';
import { useForm, Controller  } from 'react-hook-form';
import {
  Ionicons,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';

import LogoBlack from '../../../assets/logo_black.svg';

import { theme } from '../../theme/theme';

import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Heading from "../../components/Heading";

import api from '../../api';
import { useNavigation } from '@react-navigation/native';



export default function SignUp() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  function onSubmit({ name, email, password }) {
    setIsLoading(true);
    console.log(name, email, password);
    
    api.post('/user', {
      name: 'teste',
      email: 'email',
      password: '123123'
    })
      .then(res => console.log(res))
      .catch(err => {
        console.error(err);
        console.error(err.message);
        //Alert.alert('Erro ao realizar cadastro', err);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <VStack
      bg="gray.200"
      padding={50}
      flex={1}
    >

      {isLoading && <Loading/>}

      <Center>
        <LogoBlack height={200} width={200} />
      </Center>

      <Heading
        textAlign="center"
        marginBottom={8}
      >
        Cadastrar
      </Heading>

      <Controller
        control={control}
        name="name"
        rules={{
          maxLength: 50,
          minLength: 3,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder='Nome'
            marginBottom={8}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            InputLeftElement={
              <Ionicons
                name="person"
                size={20}
                color={theme.colors.gray[700]}
                style={{ paddingStart: 8 }}
              />
            }
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          maxLength: 100,
          minLength: 3,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder='Email'
            marginBottom={8}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            InputLeftElement={
              <MaterialIcons
                name="email"
                size={20}
                color={theme.colors.gray[700]}
                style={{ paddingStart: 8 }}
              />
            }
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          maxLength: 100,
          minLength: 3,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder='Senha'
            secureTextEntry={!showPassword}
            marginBottom={8}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
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
        )}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        Cadastrar
      </Button>

      <Button
        onPress={() => navigation.navigate('login')}
      >
        Login
      </Button>
    </VStack>
  );
}
