import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { Component, ReactElement, ReactNode } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { SWRConfig } from "swr";
import axios from "axios";
import Theme from "@/components/app/Theme";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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
      <SWRConfig value={{ fetcher: fetcher }}>
        <Theme>
          <CssBaseline enableColorScheme />
          {appWithLayout}
          <Analytics />
        </Theme>
      </SWRConfig>
    </Provider>
  )
}
