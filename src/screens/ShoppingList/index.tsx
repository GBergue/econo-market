import React, {useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  FlatList,
  ScrollView,
  Stack,
  Center,
} from "native-base";
import { Alert, View } from "react-native";

import Text from "../../components/Text";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import Loading from "../..//components/Loading";

import { CategoryDTO } from "../../model/category";

import api from "../../api";
//import { LoadingComponent } from "./components/LoadingCategory";
import { Pagination } from "src/model/pagination";
import { Product } from "src/model/product";

import AuthContext from "../../context/AuthContext";


export default function ShoppingList() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { getUserId } = useContext(AuthContext);
 
  useEffect(() => {
    setLoading(true);

    api.get(`/shopping/user/${getUserId()}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);


  return (
    <VStack bg="gray.100" flex={1}>
      <Header />

      <VStack flex={1} paddingX={8}>
        
        <Heading my={4}>
          Lista de compras
        </Heading>

      </VStack>
    </VStack>
  );
}
