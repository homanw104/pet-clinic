/**
 * Main, basic Layout component used for the whole project, wrapping children
 * with a default 12-column Grid in a full-height container.
 *
 * This layout includes the Head component and is used
 * in other lower-level layout components.
 *
 * This layout also supports rendering an overlay
 * on top of the children by passing the overlay prop.
 */

import React from "react";
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";

type OverlayProps = {
  children: React.ReactNode;
}

type LayoutProps = {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  bgColor?: string;
  bgImage?: string;
};

function OverlayBox({ children }: OverlayProps) {
  return (
    <Box position="absolute" display="flex" flexDirection="column" height="100%" style={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }}>
      <Container maxWidth="lg" style={{ flexGrow: 1, display: "flex" }}>
        <Grid container height="100%">
          {children}
        </Grid>
      </Container>
    </Box>
  )
}

export default function AppGridLayout({ children, overlay, bgColor, bgImage }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Pet Clinic Online</title>
        <meta name="description" content="Pet clinic online learning platform."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Box position="relative" display="flex" flexDirection="column" height="100%" style={{
        backgroundColor: bgColor ? bgColor : undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Container maxWidth="lg" style={{ flexGrow: 1, display: "flex" }}>
          <Grid container height="100%">
            {children}
          </Grid>
        </Container>
        {overlay !== undefined && <OverlayBox>{overlay}</OverlayBox>}
      </Box>
    </>
  )
}
