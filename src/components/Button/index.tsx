import React from 'react';
import { Button as NBButton, IButtonProps } from 'native-base';


export default function Button(props: IButtonProps) {
  return (
    <NBButton
        colorScheme="primary"
        fontFamily="body"
        bg="primary.400"
        {...props}
    />
  );
}
