import React, {useEffect, useState } from "react";
import {
  VStack,
  FlatList,
  ScrollView,
  Stack,
  Center,
} from "native-base";
import { Alert, View } from "react-native";

import Text from "../../components/Text";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import Loading from "../..//components/Loading";

import { CategoryDTO } from "../../model/category";

import api from "../../api";
import { LoadingComponent } from "./components/LoadingCategory";


export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get<CategoryDTO[]>('/search/category')
      .then(({ data }) => {
        setTimeout(() => {
          setCategories(data);
        }, 5000);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Falha de conexão', err);
      })
      .finally(() => setLoading(false));
  }, []);


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
          {/* {isLoading && (
              
          )} */}
        {
            categories.map(({ name, id }, index) => {
                
                return (
                    <Stack key={id} width="50%">
                        <Card
                            bg="white"
                            mr={index % 2 == 0 ? 2 : 0}
                            ml={index % 2 == 0 ? 0 : 2}
                            mb={4}
                            height={100}
                            rounded="sm"
                            p={4}
                            onPress={() => console.log(name)}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text fontSize="md" color="gray.700">{name}</Text>
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
