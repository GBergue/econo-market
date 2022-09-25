import React from 'react';
import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';

import Routes from './src/routes';

import { theme } from './src/theme/theme';

import Loading from './src/components/Loading';
import { AuthContextProvider } from './src/context/AuthContext';


export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
