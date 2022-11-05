import React, { useRef, useState } from 'react';
import { Input as NBInput, IInputProps, Pressable, Modal } from 'native-base';
import api from '../../api';
import { Pagination } from 'src/model/pagination';
import { FlatList, StyleSheet } from 'react-native';
import Text from '../Text';
import Button from '../Button';

const SEGUNDO = 1000;

type Props = IInputProps & {
    showModal: boolean,
    setShowModal: (x: boolean) => void,
    selectedValue: string,
}

export default function Autocomplete<T>(props: Props) {
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<Pagination<T>>();
    const [isLoading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const timerId = useRef<NodeJS.Timeout>();


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

    function handleSetText(text: string) {
        setText(text);
        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            handleSearch();
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

    if (!showModal) {
        return renderInput();
    }


    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="lg"    
        >
            <Modal.Content
                bg="white"
                maxWidth="350"
            >
                <Modal.CloseButton  />
                
                <Modal.Body>

                    { renderInput() }

                    <FlatList
                        style={{ backgroundColor: 'white' }}
                        data={data ? data.content : null}
                        renderItem={({ item }) => (
                            <Pressable py={1} onPress={() => handleSelectValue(item)}>
                                <Text marginLeft={2} color={item.id === selected?.id ? "primary.400" : "gray.700"}>
                                    {item.brandName}
                                </Text>
                            </Pressable>
                        )}
                        ListFooterComponent={(
                            <Button
                                mt={2}
                                onPress={handleSave}
                            >
                                Salvar
                            </Button>
                        )}
                    />
                    
                </Modal.Body>

            </Modal.Content>
        </Modal>
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
