import React from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";

interface BoxProps {
  article: React.ReactNode;
}

export default function OverlayArticleBox({ article }: BoxProps) {
  const route = useRouter();

  const handleOnClick = (href: string) => {
    route.push(href).then();
  };

  return (
    <>
      <Box sx={{
        overflow: "scroll",
        padding: "2.5rem",
        height: "100%",
        zIndex: 80,
      }}>
        {article}
      </Box>
      <Box sx={{
        position: "absolute",
        top: "1.25rem",
        right: "1.25rem",
        zIndex: 85,
      }}>
        <IconButton aria-label="close" onClick={() => handleOnClick("/")}>
          <CloseIcon />
        </IconButton>
      </Box>
    </>
  )
}
