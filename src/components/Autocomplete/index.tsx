import React, { useEffect, useRef, useState } from 'react';
import { Input as NBInput, IInputProps, Pressable, Modal } from 'native-base';
import api from '../../api';
import { Pagination } from 'src/model/pagination';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import Text from '../Text';
import Button from '../Button';

const SEGUNDO = 1000;

type Props = IInputProps & {
    showModal: boolean,
    setShowModal: (x: boolean) => void,
    selectedValue: string,
}

export default function Autocomplete(props: Props) {
    const [text, setText] = useState(props.selectedValue);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<Pagination<T>>();
    const [isLoading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const timerId = useRef<NodeJS.Timeout>();
    console.log(props.value);



    function handleSearch() {
        setLoading(true);
        api.get(`/search/brand?name=${text}`)
            .then(({ data }) => {
                console.log(data);
                setData(data);
                //Keyboard.dismiss();
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

    }

    function handleSetText(text) {
        console.log(text);
        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            handleSearch();
        }, 2 * SEGUNDO);
        props.onChangeText(text);
        //setText(text);
    }

    function handleSelectValue(item) {
        console.log(item);
        props.onChangeText(item.brandName);
        setSelected(item);
    }

    function handleSave() {
        props.onChangeText(selected);
        setShowModal(false);
    }

    function renderInput() {
        return (
            <NBInput
                selectionColor="primary.300"
                bg="gray.100"
                fontFamily="body"
                borderColor="gray.400"
                placeholderTextColor="gray.400"
                size="md"
                rounded="sm"
                fontSize="md"
                color="gray.700"
                _focus={{
                    borderColor: "primary.400",
                }}
                onFocus={() => {
                    if (!showModal) setShowModal(true)
                }}
                {...props}
                onChangeText={handleSetText}
            />
        );
    }

    if (!showModal) {
        return renderInput();
    }


    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="lg">
            <Modal.Content maxWidth="350">
                <Modal.CloseButton />
                <Modal.Header>Marcas</Modal.Header>
                <Modal.Body>
                    { renderInput() }
                    <FlatList
                        style={{ backgroundColor: 'white' }}
                        data={data ? data.content : null}
                        renderItem={({ item }) => {
                            return (
                                <Pressable py={1} onPress={() => handleSelectValue(item)}>
                                    <Text marginLeft={2} color="gray.700">{item.brandName}</Text>
                                </Pressable>
                            );
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onPress={handleSave}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )


    return (
        <View>
            <NBInput
                selectionColor="primary.300"
                bg="gray.100"
                fontFamily="body"
                borderColor="gray.400"
                placeholderTextColor="gray.400"
                size="md"
                rounded="sm"
                fontSize="md"
                color="gray.700"
                _focus={{
                    borderColor: "primary.400",
                }}
                onChangeText={handleSetText}
                {...props}
            />
            {show && (
                <FlatList
                style={{ height: 100, backgroundColor: 'white' }}
                data={data ? data.content : null}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => handleSelectValue(item.id)}>
                            <Text color="gray.700">{item.brandName}</Text>
                        </Pressable>
                    );
                }}
                />
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1
    }
  });
