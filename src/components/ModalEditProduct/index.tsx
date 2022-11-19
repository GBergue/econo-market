import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Modal, Toast } from "native-base";

import api from "../../api";

import Text from "../Text";
import Button from "../Button";
import Input from "../Input";
import { ProductDTO } from "src/model/product";
import ToastSuccess from "../ToastSuccess";


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
  
  
  function handleEdit() {
    const {
      id,
      name,
      unity,
      brand,
      category,
      market
    } = showEditModal;

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
        render: () => <ToastSuccess message="Preço editado com sucesso!" /> 
      });
    })
    .catch((err) => {
      Alert.alert('', 'Não foi possível atualizar o preço, tente novamente!');
      console.log(err);
    })
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
