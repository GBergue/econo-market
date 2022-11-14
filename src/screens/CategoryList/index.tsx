import React, {useEffect, useState } from "react";
import {
  VStack,
  ScrollView,
  Stack,
  Image,
} from "native-base";
import { Alert, View } from "react-native";

import Text from "../../components/Text";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Heading from "../../components/Heading";

import { CategoryDTO } from "../../model/category";
import { getImageSource } from "../../helper/category";

import api from "../../api";
import { LoadingComponent } from "./components/LoadingCategory";
import { useNavigation } from "@react-navigation/native";


export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    
    setLoading(true);
    api.get<CategoryDTO[]>('/search/category')
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Falha de conexão', err);
      })
      .finally(() => {
        setLoading(false);
        //navigation.navigate('registerLocation');
      });
  }, []);

  
  function handleLoadCategory(categoryId: number) {
    navigation.navigate('searchProductByCategory', { categoryId });
  }

  function renderCategoryComponent(index: number, item: CategoryDTO) {
    const imgSource = getImageSource(item.name);

    return (
      <Stack key={item.id} width="50%">
          <Card
              bg="white"
              mr={index % 2 == 0 ? 2 : 0}
              ml={index % 2 == 0 ? 0 : 2}
              mb={4}
              height={100}
              rounded="sm"
              p={4}
              onPress={() => handleLoadCategory(item.id)}
              alignItems="center"
              justifyContent="center"
          >
              {!!imgSource && <Image
                source={imgSource}
                alt={item.name}
                resizeMode="contain"
                size="md"
              />}
              <Text fontSize="md" color="gray.700">{item.name}</Text>
          </Card>
      </Stack>
    );
  }


  return (
    <VStack bg="gray.100" flex={1}>
      <Header/>
      <VStack flex={1} paddingX={8}>
        
        <Heading my={4}>
          Categorias
        </Heading>

        <ScrollView showsVerticalScrollIndicator={false} mt={2} flex={1}>
        
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        
        {isLoading && (<LoadingComponent/>)}

        {
          categories.map((item, index) => renderCategoryComponent(index, item))
        }
        </View>
        </ScrollView>
      </VStack>
    </VStack>
  );
}
