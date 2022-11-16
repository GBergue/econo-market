import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import {
  VStack,
  FlatList,
  Center,
  Stack,
  Link,
} from "native-base";

import useApi from "../../hooks/useApi";

import Text from "../../components/Text";
import Header from "../../components/Header";

import { ProductDTO } from "src/model/product";

import ProductCard from "../../components/ProductCard";
import { LoadingComponent } from "./components/Loading";



export default function SearchProductByCategory({ route, navigation }) {
  const { categoryId } = route.params;
  const {
    apiData,
    getApiData,
    isLoading,
    loadMore,
  } = useApi<ProductDTO>({ url: `/search/product/category/${categoryId}` });

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
        <Center flex={1}>
          <Text fontSize="md" color="gray.400">
            Não foi encontrado nenhum item!
          </Text>
          <Stack my={4}>
            <FontAwesome5
              name="shopping-basket"
              size={48}
              color="#a1a1aa"
            />
          </Stack>
          <Link
            onPress={() => navigation.goBack()}
            _text={{ color: "blue.400"}}
          >
            Voltar para tela de categorias
          </Link>
        </Center>
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

  function handleLoadMore() {
    loadMore();
  }

  return (
    <VStack bg="gray.100" flex={1}>
      <Header allowGoBack/>
      
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
          onEndReached={handleLoadMore}
          renderItem={({ item }) => (
            <ProductCard
              navigation={navigation}
              setShowEditModal={(x) => {}}
              item={item}
            />
          )}
        />

      </VStack>
    </VStack>
  );
}
