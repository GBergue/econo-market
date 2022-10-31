import React from "react";
import { Center, VStack, HStack, Skeleton } from "native-base";


export function LoadingComponent() {
  return (
      
    <VStack w="100%">
        <HStack mb={4}>
          <Skeleton mr={2} h="100" w="50%" rounded="sm" />
          <Skeleton ml={2} h="100" w="50%" rounded="sm" />
        </HStack>
        <HStack mb={4}>
          <Skeleton mr={2} h="100" w="50%" rounded="sm" />
          <Skeleton ml={2} h="100" w="50%" rounded="sm" />
        </HStack>
        <HStack mb={4}>
          <Skeleton mr={2} h="100" w="50%" rounded="sm" />
          <Skeleton ml={2} h="100" w="50%" rounded="sm" />
        </HStack>
        <HStack mb={4}>
          <Skeleton mr={2} h="100" w="50%" rounded="sm" />
          <Skeleton ml={2} h="100" w="50%" rounded="sm" />
        </HStack>
        <HStack mb={4}>
          <Skeleton mr={2} h="100" w="50%" rounded="sm" />
          <Skeleton ml={2} h="100" w="50%" rounded="sm" />
        </HStack>
      </VStack>
  );
};