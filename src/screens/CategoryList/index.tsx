import React from "react";
import {
  VStack,
  FlatList,
  ScrollView,
  Stack,
} from "native-base";
import Text from "../../components/Text";
import Card from "../../components/Card";

import Header from "../../components/Header";
import Heading from "../../components/Heading";
import { View } from "react-native";


let data = [
  { categoria: 'Bebidas' },
  { categoria: 'Carnes' },
  { categoria: 'Congelados' },
  { categoria: 'Frios/Lacticínios' },
  { categoria: 'Mercearia' },
  { categoria: 'Cereais' },
  { categoria: 'Doces' },
  { categoria: 'Hortifruti' },
  { categoria: 'Higiene e Beleza' },
  { categoria: 'Limpeza' },
  { categoria: 'Pet-Shop' },
  { categoria: 'Jardinagem' },
  { categoria: 'Bazar' },
  { categoria: 'Outros' },
]
//data = [];

export default function CategoryList() {



  return (
    <VStack bg="gray.100" flex={1}>
      <Header title="Categorias" />
      <VStack flex={1} paddingX={8}>
        
      <Heading
          mt={4}
          mb={2}
        >
          Categorias
        </Heading>
        <ScrollView  flex={1}>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        
        {
            data.map(({ categoria }, index) => {
                
                return (
                    <Stack width="50%">
                        <Card
                            bg="white"
                            mr={index % 2 == 0 ? 2 : 0}
                            ml={index % 2 == 0 ? 0 : 2}
                            mb={4}
                            height={100}
                            rounded="sm"
                            p={4}
                            onPress={() => console.log(categoria)}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text fontSize="lg" color="gray.700">{categoria}</Text>
                        </Card>
                    </Stack>
                );
            })
        }
        </View>
        </ScrollView>
        {/* <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card width="45%" bg="white" mb={4} rounded="sm" p={4} onPress={() => console.log(item)}>
              <Text fontSize="lg" color="gray.700">{item.categoria}</Text>
            </Card>
          )}
        /> */}

      </VStack>
    </VStack>
  );
}
