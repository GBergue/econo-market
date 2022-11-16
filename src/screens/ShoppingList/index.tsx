import React, {useEffect, useState, useContext } from "react";
import {
  VStack,
  FlatList,
  Fab,
  Icon,
} from "native-base";
import { AntDesign } from '@expo/vector-icons'

import Header from "../../components/Header";
import Heading from "../../components/Heading";
import ModalAddList from "./components/ModalAddList";
import { CardCart } from "./components/CardCart";

import api from "../../api";

import AuthContext from "../../context/AuthContext";
import { ShoppingList as ShoppingListType } from "src/model/shopping";


export default function ShoppingList() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [apiData, setData] = useState<ShoppingListType[]>();
  const { getUserId } = useContext(AuthContext);
 
  useEffect(() => {
    getList();
  }, [showModal]);

  function getList() {
    setLoading(true);
    api.get<ShoppingListType[]>(`/shopping/user/${getUserId()}`)
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }


  return (
    <VStack bg="gray.100" flex={1}>
      <Header />
      <VStack flex={1} paddingX={8}>
        <Heading my={4}>
          Lista de compras
        </Heading>

        <FlatList
          refreshing={isLoading}
          onRefresh={getList}
          data={apiData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CardCart item={item} setLoading={setLoading} getList={getList}/>}
        />

        <ModalAddList
          userId={getUserId()}
          showModal={showModal}
          setShowModal={setShowModal}
        />

        <Fab
          renderInPortal={false}
          shadow={2}
          size="sm"
          onPress={() => setShowModal(true)}
          icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
        />
      </VStack>
    </VStack>
  );
}
