'use client';

import React, { useEffect } from "react";
import { Box, Container, Grid, useTheme } from "@mui/material";
import { hexToRGBA } from "@/utils/color_util";
import { useAppDispatch, useAppSelector } from "@/utils/hook_util";
import { mountOverlay } from "@/store/overlaySlice";

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMount = useAppSelector((state) => state.overlay.isMount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(mountOverlay());
  }, [dispatch]);

  return (
    <Grid item sm={12}>
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
        // animation: "fadeInBlur 0.3s ease-out forwards"
      }}>
        <Container sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Grid container minHeight="500px" maxHeight="800px" height="100%">
            {children}
          </Grid>
        </Container>
      </Box>
    </Grid>
  )
}
