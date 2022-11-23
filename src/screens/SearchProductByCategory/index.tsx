import React, { useEffect, useState, useContext } from "react";
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
import ModalAddListProduct from "../../components/ModalAddListProduct";
import ModalEditProduct from "../../components/ModalEditProduct";

import AuthContext from "../../context/AuthContext";
import ShoppingListContext  from "../../context/ShoppingListContext";
import LocationContext  from "../../context/LocationContext";

import { ProductDTO } from "src/model/product";

import ProductCard from "../../components/ProductCard";
import { LoadingComponent } from "./components/Loading";



export default function SearchProductByCategory({ route, navigation }) {
  const [showEditModal, setShowEditModal] = useState(null);
  const [showAddCartModal, setShowAddCartModal] = useState(null);
  const { getUserId } = useContext(AuthContext);
  const { location } = useContext(LocationContext);
  const { getList, shoppingLists } = useContext(ShoppingListContext);
  const { categoryId } = route.params;
  const {
    apiData,
    setApiData,
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
        <Stack flex={1} justifyContent="center" alignItems="center">
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
        </Stack>
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

      <ModalEditProduct
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        setApiData={setApiData}
      />

      <ModalAddListProduct
        showModal={showAddCartModal}
        setShow={setShowAddCartModal}
        shoppingLists={shoppingLists}
        userId={getUserId()}
        getList={getList}
      />
      
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
              setShowEditModal={setShowEditModal}
              setShowAddCartModal={setShowAddCartModal}
              item={item}
              location={location}
            />
          )}
        />

      </VStack>
    </VStack>
  );
}
