import React from 'react';
import { Select as NBSelect, ISelectProps } from 'native-base';


export default function Select(props: ISelectProps) {
  return (
    <NBSelect
      bg="gray.100"
      fontFamily="body"
      borderColor="gray.400"
      placeholderTextColor="gray.400"
      size="md"
      rounded="sm"
      fontSize="md"
      color="gray.700"
      {...props}
    />
  );
}
