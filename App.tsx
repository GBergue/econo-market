import React from 'react';
import { NativeBaseProvider, Box, Center, Spinner } from 'native-base';
import Login from './src/screens/Login';
import { theme } from './src/theme/theme';
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';
import SignUp from './src/screens/SignUp';

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <NativeBaseProvider theme={theme}>
        <Center>
          <Spinner color="primary.400" />
        </Center>
      </NativeBaseProvider>
    )
  }

  return (
    <NativeBaseProvider theme={theme}>
      <Login />
    </NativeBaseProvider>
  );
}
