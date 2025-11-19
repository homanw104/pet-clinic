import axios from "axios";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { store } from "@/lib/store/store";
import CustomThemeProvider from "@/components/app/CustomThemeProvider";
import "@/lib/styles/globals.css";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const swrConfig = {
  fetcher: fetcher,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 0,
  focusThrottleInterval: 0,
}

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
      <SWRConfig value={swrConfig}>
        <CustomThemeProvider>
          <CssBaseline enableColorScheme />
          {appWithLayout}
          <Analytics />
        </CustomThemeProvider>
      </SWRConfig>
    </Provider>
  )
}
