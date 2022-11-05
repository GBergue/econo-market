import React, { useState } from "react";
import { theme } from "../../theme/theme";
import {
  VStack,
  Center,
  Stack,
  ScrollView,
  SimpleGrid,
  Row,
  FlatList,
} from "native-base";
import Text from "../../components/Text";
import Card from "../../components/Card";

import LogoAzul from "@assets/logo_azul.svg";
import Header from "../../components/Header";
import Heading from "../../components/Heading";

// class Grid extends React.Component {
//   render() {
//     return <div>{this.props.children}</div>
//   }
// }

let data = [
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste1' },
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste1' },
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste' },
  { mercado: 'teste1' },
]
//data = [];

export default function Main() {

  function renderHeaderList() {
    if (!data.length) return null;

    return (
      <Text
        fontSize="md"
        color="gray.700"
      >
        {`(${data.length}) mercados encontrados`}
      </Text>
    );
  }
  
  function renderListEmpty() {
    return (
      <Text
        fontSize="md"
        color="gray.700"
      >
        Não foi encontrado, tente novamente
      </Text>
    );
  }


  return (
    <VStack bg="gray.100" flex={1}>
      <Header/>
      <VStack flex={1} paddingX={8}>
        <Heading
          mt={4}
          mb={2}
        >
          Mercados próximos
        </Heading>

        <FlatList
          data={data}
          ListHeaderComponent={renderHeaderList()}
          ListEmptyComponent={renderListEmpty()}
          renderItem={({ item }) => (
            <Card bg="white" mb={4} rounded="sm" p={4} onPress={() => console.log(item)}>
              <Text fontSize="lg" color="gray.700">{item.mercado}</Text>
            </Card>
          )}
        />

      </VStack>
    </VStack>
  );
}
