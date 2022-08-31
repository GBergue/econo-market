import { extendTheme } from "native-base";

export const theme = extendTheme({
    colors: {
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',

        400: '#00ace4',
        500: '#197aa6',

        600: '#007AB8',
        700: '#00ace4',
        900: '#003F5E',
        800: '#005885',
      },
      amber: {
        400: '#d97706',
      },
      gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#52525b',
        800: '#27272a',
        900: '#18181b',
      },
    },
      fonts: {
        heading: 'Lato_700Bold',
        body: 'Lato_400Regular',
      },
      fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
      },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });

