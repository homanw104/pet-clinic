/**
 * Style definitions used by @mui/material.
 * Edit types/globals.d.ts to allow custom theme properties.
 */

import React from "react";
import { createTheme } from "@mui/material";

const shape = {
  borderRadius: 12,
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
      onMain: '#FFFFFF',
      container: '#FFDCA9',
      onContainer: '#291801',
    },
    secondary: {
      main: '#6C5C41',
      onMain: '#FFFFFF',
      container: '#FBDEBC',
      onContainer: '#261905',
    },
    tertiary: {
      main: '#4B6445',
      onMain: '#FFFFFF',
      container: '#CDEAC2',
      onContainer: '#082007',
    },
    error: {
      main: '#C3111C',
      onMain: '#FFFFFF',
      container: '#FFD9D6',
      onContainer: '#450002'
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
  },
  shape: shape,
  typography: typography
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FABD3E',
      onMain: '#452C02',
      container: '#614104',
      onContainer: '#FFDCA9',
    },
    secondary: {
      main: '#D9C4A2',
      onMain: '#3E2D16',
      container: '#56432B',
      onContainer: '#FBDEBC',
    },
    tertiary: {
      main: '#B1CDA7',
      onMain: '#1D361A',
      container: '#344C2F',
      onContainer: '#CDEAC2',
    },
    error: {
      main: '#FFB3AB',
      onMain: '#6F0006',
      container: '#9B000C',
      onContainer: '#FFD9D6'
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
    text: {
      primary: '#CCC5BD',
    }
  },
  shape: shape,
  typography: typography
});

export { lightTheme, darkTheme };
