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
import Loading from "../../components/Loading";

import api from "../../api";
import * as Location from 'expo-location';


export default function RegisterLocation() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <VStack bg="gray.100" flex={1}>
      <Header/>

      <VStack>
        {isLoading && <Loading/>}
        
        {!!errorMsg && <Text color="error.500">{errorMsg}</Text>}
        </VStack>
    </VStack>
  );
}
