import React from "react";
import { Center, VStack, HStack, Skeleton } from "native-base";


export function LoadingComponent() {
  return (
    <VStack w="100%">
      <Skeleton mb={4} h="75" w="100%" rounded="sm" />
      <Skeleton mb={4} h="75" w="100%" rounded="sm" />
      <Skeleton mb={4} h="75" w="100%" rounded="sm" />
      <Skeleton mb={4} h="75" w="100%" rounded="sm" />
      <Skeleton mb={4} h="75" w="100%" rounded="sm" />
      <Skeleton mb={4} h="75" w="100%" rounded="sm" />
      <Skeleton mb={4} h="75" w="100%" rounded="sm" />
      <Skeleton mb={4} h="75" w="100%" rounded="sm" />
    </VStack>
  );
};