import { ListRenderItemInfo } from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList, Modal, HStack, IconButton } from "native-base";
import { FontAwesome } from '@expo/vector-icons';

import { InListProduct, ShoppingList } from "src/model/shopping";

import Button from "../../../../components/Button";
import Text from "../../../../components/Text";

import api from "../../../../api";


type Props = {
  showEditModal: ShoppingList;
  setShowEditModal: (shoppingList: ShoppingList) => void;
  refreshList: () => void;
  userId: number;
};

export default function ModalEditList({
  showEditModal,
  setShowEditModal,
  refreshList,
  userId,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState<InListProduct[]>([]);

  useEffect(() => {
    if (showEditModal) {
      setProductList([...showEditModal.productList]);
    }
  }, [showEditModal]);

  
  function handleSave() {
    console.log(showEditModal);
    setIsLoading(true);
    api.put('/shopping', {
      ...showEditModal,
      user: {
        id: userId,
      },
      productList
    })
      .then(() => {
        refreshList();
        setShowEditModal(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function renderItem({ item }: ListRenderItemInfo<InListProduct>) {

    function addProductList() {
      setProductList(prev => {
        return prev.map(value => {
          if (value.product.id === item.product.id) {
            return {
              ...value,
              quantity: value.quantity + 1,
            }
          } else {
            return value;
          }
        });
      });
    }

    function decreaseProductList() {
      let indexToRemove = -1;

      setProductList(prev => {
        let newList = prev.map((value, index) => {
          if (value.product.id === item.product.id) {
            const newQtd =  value.quantity - 1;
            if (newQtd > 0) {
              return {
                ...value,
                quantity: value.quantity - 1,
              }
            }
            indexToRemove = index;
          }
          return value;
        });

        if (indexToRemove > -1) {
          newList = newList.filter((v, index) => index !== indexToRemove);
        }

        return newList;
      });
    }

    return (
      <HStack alignItems="center" justifyContent="space-between">
        <Text color="gray.500" flex={1} numberOfLines={1}>{item.product.name}</Text>

        <HStack alignItems="center">
          <IconButton
            onPress={decreaseProductList}
            icon={<FontAwesome name="minus-circle" size={24} color="black" />}
          />
          
          <Text color="gray.500">{item.quantity}</Text>
          
          <IconButton
            onPress={addProductList}
            icon={<FontAwesome name="plus-circle" size={24} color="black" />}
          />
        </HStack>
        
      </HStack>
    );
  }

  return (
    <Modal
      isOpen={!!showEditModal}
      onClose={() => setShowEditModal(null)}
      size="lg"
    >
      <Modal.Content backgroundColor="white">
        <Modal.CloseButton />
        <Modal.Header
          _text={{ color: "gray.400" }}
          borderColor="gray.200"
          backgroundColor="white"
        >
          Editar a lista
        </Modal.Header>

        <Modal.Body backgroundColor="white">
          <FlatList
            data={productList}
            renderItem={renderItem}
          />
        </Modal.Body>
        <Modal.Footer bg="white" borderColor="gray.200">
          <Button onPress={handleSave} w="100%" mt={2} isLoading={isLoading}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
