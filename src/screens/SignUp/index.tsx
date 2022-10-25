import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView, Center, KeyboardAvoidingView } from 'native-base';
import { useForm, Controller  } from 'react-hook-form';
import {
  Ionicons,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import LogoAzul from '@assets/logo_azul.svg';

import { theme } from '../../theme/theme';

import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Heading from "../../components/Heading";
import Text from "../../components/Text";

import api from '../../api';
import axios from 'axios';



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

  function getErrorMsg(field: string) {
    const fieldError = errors[field];

    if (fieldError) {
      const { message } = fieldError;
      if (message) {
        return (
          <Text
            color="gray.400"
            marginBottom={6}
          >
            {message}
          </Text>
        );
      }
    }
    return null;
  }

  function onSubmit({ name, email, password }) {
    setIsLoading(true);
    console.log(name, email, password);

    // api.post('/user', {
    //   name: 'teste',
    //   email: 'email',
    //   password: '123123'
    // })
    axios.post('https://api-economarket.herokuapp.com/user', {
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
    <ScrollView
      bg="gray.200"
      padding={50}
      flex={1}
    >
      <KeyboardAvoidingView>

        {isLoading && <Loading/>}

        <Center>
          <LogoAzul height={200} width={200} />
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
            maxLength: {
              value: 50,
              message: 'Tamanho máximo de 50 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Nome é obrigátorio',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              placeholder='Nome'
              marginBottom={!!errors.name ? 2 : 8}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.name}
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

        {getErrorMsg('name')}

        <Controller
          control={control}
          name="email"
          rules={{
            maxLength: {
              value: 100,
              message: 'Tamanho máximo de 100 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Email é obrigátorio',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              placeholder='Email'
              marginBottom={!!errors.email ? 2 : 8}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.email}
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

        {getErrorMsg('email')}

        <Controller
          control={control}
          name="password"
          rules={{
            maxLength: {
              value: 50,
              message: 'Tamanho máximo de 50 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Senha é obrigátoria',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              placeholder='Senha'
              secureTextEntry={!showPassword}
              marginBottom={!!errors.password ? 2 : 8}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.password}
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

        {getErrorMsg('password')}

        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          marginBottom={4}
        >
          Cadastrar
        </Button>

        <Button
          onPress={() => navigation.navigate('login')}
          bg="gray.400"
        >
          Voltar
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
