import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Pressable, Modal, Toast } from "native-base";

import { Pagination } from "src/model/pagination";

import api from "../../api";

import Text from "../Text";
import Button from "../Button";
import Input from "../Input";
import { Product, ProductDTO } from "src/model/product";


type Props = {
  showEditModal: ProductDTO;
  setShowEditModal: (product: ProductDTO) => void;
};

export default function ModalEditProduct({
  showEditModal,
  setShowEditModal,
}: Props) {
  const [price, setPrice] = useState('');


  useEffect(() => {
    if (showEditModal) {
      setPrice(String(showEditModal.price));
    }
  }, [showEditModal]);
  
  const [errorMsg, setErrorMsg] = useState('');
  
  function handleEdit() {
    const {
      id,
      name,
      unity,
      brand,
      category,
      market
    } = showEditModal;

    // console.log({
    //   id,
    //   name,
    //   price,
    //   unity,
    //   brand: {
    //     id: brand.id
    //   },
    //   category: {
    //     id: category.id
    //   },
    //   markets: [{
    //     id: market.id
    //   }]
    // });
    // if(!validate(price)){
    //   Toast.show({
    //     description: "Apenas números e ponto final"
    //   });
    //   return;
    // }
    if(Number(price) === showEditModal.price){
      // Toast.show({
      //   description: "Apenas números e ponto final!"
      // });
      setErrorMsg('Informe um preço diferente!');
      return;
    }

    if(!price.match("^[0-9.]+$")){
      // Toast.show({
      //   description: "Apenas números e ponto final!"
      // });
      setErrorMsg('Apenas números e ponto final!');
      return;
    }

    api.put("register/product", {
      id,
      name,
      price,
      unity,
      brand: {
        id: brand.id
      },
      category: {
        id: category.id
      },
      markets: [{
        id: market.id
      }]
    }).then(() => {
      Toast.show({
        description: "Preço editado com sucesso!",
      });
      setShowEditModal(null);
    })
    .catch((err) => {
      Alert.alert('', 'Não foi possível atualizar o preço, tente novamente!');
      console.log(err);
    })
  }

  function handleChange(text) {
    setPrice(text);
  };

  function validate(value: string) {
    const matches = value.match("^[0-9.]+$");
    return matches?.length > 0 || "Apenas números e ponto final";
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
          Editar preço do produto
        </Modal.Header>

        <Modal.Body backgroundColor="white">
          <Text color="gray.500" mb={2} fontSize="md">
            {showEditModal?.name}
          </Text>

          <Input
            placeholder="Novo preço"
            onChangeText={handleChange}
            value={price}
            keyboardType="numeric"
          />
            {!!errorMsg && <Text mt={2} color="error.500">{errorMsg}</Text>}
        </Modal.Body>
        <Modal.Footer bg="white" borderColor="gray.200">
          <Button onPress={handleEdit} w="100%" mt={2}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
