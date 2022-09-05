import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "../../theme/theme";
import {
  VStack,
  FlatList,
  Icon,
} from "native-base";

import LogoAzul from "@assets/logo_azul.svg";

import Text from "../../components/Text";
import Header from "../../components/Header";
import Input from "../../components/Input";
import ProductCard from "./components/productCard";


let data = [
    {
        name: 'Pera',
        brand: 'Marca',
        market: 'Mercado',
        date: 'Ultima atualização 01/07/2022',
        price: 'R$ 5,99',
        unid: 'KG',
    },
    {
        name: 'Pera',
        brand: 'Marca',
        market: 'Mercado',
        date: 'Ultima atualização 01/07/2022',
        price: 'R$ 5,99',
        unid: 'KG',
    },
    {
        name: 'Pera',
        brand: 'Marca',
        market: 'Mercado',
        date: 'Ultima atualização 01/07/2022',
        price: 'R$ 5,99',
        unid: 'KG',
    },
    {
        name: 'Pera',
        brand: 'Marca',
        market: 'Mercado',
        date: 'Ultima atualização 01/07/2022',
        price: 'R$ 5,99',
        unid: 'KG',
    },
    {
        name: 'Pera',
        brand: 'Marca',
        market: 'Mercado',
        date: 'Ultima atualização 01/07/2022',
        price: 'R$ 5,99',
        unid: 'KG',
    },
    {
        name: 'Pera',
        brand: 'Marca',
        market: 'Mercado',
        date: 'Ultima atualização 01/07/2022',
        price: 'R$ 5,99',
        unid: 'KG',
    },
  
];
//data = [];

export default function ProductList() {
  function renderHeaderList() {
    if (!data.length) return null;

    return (
      <Text fontSize="md" color="gray.400" mb={4}>
        {`${data.length} ${data.length > 1 ? 'resultados encontrados' : 'resultado encontrado'}`}
      </Text>
    );
  }

  function renderListEmpty() {
    return (
      <Text fontSize="md" color="gray.400">
        Não foi encontrado, tente novamente
      </Text>
    );
  }

  return (
    <VStack bg="gray.100" flex={1}>
      <Header title="Busca" />
      <VStack flex={1} paddingX={8}>
        <Input
          placeholder="item ou mercado"
          width="100%"
          rounded="sm"
          bg="white"
          my={4}
          InputLeftElement={
            <Icon
            name="ios-search"
              ml="2"
              size="4"
              color="primary.400"
              as={Ionicons}
            />
          }
        />

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeaderList()}
          ListEmptyComponent={renderListEmpty()}
          renderItem={({ item }) => (
            <ProductCard item={item}/>
          )}
        />
      </VStack>
    </VStack>
  );
}
