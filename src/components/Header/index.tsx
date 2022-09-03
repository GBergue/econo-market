import React from 'react';
import { HStack, Icon, VStack } from 'native-base';

import LogoWhite from '@assets/logo_white.svg';
import Text from '../Text';
import { Feather } from '@expo/vector-icons';

export default function Header() {
  return (
    <VStack
      bg="primary.500"
      padding={4}
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

        <Text>Title</Text>

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
