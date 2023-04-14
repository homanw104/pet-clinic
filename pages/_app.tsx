import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Component, ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { lightTheme, darkTheme } from "@/styles/globals-mui";
import { store } from "@/store/store"
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  const appWithLayout = getLayout(
    <Component {...pageProps} />
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline enableColorScheme />
        {appWithLayout}
        <Analytics />
      </ThemeProvider>
    </Provider>
  )
}
