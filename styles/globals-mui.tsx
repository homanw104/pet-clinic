/**
 * Style definitions used by @mui/material.
 * Custom theme properties are declared in types/globals.d.ts.
 */

import { createTheme, Theme } from "@mui/material";

const shape = {
  borderRadius: 8,
}

// Override default background color and text color
const components = {
  MuiCssBaseline: {
    styleOverrides: (theme: Omit<Theme, "components">) => `
      ::selection {
        color: ${theme.palette.surface.main};
        background-color: ${theme.palette.surface.onMain};
      }
    `,
  },
}

const typography = {
  fontFamily: [
    '"Noto Sans"',
    '"Noto Sans SC"',
    '"Material Symbols Outlined"',
    'sans-serif',
  ].join(','),
  h1: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 400,
    letterSpacing: '-0.125rem',
  },
  h2: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 400,
    letterSpacing: '-0.03125rem',
  },
  h3: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 500,
    letterSpacing: '0rem',
  },
  h4: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 500,
    letterSpacing: '0rem',
  },
  h5: {
    fontFamily: '"Noto Sans", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 500,
    letterSpacing: '0.01125rem',
  },
  h6: {
    fontFamily: '"Noto Sans", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 500,
    letterSpacing: '0.009375rem',
  },
  body1: {
    letterSpacing: '0.03125rem',
  }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7A5910',
      contrastText: '#FFFFFF',
      light: '#FFDCA9',
      dark: '#291801',
    },
    secondary: {
      main: '#6C5C41',
      contrastText: '#FFFFFF',
      light: '#FBDEBC',
      dark: '#261905',
    },
    tertiary: {
      main: '#4B6445',
      onMain: '#FFFFFF',
      container: '#CDEAC2',
      onContainer: '#082007',
    },
    error: {
      main: '#C3111C',
      contrastText: '#FFFFFF',
      light: '#FFD9D6',
      dark: '#450002'
    },
    background: {
      paper: '#FFF8F3',
      default: '#F9F2F2',
    },
    surface: {
      main: '#FFF8F3',
      onMain: '#1F1B16',
      dim: '#E1D9D0',
      1: '#F9F2F2',
      2: '#F7ECEB',
      3: '#F4E6E3',
      4: '#F3E4E0',
    },
    outline: {
      main: '#7F7668',
      variant: '#D0C5B5',
    },
    text: {
      primary: '#1F1B16',
    }
  },
  shape: shape,
  components: components,
  typography: typography,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FABD3E',
      contrastText: '#452C02',
      light: '#614104',
      dark: '#FFDCA9',
    },
    secondary: {
      main: '#D9C4A2',
      contrastText: '#3E2D16',
      light: '#56432B',
      dark: '#FBDEBC',
    },
    tertiary: {
      main: '#B1CDA7',
      onMain: '#1D361A',
      container: '#344C2F',
      onContainer: '#CDEAC2',
    },
    error: {
      main: '#FFB3AB',
      contrastText: '#6F0006',
      light: '#9B000C',
      dark: '#FFD9D6'
    },
    background: {
      paper: '#16130E',
      default: '#2A221E',
    },
    surface: {
      main: '#16130E',
      onMain: '#CCC5BD',
      dim: '#16130E',
      1: '#2A221E',
      2: '#312622',
      3: '#382B26',
      4: '#3A2D27',
    },
    outline: {
      main: '#7F7668',
      variant: '#D0C5B5',
    },
    text: {
      primary: '#CCC5BD',
    }
  },
  shape: shape,
  components: components,
  typography: typography,
});

export { lightTheme, darkTheme };
