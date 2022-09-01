import React from 'react';
import { Input as NBInput, IInputProps } from 'native-base';


export default function Input(props: IInputProps) {
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
      {...props}
    />
  );
}
