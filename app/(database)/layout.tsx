import React from "react";
import { Box, Container } from "@mui/material";
import LayoutContent from "@/app/(database)/layout-content";

export default function layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <Box position="relative" flexDirection="column" height="100lvh">
      <Container sx={{ flexGrow: 1 }}>
        <LayoutContent>
          {children}
        </LayoutContent>
      </Container>
    </Box>
  );
}
