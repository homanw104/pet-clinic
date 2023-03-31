import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Component } from "react";
import { ThemeProvider } from "@mui/system";
import { lightTheme, darkTheme } from "@/styles/globals-mui";
import AppGridLayout from "@/components/layout/app_grid_layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
