import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Alert } from 'react-native';

import { theme } from "../../theme/theme";
import React, { useState, useContext } from "react";
import { VStack, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Text from '../../components/Text';
import Header from "../../components/Header";
import Heading from "../../components/Heading";

import AuthContext from "../../context/AuthContext";
import api from "../../api";

export default function RegisterProduct() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      categorty: "",
      unity: "",
      mercado: "",
      price: "",
    },
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

  function OnSubmit({name, price, unity, brand, categorty}) {
    setIsLoading(true);

    api.post('register/product', {
      name,
      price,
      unity,
      brand,
      categorty,
    })
      .catch(err => {
        Alert.alert("Não foi possível cadastrar o produto, tente novamente!");
      })
      .finally(() => setIsLoading(false));

  }
  
  return (
    <VStack bg="gray.100" flex={1}>
      <Header title="Cadastro" />
      <ScrollView paddingX={8}>
        <Heading marginY={8}>Informe os dados do produto</Heading>

        <Controller
          control={control}
          name="name"
          rules={{
            maxLength: {
              value: 100,
              message: 'Tamanho máximo de 100 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Produto é obrigatório',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Produto"
              marginBottom={!!errors.name ? 2 : 4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.name}
            />
          )}
        />

      {getErrorMsg('name')}

        <Controller
          control={control}
          name="brand"
          rules={{
            maxLength: {
              value: 100,
              message: 'Tamanho máximo de 100 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Marca é obrigatório',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Marca"
              marginBottom={!!errors.brand ? 2 : 4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.brand}
            />
          )}
        />

        {getErrorMsg('brand')}

        <Controller
          control={control}
          name="categorty"
          rules={{
            maxLength: {
              value: 50,
              message: 'Tamanho máximo de 50 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Categoria é obrigatório',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Categoria"
              marginBottom={!!errors.categorty ? 2 : 4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.categorty}
            />
          )}
        />

        {getErrorMsg('categorty')}
        
        <Controller
          control={control}
          name="unity"
          rules={{
            maxLength: {
              value: 100,
              message: 'Tamanho máximo de 100 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Unidade é obrigatório',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Unidade"
              marginBottom={!!errors.unity ? 2 : 4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.unity}
            />
          )}
        />

        {getErrorMsg('unity')}

        <Controller
          control={control}
          name="mercado"
          rules={{
            maxLength: {
              value: 100,
              message: 'Tamanho máximo de 100 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Mercado é obrigatório',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Mercado"
              marginBottom={!!errors.mercado ? 2 : 4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.mercado}
            />
          )}
        />

        {getErrorMsg('mercado')}

        <Controller
          control={control}
          name="price"
          rules={{
            maxLength: {
              value: 100,
              message: 'Tamanho máximo de 100 caracteres'
            },
            minLength: {
              value: 3,
              message: 'Tamanho mínimo de 3 caracteres'
            },
            required: 'Preço é obrigatório',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Preço"
              marginBottom={!!errors.price ? 2 : 4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isInvalid={!!errors.price}
            />
          )}
        />

        {getErrorMsg('price')}

        <Button
          marginBottom={2}
          endIcon={<Feather name="log-in" size={16} color="white" />}
          onPress={handleSubmit(OnSubmit)}
          isLoading={isLoading}
        >
          Cadastrar
        </Button>
      </ScrollView>
    </VStack>
  );
}
