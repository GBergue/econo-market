import React, { useState, useEffect, useContext } from "react";
import { Pressable, Modal, Select as NBSelect, Stack } from "native-base";

import api from "../../api";

import Text from "../Text";
import Button from "../Button";
import Select from "../Select";
import { ProductDTO } from "src/model/product";
import { ShoppingList as ShoppingListType } from "src/model/shopping";
import AuthContext from "../../context/AuthContext";
import Counter from "../Counter";


type Props = {
  showModal: ProductDTO;
  setShow: (product: ProductDTO) => void;
};

export default function ModalAddListProduct({
  showModal,
  setShow,
}: Props) {
  const [lists, setList] = useState<ShoppingListType[]>([]);
  const [selectedList, setSelectedList] = useState();
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(false);
  const { getUserId } = useContext(AuthContext);

  useEffect(() => {
    getList();
  }, [showModal]);

  function getList() {
    setLoading(true);
    api.get<ShoppingListType[]>(`/shopping/user/${getUserId()}`)
      .then(({ data }) => {
        setList(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  
  function handleAdd() {

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
              fontWeight="bold"
              fontSize="md"
              color="gray.700"
              mb={4}
            >
              {showModal.name} {showModal.price} {showModal.unity}
            </Text>
            <Stack mb={4} justifyContent="center" alignItems="center">
              <Counter/>
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
              {lists.map(({ name, id }) => (
                <NBSelect.Item
                  key={id}
                  label={name}
                  value={String(id)}
                ></NBSelect.Item>
              ))}
            </Select>
          </Modal.Body>
        )}
        <Modal.Footer bg="white" borderColor="gray.200">
          <Button onPress={handleAdd} w="100%" mt={2}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
