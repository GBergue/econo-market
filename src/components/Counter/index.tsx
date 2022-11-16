import React, { useState } from 'react';
import {
  HStack,
  IconButton,
} from 'native-base';

import Input from '../Input';
import { FontAwesome } from '@expo/vector-icons';

export default function Counter () {
  const [counter, setCounter] = useState('0');

  return (
    <HStack>
      <IconButton
        icon={<FontAwesome name="minus-circle" size={32} color="black" />}
      />
      
      <Input
        w="30%"
        value={counter}
        onChangeText={setCounter}
        keyboardType="numeric"
      />
      
      <IconButton
        icon={<FontAwesome name="plus-circle" size={32} color="black" />}
      />
    </HStack>
  );
}
