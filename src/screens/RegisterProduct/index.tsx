import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Select as NBSelect, Toast } from "native-base";
import { Feather } from "@expo/vector-icons";
import { VStack, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Text from "../../components/Text";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import Select from "../../components/Select";
import Autocomplete from "../../components/Autocomplete";
import ToastSuccess from "../../components/ToastSuccess";

import api from "../../api";

import { CategoryDTO } from "src/model/category";
import { MarketDTO } from "src/model/market";
import { UnityDTO } from "src/model/unity";

export default function RegisterProduct() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [markets, setMarkets] = useState<MarketDTO[]>([]);
  const [unities, setUnities] = useState<UnityDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalBrands, setShowModalBrands] = useState(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      unity: "",
      markets: "",
      price: "",
    },
  });

  useEffect(() => {
    api.get<CategoryDTO[]>("/search/category").then(({ data }) => {
      setCategories(data);
    });
    api.get<MarketDTO[]>("/search/market").then(({ data }) => {
      const { content } = data;
      // console.log(content);
      setMarkets(content);
    });
    api.get<UnityDTO[]>("/fieldutils/unity").then(({ data }) => {
      setUnities(data);
    });
  }, []);

  function validate(value: string) {
    const matches = value.match("^[0-9.]+$");
    return matches?.length > 0 || "Apenas números e ponto final";
  }

  function getErrorMsg(field: string) {
    const fieldError = errors[field];

    if (fieldError) {
      const { message } = fieldError;
      if (message) {
        return (
          <Text color="gray.400" marginBottom={6}>
            {message}
          </Text>
        );
      }
    }

    return null;
  }

  function OnSubmit({
    name,
    price,
    unity,
    brand: brandid,
    category: categoryid,
    markets: marketid,
  }) {
    setIsLoading(true);
    if (isNaN(brandid)) {
      // console.log({ brandName: brandid });
      api
        .post("register/brand", {
          brandName: brandid,
        })
        .then(({data}) => {
          // console.log("id gerado = ",data);
          // idAuxiliar = data;
          api
          .post("register/product", {
            name,
            price,
            unity,
            brand: {
              id: data
            },
            category: {
              id: categoryid
            },
            markets: [{
              id: marketid
            }],
          })
          .then(() => {
            reset();
            Toast.show({
              render: () => <ToastSuccess message="Produto adicionado com sucesso!" />
            });
          })
          .catch((err) => {
            Alert.alert('', 'Não foi possível cadastrar o produto, tente novamente!');
            console.log(err);
          })
          .finally(() => setIsLoading(false));
        })
        .catch((err) => {
          Alert.alert(
            "",
            "Não foi possível cadastrar a marca, tente novamente!"
          );
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      api
      .post("register/product", {
        name,
        price,
        unity,
        brand: {
          id: brandid
        },
        category: {
          id: categoryid
        },
        markets: [{
          id: marketid
        }],
      })
      .then(() => {
        reset();
        Toast.show({
          render: () => <ToastSuccess message="Produto adicionado com sucesso!" />
        });
      })
      .catch((err) => {
        Alert.alert('', 'Não foi possível cadastrar o produto, tente novamente!');
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  return (
    <VStack bg="gray.100" flex={1}>
      <Header/>
      <ScrollView paddingX={8}>
        <Heading marginY={4}>Informe os dados do produto</Heading>

        <Controller
          control={control}
          name="name"
          rules={{
            maxLength: {
              value: 100,
              message: "Tamanho máximo de 100 caracteres",
            },
            minLength: {
              value: 3,
              message: "Tamanho mínimo de 3 caracteres",
            },
            required: "Produto é obrigatório",
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

        {getErrorMsg("name")}

        <Controller
          control={control}
          name="brand"
          rules={{
            maxLength: {
              value: 100,
              message: "Tamanho máximo de 100 caracteres",
            },

            required: "Marca é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Autocomplete
              accessibilityLabel="Marca"
              placeholder="Marca"
              onChangeText={onChange}
              selectedValue={value}
              onBlur={onBlur}
              mb={!!errors.brand ? 2 : 4}
              showModal={showModalBrands}
              setShowModal={setShowModalBrands}
            />
          )}
        />

        {getErrorMsg("brand")}

        <Controller
          control={control}
          name="category"
          rules={{
            maxLength: {
              value: 50,
              message: "Tamanho máximo de 50 caracteres",
            },

            required: "Categoria é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              accessibilityLabel="Categoria"
              placeholder="Categoria"
              onValueChange={onChange}
              selectedValue={value}
              _selectedItem={{
                bg: "primary.400",
              }}
              mb={!!errors.category ? 2 : 4}
            >
              {categories.map(({ name, id }) => (
                <NBSelect.Item
                  key={id}
                  label={name}
                  value={String(id)}
                ></NBSelect.Item>
              ))}
            </Select>
          )}
        />

        {getErrorMsg("category")}

        <Controller
          control={control}
          name="unity"
          rules={{
            maxLength: {
              value: 100,
              message: "Tamanho máximo de 100 caracteres",
            },

            required: "Unidade é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              accessibilityLabel="Unidade"
              placeholder="Unidade"
              onValueChange={onChange}
              selectedValue={value}
              _selectedItem={{
                bg: "primary.400",
              }}
              mb={!!errors.unity ? 2 : 4}
            >
              {unities.map(({ abbreviation, description }) => (
                <NBSelect.Item
                  key={abbreviation}
                  label={description}
                  value={abbreviation}
                ></NBSelect.Item>
              ))}
            </Select>
          )}
        />

        {getErrorMsg("unity")}

        <Controller
          control={control}
          name="markets"
          rules={{
            maxLength: {
              value: 100,
              message: "Tamanho máximo de 100 caracteres",
            },
            required: "Mercado é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              accessibilityLabel="Mercado"
              placeholder="Mercado"
              onValueChange={onChange}
              selectedValue={value}
              _selectedItem={{
                bg: "primary.400",
              }}
              mb={!!errors.markets ? 2 : 4}
            >
              {markets.map(({ name, id, address }) => (
                <NBSelect.Item
                  key={id}
                  label={'-'+name+'   \n '+'('+address.street+')'}
                  value={String(id)}
                ></NBSelect.Item>
              ))}
            </Select>
          )}
        />

        {getErrorMsg("markets")}

        <Controller
          control={control}
          name="price"
          rules={{
            required: "Preço é obrigatório",
            validate,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Preço"
              marginBottom={!!errors.price ? 2 : 4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              isInvalid={!!errors.price}
            />
          )}
        />

        {getErrorMsg("price")}

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
