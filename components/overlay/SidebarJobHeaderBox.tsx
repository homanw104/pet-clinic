'use client';

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Box, Stack, Typography, useTheme } from "@mui/material";

interface BoxProps {
  src: StaticImageData;   // Image data
  alt: string;            // Image description
  title: string;          // Sidebar title
  subtitle: string;       // Sidebar title in English
}

export default function SidebarJobHeaderBox({ src, alt, title, subtitle }: BoxProps) {
  const theme = useTheme();

  return (
    <Box sx={{
      backgroundColor: theme.palette.surface[3],
      color: theme.palette.surface.onMain,
      position: "relative",
      overflow: "hidden",
      height: "152px",
      minHeight: "152px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    }}>
      <Stack direction="column" padding="2rem">
        <Typography variant="h4" align="left" noWrap={true} lineHeight={1}>
          {title}
        </Typography>
        <Typography variant="h6" align="left" noWrap={true} lineHeight={1} style={{
          textTransform: "none", fontVariant: "small-caps"
        }}>
          {subtitle.replace("-", " ")}
        </Typography>
      </Stack>
      <Image src={src} alt={alt} width={160} height={160} className="unselectable" style={{
        position: "absolute",
        bottom: "-8px",
        right: "-8px",
        opacity: "30%"
      }}/>
    </Box>
  )
}
