import React from 'react';
import { HStack, Icon, IconButton, VStack } from 'native-base';
import Card from '../Card';
import Text from '../Text';
import { ProductDTO } from 'src/model/product';
import { Feather, AntDesign } from '@expo/vector-icons';
import { LocationObject } from 'expo-location';
import { getDistanceFromLatLonInKm } from '../../helper/location';

interface Props {
    item: ProductDTO,
    navigation: any,
    setShowEditModal: (item: ProductDTO) => void,
    setShowAddCartModal: (item: ProductDTO) => void,
    location: LocationObject,
}


export default function ProductCard({ item, navigation, setShowEditModal, setShowAddCartModal, location } : Props) {
  function handleAddCart() {
    setShowAddCartModal(item);
  }
  

  function handleEdit() {
    setShowEditModal(item);
  }

  const showBrand = !!item.brand?.brandName;
  const showCategory = !!item.category?.name;
  const showMarket = !!item.markets[0]?.name;
  const marketLatitude = item.markets[0]?.address?.locateX;
  const marketLongitude = item.markets[0]?.address?.locateY;

  let distance: string;

  if (location && marketLatitude && marketLongitude) {
    const numDistance = getDistanceFromLatLonInKm(location.coords.latitude, location.coords.longitude, marketLatitude, marketLongitude);
    distance = numDistance.toFixed(2).replace('.',',');
  }

  function getIcon() {
    if (item.greaterThanLastPrice === null) {
        return null;
    }

    return (
        <Icon
            as={AntDesign}
            name={item.greaterThanLastPrice ? "caretup" : "caretdown"}
            color={getColor()}
            size="xs"
        />
    );
  }

  function getColor() {
    if (item.greaterThanLastPrice) {
        return "green.500";
    }
    if (item.greaterThanLastPrice === null) {
        return "gray.800";
    }
    return "red.500";
  }
  
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
                    numberOfLines={2}
                    flex={1}
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
                
                {showMarket && (
                    <Text
                        fontFamily="body"
                        fontSize="sm"
                        color="gray.400"
                    >
                        {item.markets[0].name}
                        {!!distance && (
                            <Text
                                fontFamily="body"
                                fontSize="sm"
                                color="gray.400"
                            >
                                {' '}({distance} km)
                            </Text>
                        )}
                    </Text>
                )}

                <HStack alignItems="center" >
                    <Text  fontSize="md" color="gray.400">
                        R${' '}
                    </Text>
                    { getIcon() }
                    <Text
                        fontFamily="heading"
                        fontSize="md"
                        color={getColor()}
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
