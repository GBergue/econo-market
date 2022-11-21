import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Modal, Toast } from "native-base";

import api from "../../api";

import Text from "../Text";
import Button from "../Button";
import Input from "../Input";
import { ProductDTO } from "src/model/product";
import ToastSuccess from "../ToastSuccess";
import { Pagination } from "src/model/pagination";


type Props = {
  showEditModal: ProductDTO;
  setShowEditModal: (product: ProductDTO) => void;
  setApiData: React.Dispatch<React.SetStateAction<Pagination<ProductDTO>>>;
};

export default function ModalEditProduct({
  showEditModal,
  setShowEditModal,
  setApiData,
}: Props) {
  const [price, setPrice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    if (showEditModal) {
      setPrice(String(showEditModal.price));
    } else {
      setErrorMsg('');
    }
  }, [showEditModal]);

  function updateListBeforeEdit(id: number, price: string) {
    setApiData(prevList => {
      const newListContent = prevList.content.map(prod => {
        if (prod.id === id) {
          const numPrice = Number(price);
          if (numPrice) {
            const priceGreater = numPrice < prod.price;
            prod.greaterThanLastPrice = priceGreater;
            prod.price = numPrice;
          }
        }
        return prod;
      });

      return {
        ...prevList,
        content: newListContent,
      };
    })
  }
  
  
  function handleEdit() {
    const {
      id,
      name,
      unity,
      brand,
      category,
      markets,
    } = showEditModal;

    if(Number(price) === showEditModal.price){
      setErrorMsg('Informe um preço diferente!');
      return;
    }

    if(!price.match("^[0-9.]+$")){
      setErrorMsg('Apenas números e ponto final!');
      return;
    }

    setLoading(true);
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
      markets,
    }).then(() => {
      updateListBeforeEdit(id, price);
      Toast.show({
        render: () => <ToastSuccess message="Preço editado com sucesso!" /> 
      });
      setShowEditModal(null);
    })
    .catch((err) => {
      Alert.alert('', 'Não foi possível atualizar o preço, tente novamente!');
      console.log(err);
    })
    .finally(() => setLoading(false));
  }

  function handleChange(text) {
    setPrice(text);
  };


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
          <Button onPress={handleEdit} w="100%" mt={2} isLoading={isLoading}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
