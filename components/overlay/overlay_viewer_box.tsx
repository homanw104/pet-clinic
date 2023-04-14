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
    <>
      <Box sx={{
        overflow: "hidden",
        padding: "0.5rem",
        height: "100%",
        borderRadius: "0.25rem",
        zIndex: 90,
      }}>
        <PhotoSphere src={src} markers={markers} />
      </Box>
      <Box sx={{
        position: "absolute",
        top: "1.25rem",
        right: "1.25rem",
        zIndex: 95,
      }}>
        <IconButton aria-label="close" onClick={() => handleOnClick("/")}>
          <CloseIcon />
        </IconButton>
      </Box>
    </>
  )
}
