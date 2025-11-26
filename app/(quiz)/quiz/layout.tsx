import React from "react";
import { Box, Container } from "@mui/material";
import LayoutContent from "@/app/(quiz)/quiz/layout-content";
import RandomQuizContextProvider from "@/lib/components/context/RandomQuizContext";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <Box position="relative" flexDirection="column" height="100lvh">
      <Container sx={{ flexGrow: 1 }}>
        <RandomQuizContextProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </RandomQuizContextProvider>
      </Container>
    </Box>
  );
}
