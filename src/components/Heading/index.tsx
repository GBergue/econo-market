import React from 'react';
import { ITextProps, Heading as NBHeading} from 'native-base';


export default function Heading({ children, ...rest }: ITextProps) {
  return (
    <NBHeading
      fontFamily="heading"
      fontSize="lg"
      color="gray.700"
      {...rest}
    >
      {children}
    </NBHeading>
  );
}
