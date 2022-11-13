import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Input as NBInput, IInputProps, Pressable, Modal } from 'native-base';

import { Pagination } from 'src/model/pagination';

import api from '../../api';

import Text from '../Text';
import Button from '../Button';


const SEGUNDO = 1000;

type Props = {
  showEditModal: number,
  setShowEditModal: (x: number) => void,
}

export default function ModalEditProduct({ showEditModal, setShowEditModal }: Props) {

  function handleEdit() {

  }
  
  return (
    <Modal
      isOpen={showEditModal > 0}
      onClose={() => setShowEditModal(0)}
      size="lg"
    >
      <Modal.Content backgroundColor="white">
        <Modal.CloseButton />
        <Modal.Header
          _text={{ color: "gray.400" }}
          borderColor="white"
          backgroundColor="white"
        >
          Editar produto
        </Modal.Header>

        <Modal.Body backgroundColor="white">
          <Button onPress={handleEdit}>
            Editar
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>

    );
}
