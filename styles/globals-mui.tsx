import React from "react";
import { createTheme } from "@mui/material";

const shape = {
  borderRadius: 8,
}

const typography = {
  fontFamily: [
    '"Noto Sans SC"',
    '"Noto Sans"',
    'sans-serif',
  ].join(','),
  h1: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", sans-serif',
    fontWeight: 700,
    letterSpacing: '-0.125rem',
  },
  h2: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", sans-serif',
    fontWeight: 700,
    letterSpacing: '-0.03125rem',
  },
  h3: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", sans-serif',
    fontWeight: 500,
    letterSpacing: '0rem',
  },
  h4: {
    fontFamily: '"Noto Sans Display", "Noto Sans SC", sans-serif',
    fontWeight: 500,
    letterSpacing: '0rem',
  },
  h5: {
    fontFamily: '"Noto Sans SC", "Noto Sans", sans-serif',
    fontWeight: 400,
    letterSpacing: '0.01125rem',
  },
  h6: {
    fontFamily: '"Noto Sans SC", "Noto Sans", sans-serif',
    fontWeight: 400,
    letterSpacing: '0.009375rem',
  },
  body1: {
    letterSpacing: '0.03125rem',
  }
}

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#755B10',
    },
    secondary: {
      main: '#6A5D41',
    },
  },
  shape: shape,
  typography: typography
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#F0C046',
    },
    secondary: {
      main: '#D6C5A2',
    },
  },
  shape: shape,
  typography: typography
});

export { lightTheme, darkTheme };
