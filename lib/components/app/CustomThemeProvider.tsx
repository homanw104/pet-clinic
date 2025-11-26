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
  const themeName = useAppSelector((state) => state.theme.name);

  return (
    <ThemeProvider theme={(themeName === "lightTheme") ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
}
