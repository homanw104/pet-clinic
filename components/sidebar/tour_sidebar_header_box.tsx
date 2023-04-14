import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

interface BoxProps {
  title: string;          // Sidebar title
  subtitle: string;       // Sidebar title in English
}

export default function TourSidebarHeaderBox({ title, subtitle }: BoxProps) {
  const theme = useTheme();

  return (
    <Box sx={{
      backgroundColor: theme.palette.surface[3],
      color: theme.palette.surface.onMain,
      position: "relative",
      overflow: "hidden",
      height: "152px",
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
          {subtitle}
        </Typography>
      </Stack>
    </Box>
  )
}
