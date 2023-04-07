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
      default: '#FFF8F3',
    },
    surface: {
      main: '#FFF8F3',
      onMain: '#1F1B16',
      1: '#FBF2F2',
      2: '#F9ECEB',
      3: '#F7E6E3',
      4: '#F6E4E0',
    },
  },
  shape: shape,
  typography: typography
});

const darkTheme = createTheme({
  palette: {
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
      default: '#16130E',
    },
    surface: {
      main: '#16130E',
      onMain: '#CCC5BD',
      1: '#2C221E',
      2: '#332622',
      3: '#3B2B26',
      4: '#3D2D27',
    }
  },
  shape: shape,
  typography: typography
});

export { lightTheme, darkTheme };
