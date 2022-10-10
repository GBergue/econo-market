import React from 'react';
import { HStack, Icon, VStack } from 'native-base';

import LogoWhite from '@assets/logo_white.svg';
import Text from '../Text';
import { Feather } from '@expo/vector-icons';
import Heading from '../Heading';

export default function Header ({title}) {
  return (
    <VStack
      bg="primary.500"
      padding={2}
      pt={8}
    >
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <LogoWhite
          height={75}
          width={75}
        />

    
        {/* <Heading color="white">{title}</Heading> */}

        <Icon
          as={Feather}
          name="menu"
          color="white"
          size={8}
        />
      </HStack>
    </VStack>
  );
}
