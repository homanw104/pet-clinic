'use client';

import React from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { useAppDispatch } from "@/utils/hook_util";
import { unmountOverlay } from "@/store/overlaySlice";

interface ComponentProps {
  children: React.ReactNode;
}

export default function OverlayArticleBox({ children }: ComponentProps) {
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
      zIndex: 100,  // Higher than OverlayViewerBox
    }}>
      <Box sx={{
        overflow: "scroll",
        padding: "2.5rem",
        height: "100%",
        zIndex: 295,
      }}>
        {children}
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
