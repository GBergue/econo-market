import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { theme } from "../../theme/theme";
import {
  VStack,
  FlatList,
  Center,
} from "native-base";

import useApi from "../../hooks/useApi";

import Text from "../../components/Text";
import Header from "../../components/Header";

import { Product } from "src/model/product";

import ProductCard from "./components/ProductCard";
import { LoadingComponent } from "./components/Loading";



export default function SearchProductByCategory({ route }) {
  const { categoryId } = route.params;
  const {
    apiData,
    getApiData,
    isLoading,
    loadMore,
  } = useApi<Product>({ url: `/search/product/category/${categoryId}` });

  
  useEffect(() => {
    getApiData();
  }, []);

  function renderHeaderList() {
    if (!apiData || !apiData.content.length) return null;

    return (
      <Text fontSize="md" color="gray.400" mb={4}>
        {`${apiData.totalElements} ${apiData.totalElements > 1 ? 'resultados encontrados' : 'resultado encontrado'}`}
      </Text>
    );
  }

  function renderListEmpty() {
    if (!isLoading) {
      return (
        <Text fontSize="md" color="gray.400">
          Não foi encontrado, tente novamente
        </Text>
      );
    }
  }

  function renderLoader() {
    if (isLoading && apiData.content.length) {
      return (
        <Center>
          <ActivityIndicator
            size={"large"}
          />
        </Center>
      );
    }
  }

  return (
    <VStack bg="gray.100" flex={1}>
      <Header/>
      
      <VStack flex={1} paddingX={8} paddingTop={8}>

        { isLoading && !apiData.content.length && <LoadingComponent/> }

        <FlatList
          keyExtractor={({ id }) => String(id)}
          data={apiData.content}
          contentContainerStyle={{ paddingBottom: apiData.last ? 20 : 50 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeaderList()}
          ListEmptyComponent={renderListEmpty()}
          ListFooterComponent={renderLoader()}
          onEndReached={loadMore}
          renderItem={({ item }) => (
            <ProductCard item={item} />
          )}
        />

      </VStack>
    </VStack>
  );
}
