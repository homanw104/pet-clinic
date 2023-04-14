import React from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import PhotoSphere from "@/components/photo_sphere";

interface BoxProps {
  src: string;
  markers?: MarkerConfig[];
}

export default function OverlayViewerBox({ src, markers }: BoxProps) {
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
        <IconButton aria-label="close" onClick={() => handleOnClick("/")}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
