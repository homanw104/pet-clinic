import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Component } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { lightTheme, darkTheme } from "@/styles/globals-mui";
import { store } from "@/store/store"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline enableColorScheme />
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </Provider>
  )
}
