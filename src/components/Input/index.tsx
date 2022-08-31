import React from 'react';
import { Input as NBInput, IInputProps } from 'native-base';


export default function Input(props: IInputProps) {
  return (
    <NBInput
      bg="gray.200"
      fontFamily="body"
      borderColor="gray.900"
      placeholderTextColor="gray.700"
      size="md"
      fontSize="md"
      color="gray.700"
      _focus={{
        borderColor: "primary.400",
      }}
      {...props}
    />
  );
}
