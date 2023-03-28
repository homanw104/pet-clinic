import React from "react";
import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#755B10',
    },
    secondary: {
      main: '#6A5D41',
    },
  },
  typography: {
    fontFamily: [
      '"Noto Sans SC"',
      '"Noto Sans"',
      'sans-serif',
    ].join(',')
  },
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
  typography: {
    fontFamily: [
      '"Noto Sans SC"',
      '"Noto Sans"',
      'sans-serif',
    ].join(',')
  },
});

export { lightTheme, darkTheme };
