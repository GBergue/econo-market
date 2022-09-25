import React from 'react';
import { Button as NBButton, IButtonProps } from 'native-base';


export default function Button(props: IButtonProps) {
  return (
    <NBButton
      colorScheme={props.colorScheme || 'primary'}
      fontFamily="body"
      bg={props.bg || 'primary.400'}
      rounded="sm"
      {...props}
    />
  );
}
