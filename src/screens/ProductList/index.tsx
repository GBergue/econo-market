import React, { useEffect, useRef, useState, useContext } from "react";
import { ActivityIndicator} from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {
  VStack,
  FlatList,
  Icon,
  Center,
  Stack,
} from "native-base";

import Text from "../../components/Text";
import Header from "../../components/Header";
import Input from "../../components/Input";
import ProductCard from "../../components/ProductCard";

import { ProductDTO } from "src/model/product";

import useApi from "../../hooks/useApi";
import ModalEditProduct from "../../components/ModalEditProduct";
import ModalAddListProduct from "../../components/ModalAddListProduct";
import AuthContext from "../../context/AuthContext";
import ShoppingListContext from "../../context/ShoppingListContext";


const SEGUNDO = 1000;

export default function ProductList({ navigation }) {
  const [search, setSearch] = useState('');
  const [showEditModal, setShowEditModal] = useState(null);
  const [showAddCartModal, setShowAddCartModal] = useState(null);
  const idTimeout = useRef<NodeJS.Timeout | number>();
  const { shoppingLists } = useContext(ShoppingListContext);
  const { getUserId } = useContext(AuthContext);
  const {
    apiData,
    loadMore,
    isLoading,
    getApiData,
    setApiData,
  } = useApi<ProductDTO>({ url: '/search/product/name' });

  useEffect(() => {
    handleSearch('');
  }, []);

  function handleSearch(text: string) {
    getApiData(0, `name=${text}`, true);
  }

  function handleLoadMore() {
    loadMore(`name=${search}`);
  }

  function renderLoader() {
    if (isLoading && apiData.content.length) {
      return (
        <Center>
          <ActivityIndicator size={"large"}/>
        </Center>
      );
    }
  }

  function onChange(text: string) {
    if (text) {
      if (idTimeout.current) {
        clearTimeout(idTimeout.current);
      }
      idTimeout.current = setTimeout(() => {
        handleSearch(text);
      }, SEGUNDO * 1,5);
    }
    setSearch(text);
  }

  function renderHeaderList() {
    if (isLoading) return null;
    if (!apiData.empty) return null;
    if (!apiData.totalElements) return null;

    return (
      <Text fontSize="md" color="gray.400" mb={4}>
        {`${apiData.totalElements} ${apiData.totalElements > 1 ? 'resultados encontrados' : 'resultado encontrado'}`}
      </Text>
    );
  }

  function renderListEmpty() {
    if (isLoading) return null;

    return (
      <Stack my={4} justifyContent="center" flex={1} alignItems="center">
        <FontAwesome5
          name="shopping-basket"
          size={48}
          color="#a1a1aa"
        />
        <Text mt={4} fontSize="md" color="gray.400">
          Não foi encontrado nenhum item!
        </Text>
      </Stack>
    );
  }

  return (
    <VStack bg="gray.100" flex={1}>
      <Header/>

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
      />

      <VStack flex={1} paddingX={8}>
        <Input
          placeholder="Digite o produto"
          width="100%"
          rounded="sm"
          bg="white"
          my={4}
          value={search}
          onChangeText={onChange}
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
          data={apiData.content}
          contentContainerStyle={{ paddingBottom: apiData.last ? 20 : 50 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeaderList()}
          ListEmptyComponent={renderListEmpty()}
          ListFooterComponent={renderLoader()}
          onEndReached={handleLoadMore}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              navigation={navigation}
              setShowEditModal={setShowEditModal}
              setShowAddCartModal={setShowAddCartModal}
            />
          )}
        />
      </VStack>
    </VStack>
  );
}
