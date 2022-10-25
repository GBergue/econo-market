import React, { useState } from 'react';
import { Button as NBButton, IButtonProps, Icon, IconButton, Stack, VStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons'
import { theme } from 'src/theme/theme';
import Text from '../Text';

interface Props {
    text: string;
    type: 'success' | 'error';
}

export default function Alert(props: Props) {
    const [visible, setVisible] = useState(false);

    function getIcon() {
        let name = "checkcircle";
        let color = "success.500";
        if (props.type === 'error') {
            name = "closecircle";
            color = "error.500";
        }
        return (
            <Icon
                as={AntDesign}
                name={name}
                color="error.500"
                size={24}
            />
        )
    }

    function handleClose() {
        setVisible(false);
    }


    if (!visible) return null;

    return (
        <Stack>
            <VStack>
                <IconButton
                    as={AntDesign}
                    name="close"
                    color="red.500"
                    size={12}
                    onPress={handleClose}
                />
                
                {getIcon()}

                <Text>{props.text}</Text>
            </VStack>
        </Stack>
    );
}
