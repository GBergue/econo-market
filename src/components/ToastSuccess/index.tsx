import React, { useState, useContext } from 'react';
import { Box, Center, Icon, KeyboardAvoidingView, ScrollView } from 'native-base';
import { Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Text from '../Text';

type Props = {
  message: string;
}

export default function ToastSuccess({ message }: Props) {

  return (
    <Box
      bg="emerald.200"
      p={4}
      mb={5}
      rounded="sm"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Icon
        as={AntDesign}
        name="checkcircle"
        color="emerald.500"
        mr={2}
      />
      <Text color="gray.700">{message}</Text>
    </Box>
  );
}
