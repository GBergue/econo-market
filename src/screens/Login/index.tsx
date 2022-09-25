import React, { useState, useContext } from 'react';
import { VStack, Center } from 'native-base';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useForm, Controller  } from 'react-hook-form';

import api, { setToken } from '../../api';

import { theme } from '../../theme/theme';

import Heading from "../../components/Heading";
import Input from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Loading from '../../components/Text';

import LogoAzul from '@assets/logo_azul.svg';
import AuthContext from '../../context/AuthContext';


export default function Login() {
  const { navigate } = useNavigation();
  const { setAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: __DEV__ ? 'manager@manager.com' : '',
      password: __DEV__ ? 'manager' : '',
    }
  });

  function getErrorMsg(error: FieldErrorsImpl, field: string) {
    let msg = '';

    //if (error.)
  }

  function onSubmit({ email, password }) {
    setIsLoading(true);
    console.log( email, password);
    api.post('/auth/login', {
      email,
      password,
    })
      .then(({ data }) => {
        console.log(data);
        const { access_token } = data;
        if (access_token) {
          setToken(access_token);
          setAuthenticated(true);
        }
      })
      .catch(err => {
        Alert.alert("Verifique se o usuario e senha estão corretos.");
      })
      .finally(() =>  setIsLoading(false));
  }

  //console.log(errors);
  //console.log(control);

  return (
    <VStack
      bg="gray.100"
      paddingX={8}
      flex={1}
    >

      {isLoading && <Loading/>}

      <Center>
        <LogoAzul height={200} width={200} />
      </Center>

      <Heading
        textAlign="center"
        marginBottom={8}
      >
        Oi, Vamos começar?
      </Heading>

      <Controller
        control={control}
        name="email"
        rules={{
          maxLength: 50,
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
            isInvalid={!errors.email?.message}
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

      {!!errors.email?.message && (<Text>{errors.email?.message}</Text>)}
      
      <Controller
        control={control}
        name="password"
        rules={{
          maxLength: 50,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input 
            placeholder='Senha'
            secureTextEntry={!showPassword}
            marginBottom={2}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            isInvalid={errors.password}
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
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        Login
      </Button>

      <Text color="gray.400">
        Ainda não possui cadastro? <Text color="primary.400" fontSize="sm" onPress={() => navigate("signup")}>Cadastre-se</Text>
      </Text>
      
    </VStack>
  );
}
