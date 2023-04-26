/**
 * Custom Theme wrapper.
 */

import React from "react";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/utils/hook_util";
import { darkTheme, lightTheme } from "@/styles/globals-mui";

interface ThemeProps {
  children: React.ReactNode;
}

export default function Theme({ children }: ThemeProps) {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <ThemeProvider theme={(theme === "lightTheme") ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  )
}
