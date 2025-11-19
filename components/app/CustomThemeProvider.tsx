/**
 * Custom Theme wrapper.
 */

import React from "react";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/lib/utils/hook";
import { darkTheme, lightTheme } from "@/lib/styles/globals-mui";

interface ThemeProps {
  children: React.ReactNode;
}

export default function CustomThemeProvider({ children }: ThemeProps) {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <ThemeProvider theme={(theme === "lightTheme") ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  )
}
