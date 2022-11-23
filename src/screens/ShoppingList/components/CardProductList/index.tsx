import React from "react";
import { HStack } from "native-base";

import { InListProduct } from "src/model/shopping";

import Text from "../../../../components/Text";


type Props = {
  item: InListProduct,
};

export function CardProduct({ item }: Props) {

  return (
    <HStack rounded="md" bg="white" w="100%" py={1} justifyContent="space-between">
      <Text color="gray.500" numberOfLines={1} flex={1}>
        {item.product.name}
      </Text>
      <HStack>
        <Text color="gray.500" textAlign="right">{' '}{item.quantity}x =</Text>
        <Text bold color="gray.500" textAlign="right">{' R$'}{item.priceXQuantity.toFixed(2).replace('.',',')}</Text>
      </HStack>
    </HStack>
  );
};