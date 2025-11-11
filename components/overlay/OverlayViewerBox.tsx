'use client';

import React from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, useTheme } from "@mui/material";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import PhotoSphere from "@/components/atomic/PhotoSphere";
import { hexToRGBA } from "@/utils/color_util";
import { useAppDispatch } from "@/utils/hook_util";
import { unmountOverlay } from "@/store/overlaySlice";

export default function OverlayViewerBox({ src, markers }: {
  src: string;
  markers: MarkerConfig[] | undefined;
}) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOnClick = (href: string) => {
    // Set overlay isMount state to false
    dispatch(unmountOverlay());

    // Return home after animations are finished
    setTimeout(() => router.push(href), 300);
  };

  return (
    <Box sx={{
      position: "absolute",
      height: "100%",
      width: "100%",
    }}>
      <Box sx={{
        overflow: "hidden",
        padding: "0.5rem",
        height: "100%",
        borderRadius: "0.25rem",
        zIndex: 295,
      }}>
        <PhotoSphere src={src} markers={markers} />
      </Box>
      <Box sx={{
        position: "absolute",
        top: "1.25rem",
        right: "1.25rem",
        zIndex: 300,
      }}>
        <IconButton aria-label="close" onClick={() => handleOnClick("/")} sx={{
          backgroundColor: hexToRGBA(theme.palette.background.paper, 0.4),
          backdropFilter: "blur(10px)",
        }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
