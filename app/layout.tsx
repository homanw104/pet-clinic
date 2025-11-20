'use client';

import axios from "@/lib/utils/axios";
import React from "react";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import { CssBaseline } from "@mui/material";
import { SWRConfig } from "swr";
import { store } from "@/lib/store/store";
import CustomThemeProvider from "@/components/app/CustomThemeProvider";
import UserInitAuth from "@/components/app/UserInitAuth";
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

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      {/* Load Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@300;400;500&family=Noto+Sans+SC:wght@300;400;500&family=Noto+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <title>Pet Clinic</title>
    </head>
    <body>
      <Provider store={store}>
        <SWRConfig value={swrConfig}>
          <UserInitAuth>
            <CustomThemeProvider>
              <CssBaseline enableColorScheme />
              {children}
              <Analytics />
            </CustomThemeProvider>
          </UserInitAuth>
        </SWRConfig>
      </Provider>
    </body>
    </html>
  )
}
