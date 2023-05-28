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

import AuthContext from "../../context/AuthContext";
import ShoppingListContext from "../../context/ShoppingListContext";
import ModalEditList from "./components/ModalEditList";


export default function ShoppingList() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const { getUserId } = useContext(AuthContext);
  const {
    getList,
    isLoading,
    setLoading,
    shoppingLists,
  } = useContext(ShoppingListContext);
 
  useEffect(() => {
    refreshList();
  }, [showModal]);

  function refreshList() {
    getList();
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
          onRefresh={() => getList()}
          data={shoppingLists}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CardCart
              item={item}
              setLoading={setLoading}
              getList={getList}
              setShowEditModal={setShowEditModal}
            />
          )}
        />

        <ModalAddList
          userId={getUserId()}
          showModal={showModal}
          setShowModal={setShowModal}
        />

        <ModalEditList
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          refreshList={refreshList}
          userId={getUserId()}
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
