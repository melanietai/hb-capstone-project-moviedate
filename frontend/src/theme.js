import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const custom = {
  colors: {
    brand: {
      100: "#000000",
      200: "#14213D",
      300: "#FCA311",
      400: "#E5E5E5",
      500: "#FFFFFF"
    },
  },
};

const theme = extendTheme({ custom });

export default theme;