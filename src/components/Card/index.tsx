import React from 'react';
import { IPressableProps, Pressable } from 'native-base';


export default function Card({children, ...rest } :IPressableProps) {
  return (
    <Pressable {...rest}>
        {children}
    </Pressable>
  );
}
