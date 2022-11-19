import React, { useState, useEffect, useContext } from "react";
import { Pressable, Modal, Select as NBSelect, Stack, useToast } from "native-base";

import api from "../../api";

import Text from "../Text";
import Button from "../Button";
import Select from "../Select";
import { ProductDTO } from "src/model/product";
import { ShoppingList as ShoppingListType } from "src/model/shopping";
import AuthContext from "../../context/AuthContext";
import Counter from "../Counter";
import ShoppingList from "src/screens/ShoppingList";
import { Alert } from "react-native";
import ToastSuccess from "../ToastSuccess";


type Props = {
  userId: number;
  showModal: ProductDTO;
  setShow: (product: ProductDTO) => void;
  shoppingLists: ShoppingListType[];
};

export default function ModalAddListProduct({
  userId,
  showModal,
  setShow,
  shoppingLists,
}: Props) {
  const [selectedList, setSelectedList] = useState<string>();
  const [quantity, setQuantity] = useState('0');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setQuantity('0');
    setErrorMsg('');
    setSelectedList(null);
  }, [showModal]);

  function handleAdd() {
    if (!quantity) {
      setErrorMsg('Quantidade inválida!');
      return;
    }
    if (!selectedList) {
      setErrorMsg('Selecione a lista!');
      return;
    }
    
    let productList = [];
    const shoppingListSelected = shoppingLists.find((item) => item.id === Number(selectedList));
    
    if (shoppingListSelected.productList) {
      productList = shoppingListSelected.productList
    }
    productList.push({
      product: showModal,
      quantity: Number(quantity),
    });

    setLoading(true);
    api.put('/shopping', {
      ...shoppingListSelected,
      productList,
      user: {
        id: userId,
      }
    })
      .then(() => {
        toast.show({
          render: () => <ToastSuccess message="Produto adicionado com sucesso!" /> 
        });
        setShow(null);
      })
      .catch(err => {
        Alert.alert('', 'Falha ao adicionar produto na lista.');
        console.log(err)
      })
      .finally(() => setLoading(false));
  }

  return (
    <Modal
      isOpen={!!showModal}
      onClose={() => setShow(null)}
      size="lg"
    >
      <Modal.Content backgroundColor="white">
        <Modal.CloseButton />
        <Modal.Header
          _text={{ color: "gray.400" }}
          borderColor="gray.200"
          backgroundColor="white"
        >
          Adicionar produto na lista
        </Modal.Header>
        {!!showModal && (
          <Modal.Body backgroundColor="white">
            <Text
              fontSize="md"
              color="gray.700"
            >
              {showModal.name}
            </Text>
            <Text fontWeight="bold" color="gray.700" fontSize="md">
              {' R$ '}{showModal.price.toFixed(2).replace('.',',')}
              <Text color="gray.400">{' '}{showModal.unity}</Text>              
            </Text>

            <Stack mb={4} justifyContent="center" alignItems="center">
            <Text color="gray.400">Quantidade</Text>
              <Counter quantity={quantity} setQuantity={setQuantity}/>
            </Stack>
            <Select
              accessibilityLabel="Lista de compra"
              placeholder="Selecione a lista"
              onValueChange={setSelectedList}
              selectedValue={selectedList}
              _selectedItem={{
                bg: "primary.400",
              }}
            >
              {shoppingLists.map(({ name, id }) => (
                <NBSelect.Item
                  key={id}
                  label={name}
                  value={String(id)}
                ></NBSelect.Item>
              ))}
            </Select>
            {!!errorMsg && <Text mt={2} color="error.500">{errorMsg}</Text>}
          </Modal.Body>
        )}
        <Modal.Footer bg="white" borderColor="gray.200">
          <Button isLoading={loading} onPress={handleAdd} w="100%" mt={2}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
