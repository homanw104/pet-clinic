import React from "react";
import { Box, Container } from "@mui/material";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <Box position="relative" flexDirection="column" height="100lvh">
      <Container sx={{ flexGrow: 1 }}>
        {children}
      </Container>
    </Box>
  );
}
