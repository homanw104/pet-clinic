/**
 * Universal, basic Layout component used for the whole project,
 * wrapping children with a default 12-column Grid in a full-height container.
 */

import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
  bgColor?: string;
  bgImage?: string;
};

export default function AppGridLayout({ children, bgColor, bgImage }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Pet Clinic Online</title>
        <meta name="description" content="Pet clinic online learning platform."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Box display="flex" flexDirection="column" height="100%" style={{
        backgroundColor: bgColor ? bgColor : undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Container maxWidth="lg" style={{ flexGrow: 1, display: 'flex' }}>
          <Grid container height="100%">
            {children}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
