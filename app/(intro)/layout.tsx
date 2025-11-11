/*
 * The layout of the main page is rendered client side to retain states,
 * while most of the layouts in this app are rendered server side.
 */

'use client';

import React, { useEffect } from "react";
import { Box, Container, Grid, useTheme } from "@mui/material";
import { hexToRGBA } from "@/utils/color_util";
import { useAppSelector } from "@/utils/hook_util";
import LayoutContent from "@/app/(intro)/layout-content";

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  const theme = useTheme();
  const isMount = useAppSelector((state) => state.overlay.isMount);
  const [isVisible, setIsVisible] = React.useState(isMount);

  // Delay unmounting to allow fade-out animation to complete
  useEffect(() => {
    if (isMount) {
      setIsVisible(true);
    } else {
      const timeoutId = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isMount]);

  return (
    <>
      {/* The content of the main page is stored in the layout so that */}
      {/* it doesn't unmount when navigating to overlay pages. */}
      <Box position="relative" flexDirection="column" height="100%">
        <LayoutContent />
      </Box>

      {/* Mount overlay when isVisible == true */}
      <Box position="absolute" display={isVisible ? "flex" : "none"} flexDirection="column" height="100%" sx={{
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
          "fadeOutBlur 0.3s ease-in forwards"
      }}>
        <Container sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Grid container minHeight="500px" maxHeight="800px" height="100%">
            {children}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
