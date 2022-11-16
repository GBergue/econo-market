import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Select as NBSelect } from "native-base";
import { Feather } from "@expo/vector-icons";
import { VStack, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Text from "../../components/Text";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import Select from "../../components/Select";

import api from "../../api";
import * as Location from 'expo-location';


export default function RegisterLocation() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        setErrorMsg('Permissão para localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function handleSearch() {
      setIsLoading(true);
      
      setIsLoading(false);
  }


  return (
    <VStack bg="gray.100" flex={1}>
      <Header/>

      <ScrollView paddingX={8}>
        <Heading marginY={4}>Informe sua localização</Heading>
      
        <Input
          placeholder="Digite o endereço"
          marginBottom={2}
          onChangeText={setLocation}
          value={location}
        />
        
        <Text color="black">{text}</Text>
        
        <Button
          marginBottom={2}
          endIcon={<Feather name="log-in" size={16} color="white" />}
          onPress={handleSearch}
          isLoading={isLoading}
        >
          Buscar
        </Button>
      </ScrollView>
    </VStack>
  );
}
