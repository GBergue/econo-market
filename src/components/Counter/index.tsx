import React, { useState } from 'react';
import {
  HStack,
  IconButton,
} from 'native-base';

import Input from '../Input';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  quantity: string,
  setQuantity: (str: string) => void,
}

export default function Counter ({
  quantity,
  setQuantity,
}: Props) {

  function handleAdd() {
    let num = Number(quantity);
    if (num >= 0 ) {
      setQuantity(String(num + 1));
    }
  }

  function handleDecrease() {
    let num = Number(quantity);
    if (num && num > 0) {
      setQuantity(String(num - 1));
    }
  }

  function handleChangeText(text: string) {
    const onlyNumbers = text.replace(/\D/g, '');
    setQuantity(onlyNumbers);
  }

  return (
    <HStack>
      <IconButton
        onPress={handleDecrease}
        icon={<FontAwesome name="minus-circle" size={32} color="black" />}
      />
      
      <Input
        w="30%"
        value={quantity}
        onChangeText={handleChangeText}
        keyboardType="numeric"
      />
      
      <IconButton
        onPress={handleAdd}
        icon={<FontAwesome name="plus-circle" size={32} color="black" />}
      />
    </HStack>
  );
}
