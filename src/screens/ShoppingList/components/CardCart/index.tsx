import React from "react";
import { HStack, Pressable, VStack } from "native-base";
import Text from "../../../../components/Text";
import { ShoppingList as ShoppingListType } from "src/model/shopping";
import { Feather } from '@expo/vector-icons';
import api from "../../../../api";
import { Alert } from "react-native";

type Props = {
  item: ShoppingListType,
  setLoading: (bool: boolean) => void,
  getList: () => void,
};

export function CardCart({ item, setLoading, getList }: Props) {

  function handleDelete() {
    Alert.alert('', 'Deseja mesmo deletar?', 
      [
        { text: 'Não'},
        { text: 'Sim', onPress: () => {
          setLoading(true);
          api.delete(`shopping/${item.id}`)
            .then(() => {
              getList();
            })
            .catch((err) => {
              console.log(err);
              Alert.alert('' , 'Erro ao deletar, tente novamente.');
            })
            .finally(() => setLoading(false));
        }},
      ]
    );
  }

  const qtdProdutos = item.productList.length;

  return (
    <VStack rounded="md" bg="white" w="100%" px={2} py={4} mb={2}>
      <HStack justifyContent="space-between">
        <Text fontWeight="bold" color="gray.700">
          {item.name}
        </Text>
        <Pressable onPress={handleDelete}>
          <Feather name="trash" size={18} color="red" />
        </Pressable>
      </HStack>
      
      {!!qtdProdutos && (
        <Text color="gray.400">
          {qtdProdutos}
        </Text>
      )}
    </VStack>
  );
};