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


export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}