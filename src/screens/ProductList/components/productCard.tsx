import React from 'react';
import { HStack, IPressableProps, Pressable, VStack } from 'native-base';
import Card from '../../../components/Card';
import Text from '../../../components/Text';


interface productItem {
    name: string,
    brand: string,
    market: string,
    date: string,
    price: string,
    unid: string,
}

interface Props {
    item: productItem,
}


export default function ProductCard({ item } : Props) {

  return (
    <Card bg="white" rounded="md" mb={2}>
        <VStack px={2}>
            <HStack
                w="100%"
                alignItems="center"
                justifyContent="space-between"
            >
                <Text
                    fontFamily="body"
                    fontSize="md"
                    color="gray.800"
                >
                    {item.name}
                </Text>
                <Text
                    fontFamily="body"
                    fontSize="md"
                    color="gray.700"
                >
                    {item.unid}
                </Text>
            </HStack>
            <Text
                fontFamily="body"
                fontSize="md"
                color="gray.700"
            >
                {item.brand}
            </Text>
            <Text
                fontFamily="body"
                fontSize="md"
                color="gray.700"
            >
                {item.market}
            </Text>
            
            <HStack
                w="100%"
                alignItems="flex-end"
                justifyContent="space-between"
            >
                <Text
                    fontFamily="body"
                    fontSize="sm"
                    color="gray.500"
                >
                    {item.date}
                </Text>
                <Text
                    fontFamily="heading"
                    fontSize="md"
                    color="gray.800"
                >
                    R$ {Number(item.price).toFixed(2).replace('.', ',')}
                </Text>
            </HStack>
        </VStack>
    </Card>
  );
}
