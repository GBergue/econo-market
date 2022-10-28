import React, { useEffect, useState } from "react";
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
import { Pagination } from "src/model/pagination";
import { Product } from "src/model/product";

import api from "../../api";
import ProductCard from "./components/ProductCard";
import { LoadingComponent } from "./components/Loading";


export default function SearchProductByCategory({ route }) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { categoryId } = route.params;


  useEffect(() => {
    setLoading(true);
    api.get<Pagination<Product>>(`/search/product/category/${categoryId}`)
      .then(({ data }) => {
        setData(data.content);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);


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
      <VStack flex={1} paddingX={8} paddingTop={8}>

        { isLoading && (
          <LoadingComponent/>
        )}

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeaderList()}
          ListEmptyComponent={renderListEmpty()}
          renderItem={({ item }) => (
            <ProductCard item={item} />
          )}
        />
      </VStack>
    </VStack>
  );
}
