import React from 'react';
import { HStack, IconButton, IPressableProps, Pressable, VStack } from 'native-base';
import Card from '../Card';
import Text from '../Text';
import { Product } from 'src/model/product';
import { Feather, AntDesign } from '@expo/vector-icons';

interface Props {
    item: Product,
    navigation: any,
    setShowEditModal: (id: number) => void,
}


export default function ProductCard({ item, navigation, setShowEditModal } : Props) {

  function handleAddCart() {

  }

  function handleEdit() {
    setShowEditModal(item.id);
  }


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
                <IconButton
                  onPress={handleAddCart}
                  icon={<AntDesign name="shoppingcart" size={18} color="black" />}
                />
                <IconButton
                  onPress={handleEdit}
                  icon={<Feather name="edit" size={12} color="black" />}
                />
                
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
