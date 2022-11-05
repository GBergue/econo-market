import React, { useRef, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "../../theme/theme";
import {
  VStack,
  FlatList,
  Icon,
} from "native-base";

import Text from "../../components/Text";
import Header from "../../components/Header";
import Input from "../../components/Input";
import ProductCard from "./components/productCard";
import api from "../../api";
import { Pagination } from "src/model/pagination";
import { Product } from "src/model/product";


const SEGUNDO = 1000;

export default function ProductList() {
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<Pagination<Product>>({ content: [] });
  const idTimeout = useRef<NodeJS.Timeout>();


  function handleSearch(text: string) {
    setLoading(true);
    api.get(`/search/product/name?name=${text}`)
      .then(({ data }) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
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
    if (isLoading || !data.content.length) return null;

    return (
      <Text fontSize="md" color="gray.400" mb={4}>
        {`${data.content.length} ${data.content.length > 1 ? 'resultados encontrados' : 'resultado encontrado'}`}
      </Text>
    );
  }


  function renderListEmpty() {
    if (isLoading) return null;

    return (
      <Text fontSize="md" color="gray.400">
        Não foi encontrado, tente novamente
      </Text>
    );
  }

  return (
    <VStack bg="gray.100" flex={1}>
      <Header/>
      <VStack flex={1} paddingX={8}>
        <Input
          placeholder="Digite o produto"
          width="100%"
          rounded="sm"
          bg="white"
          my={4}
          value={search}
          onChangeText={onChange}
          onEndEditing={() => console.log('onEndEditing')}
          onTouchEndCapture={() => console.log('onTouchEndCapture')}
          onBlur={() => console.log('onBLur')}
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
          data={data.content}
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
