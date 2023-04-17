import React from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, useTheme } from "@mui/material";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import PhotoSphere from "@/components/atomic/photo_sphere";
import { hexToRGBA } from "@/utils/color_util";

interface BoxProps {
  src: string;
  markers?: MarkerConfig[];
}

export default function OverlayViewerBox({ src, markers }: BoxProps) {
  const theme = useTheme();
  const route = useRouter();

  const handleOnClick = (href: string) => {
    route.push(href).then();
  };

  return (
    <Box sx={{
      position: "absolute",
      height: "100%",
      width: "100%",
      zIndex: 90,   // Lower than OverlayArticleBox
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
