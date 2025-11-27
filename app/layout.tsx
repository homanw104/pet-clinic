"use client";

import axios from "@/lib/utils/axios";
import React from "react";
import { Noto_Sans, Noto_Sans_Display, Noto_Sans_SC } from "next/font/google";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CssBaseline } from "@mui/material";
import { SWRConfig } from "swr";
import { store } from "@/lib/store/store";
import CustomThemeProvider from "@/lib/components/app/CustomThemeProvider";
import UserInitAuth from "@/lib/components/app/UserInitAuth";
import "@/lib/styles/globals.css";

const noto_sans = Noto_Sans({ weight: [ "300", "400", "500" ] });
const noto_sans_display = Noto_Sans_Display({ weight: [ "300", "400", "500" ] });
const noto_sans_sc = Noto_Sans_SC({ weight: [ "300", "400", "500" ] });

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
};

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${noto_sans.className} ${noto_sans_display.className} ${noto_sans_sc.className}`}>
      <head>
        <title>Pet Clinic</title>
      </head>
      <body>
        <Provider store={store}>
          <SWRConfig value={swrConfig}>
            <UserInitAuth>
              <CustomThemeProvider>
                <CssBaseline enableColorScheme />
                {children}
                <SpeedInsights/>
                <Analytics />
              </CustomThemeProvider>
            </UserInitAuth>
          </SWRConfig>
        </Provider>
      </body>
    </html>
  );
}
