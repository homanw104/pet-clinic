'use client';

import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export default function TourSidebarHeaderBox({ chineseTitle, englishID }: {
  chineseTitle: string;
  englishID: string;
}) {
  const theme = useTheme();
  const router = useRouter();

  const handleOnClick = (href: string) => {
    router.push(href);
  };

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
      <Stack direction="column" padding="2rem" onClick={() => handleOnClick(`/tour/${englishID}`)} sx={{
        cursor: "pointer"
      }}>
        <Typography variant="h4" align="left" noWrap={true} lineHeight={1}>
          {chineseTitle}
        </Typography>
        <Typography variant="h6" align="left" noWrap={true} lineHeight={1} style={{
          textTransform: "none", fontVariant: "small-caps"
        }}>
          {englishID.replace("-", " ")}
        </Typography>
      </Stack>
    </Box>
  )
}
