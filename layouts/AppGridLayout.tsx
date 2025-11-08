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
import { Box, Container, Grid, useTheme } from "@mui/material";
import { hexToRGBA } from "@/utils/color_util";
import { useAppSelector } from "@/utils/hook_util";

interface OverlayProps {
  children: React.ReactNode;
}

interface LayoutProps {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  bgColor?: string;
  bgImage?: string;
}

function OverlayBox({ children }: OverlayProps) {
  const theme = useTheme();
  const isMount = useAppSelector((state) => state.overlay.isMount);

  return (
    <Box position="absolute" display="flex" flexDirection="column" height="100%" sx={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,

      // Fade in blur used when opening overlay
      "@keyframes fadeInBlur": {
        "from": {
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0)",
        },
        "to": {
          backgroundColor: hexToRGBA(theme.palette.surface.onMain, 0.5),
          backdropFilter: "blur(10px)",
        },
      },

      // Fade out blur used when closing overlay
      "@keyframes fadeOutBlur": {
        "from": {
          backgroundColor: hexToRGBA(theme.palette.surface.onMain, 0.5),
          backdropFilter: "blur(10px)",
        },
        "to": {
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0)",
        },
      },

      animation: isMount ?
        "fadeInBlur 0.3s ease-out forwards" :
        "fadeOutBlur 0.3s ease-in forwards",
    }}>
      <Container sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Grid container minHeight="500px" maxHeight="900px" height="100%">
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
      </Head>

      <Box position="relative" display="flex" flexDirection="column" height="100%" sx={{
        backgroundColor: bgColor ? bgColor : undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <Container sx={{ flexGrow: 1 }}>
          <Grid container>
            {children}
          </Grid>
        </Container>
      </Box>

      {/* Render OverlayBox when overlay is not empty */}
      {overlay && <OverlayBox>{overlay}</OverlayBox>}
    </>
  )
}
