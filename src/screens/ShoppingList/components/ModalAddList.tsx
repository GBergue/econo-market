import React, {useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Modal,
  VStack,
} from "native-base";
import { Alert, View } from "react-native";

import api from "../../../api";
import { AntDesign } from '@expo/vector-icons'
import Input from "../../../components/Input";
import Button from "../../../components/Button";


export default function ModalAddList({ userId, showModal, setShowModal }) {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');

  
  function handleAdd() {
    if (!name) {
      Alert.alert('', 'Necessário informar nome para criar!');
      return;
    }

    setLoading(true);
    api.post('/shopping', {
      user: {
        id: userId,
      },
      name,
    })
      .then(({ data }) => {
        setShowModal(false);
      })
      .catch((err) => {
        Alert.alert('', 'Falha ao criar lista');
        console.log(err);
      })
      .finally(() => setLoading(false));
  }


  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      size="lg"
    >
      <Modal.Content backgroundColor="white">
        <Modal.CloseButton />
        <Modal.Header
          _text={{ color: "gray.400" }}
          borderColor="white"
          backgroundColor="white"
        >
          Adicionar lista de compras
        </Modal.Header>

        <Modal.Body backgroundColor="white">
          <Input
            placeholder="Nome para a lista de compras"
            width="100%"
            rounded="sm"
            bg="white"
            my={4}
            value={name}
            onChangeText={setName}
          />

          <Button
            isLoading={isLoading}
            onPress={handleAdd}
            mt={6}
            w="100%"
          >Adicionar</Button>
        </Modal.Body>

        
      </Modal.Content>
    </Modal>
  );
}
