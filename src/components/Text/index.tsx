import React from 'react';
import { ITextProps, Text as NBText} from 'native-base';


export default function Text({ children, ...rest }: ITextProps) {
  return (
    <NBText
      fontFamily="body"
      {...rest}
    >
      {children}
    </NBText>
  );
}
