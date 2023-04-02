import React from "react";
import { createTheme } from "@mui/material";

const shape = {
  borderRadius: 8,
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
    fontWeight: 300,
    letterSpacing: '-0.125rem',
  },
  h2: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 300,
    letterSpacing: '-0.03125rem',
  },
  h3: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 400,
    letterSpacing: '0rem',
  },
  h4: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", "Material Symbols Outlined", sans-serif',
    fontWeight: 400,
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
    },
    secondary: {
      main: '#6C5C41',
    },
    background: {
      paper: '#FFFBFF',
      default: '#FFFBFF',
    },
  },
  shape: shape,
  typography: typography
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#FABD3E',
    },
    secondary: {
      main: '#D9C4A2',
    },
    background: {
      paper: '#1F1B16',
      default: '#1F1B16',
    },
  },
  shape: shape,
  typography: typography
});

export { lightTheme, darkTheme };
