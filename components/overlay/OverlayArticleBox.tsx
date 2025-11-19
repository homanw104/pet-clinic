'use client';

import React from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { useAppDispatch } from "@/lib/utils/hook";
import { unmountOverlay } from "@/lib/store/overlaySlice";

interface ComponentProps {
  children: React.ReactNode;
}

export default function OverlayArticleBox({ children }: ComponentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOnClick = (href: string) => {
    dispatch(unmountOverlay());
    setTimeout(() => router.push(href), 300);
  };

  return (
    <Box sx={{
      position: "relative",
      height: "100%",
      width: "100%",
    }}>
      <Box sx={{
        paddingTop: { xs: "2rem", sm: "2.5rem" },
        paddingBottom: { xs: "2rem", sm: "2.5rem" },
        paddingLeft: { xs: "1.5rem", sm: "2.5rem" },
        paddingRight: { xs: "1.5rem", sm: "3.5rem" },
        overflow: "scroll",
        height: "100%",
        zIndex: 295,
      }}>
        {children}
      </Box>
      <Box sx={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        zIndex: 300,
      }}>
        <IconButton
          aria-label="close" onClick={() => handleOnClick("/")}
          sx={{ display: { xs: "none", sm: "block" }}}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
