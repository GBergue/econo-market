import React from 'react';
import { HStack, Icon, IconButton, VStack } from 'native-base';
import Card from '../Card';
import Text from '../Text';
import { ProductDTO } from 'src/model/product';
import { Feather, AntDesign } from '@expo/vector-icons';

interface Props {
    item: ProductDTO,
    navigation: any,
    setShowEditModal: (item: ProductDTO) => void,
    setShowAddCartModal: (item: ProductDTO) => void,
}


export default function ProductCard({ item, navigation, setShowEditModal, setShowAddCartModal } : Props) {
  function handleAddCart() {
    setShowAddCartModal(item);
  }

  function handleEdit() {
    setShowEditModal(item);
  }

  const showBrand = !!item.brand?.brandName;
  const showCategory = !!item.category?.name;

  return (
    <Card bg="white" rounded="md" mb={2}>
        <VStack px={2} py={1}>
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
                    {showBrand && (
                        <Text
                            fontFamily="body"
                            fontSize="sm"
                            color="gray.400"
                        >
                            {' '}{item.brand.brandName}
                        </Text>
                    )}
                </Text>
                <HStack>
                    <IconButton
                        mr={2}
                        onPress={handleAddCart}
                        icon={
                            <Icon
                                as={AntDesign}
                                name="shoppingcart"
                                color="gray.800"
                                size="md"
                            />
                        }
                    />
                    <IconButton
                        onPress={handleEdit}
                        icon={
                            <Icon
                                as={Feather}
                                name="edit"
                                color="gray.800"
                                size="md"
                            />
                        }
                    />
                </HStack>

            </HStack>
            
            {showCategory && (
                <Text
                    fontFamily="body"
                    fontSize="sm"
                    color="gray.400"
                >
                    {item.category.name}
                </Text>
            )}
            
            <HStack
                w="100%"
                alignItems="flex-end"
                justifyContent="space-between"
            >
                
                <Text
                fontFamily="body"
                fontSize="sm"
                color="gray.400"
                >
                    {item.market.name}
                </Text>

                <HStack alignItems="center" >
                    <Text  fontSize="md" color="gray.400">
                        R${' '}
                    </Text>
                    <Icon
                        as={AntDesign}
                        name={item.greaterThanLastPrice ?"caretup" : "caretdown"}
                        color={item.greaterThanLastPrice ? "red.500" : "green.500"}
                        size="xs"
                    />
                    <Text
                        fontFamily="heading"
                        fontSize="md"
                        color={item.greaterThanLastPrice ? "red.500" : "green.500"}
                    >
                        {Number(item.price).toFixed(2).replace('.', ',')}
                    </Text>
                    <Text  fontSize="md" color="gray.400">
                        {' '}{item.unity}
                    </Text>
                </HStack>          
                    
                
            </HStack>
        </VStack>
    </Card>
  );
}
