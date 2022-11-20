import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Input as NBInput, IInputProps, Pressable, Modal } from 'native-base';

import { Pagination } from 'src/model/pagination';

import api from '../../api';

import Text from '../Text';
import Button from '../Button';
import { BrandDTO } from 'src/model/brand';


const SEGUNDO = 1000;

type Props = IInputProps & {
    showModal: boolean,
    setShowModal: (x: boolean) => void,
    selectedValue: string,
}

export default function Autocomplete<T>(props: Props) {
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<BrandDTO[]>();
    const [isLoading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const timerId = useRef<NodeJS.Timeout>();


    function handleSearch(name) {
        setLoading(true);
        console.log(`/search/brand/name?name=${name}`);
        api.get(`/search/brand/name?name=${name}`)
            .then(({ data }) => {
                console.log(data);
                setData(data);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

    }

    function handleSetText(name: string) {
        setText(name);
        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            handleSearch(name);
        }, 2 * SEGUNDO);
    }

    function handleSelectValue(item) {
        props.onChangeText(item.id);
        setSelected(item);
        setText(item.brandName);
    }

    function handleSave() {
        let callOnChange = false;
        if (selected) {
            if (selected.brandName === text) {
                callOnChange = true;
                props.onChangeText(selected.id);
            }
        }
        
        if (!callOnChange) {
            props.onChangeText(text);
        }
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
                value={text}
                onChangeText={handleSetText}
            />
        );
    }

    return (
        <>
            { renderInput() }

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                size="lg"    
            >
                <Modal.Content
                    bg="white"
                    maxWidth="350"
                >
                    <Modal.CloseButton/>
                    <Modal.Header
                        _text={{ color: "gray.400" }}
                        borderColor="white"
                        backgroundColor="white"
                    >
                        Digite a marca
                    </Modal.Header>
                    
                    <Modal.Body>
                        { renderInput() }

                        <FlatList
                            style={{ backgroundColor: 'white' }}
                            data={data}
                            renderItem={({ item }) => (
                                <Pressable py={1} onPress={() => handleSelectValue(item)}>
                                    <Text marginLeft={2} color={item.id === selected?.id ? "primary.400" : "gray.700"}>
                                        {item.brandName}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </Modal.Body>
                    <Modal.Footer
                        bg="white"
                        borderColor="white"
                    >
                        <Button
                            isLoading={isLoading}
                            w="100%"
                            mt={2}
                            onPress={handleSave}
                        >
                            Salvar
                        </Button>
                    </Modal.Footer>

                </Modal.Content>
            </Modal>
        </>
    );
}
