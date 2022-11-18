import React, { useState } from "react";
import { Alert } from "react-native";
import { Pressable, HStack } from "native-base";
import { Feather, AntDesign } from '@expo/vector-icons';

import { InListProduct } from "src/model/shopping";

import Text from "../../../../components/Text";


type Props = {
  item: InListProduct,
};

export function CardProduct({ item }: Props) {

  function handleDelete() {

  }

  return (
    <HStack rounded="md" bg="white" w="100%" py={1} justifyContent="space-between">
      <Text color="gray.500">
        {item.product.name}
      </Text>
      <Text color="gray.500" textAlign="right">{' '}{item.quantity}x</Text>
      {/* <Pressable onPress={handleDelete}>
        <Feather name="trash" size={18} color="red" />
      </Pressable> */}
    </HStack>
  );
};