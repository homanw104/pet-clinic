/**
 * Universal Layout component used for the whole project,
 * wrapping children with a default 12-column Grid in a full-height container.
 */

import { Box, Container, Grid } from "@mui/material";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function GridLayout({ children }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Container maxWidth="lg" style={{ flexGrow: 1, display: 'flex' }}>
        <Grid container height="100%">
          {children}
        </Grid>
      </Container>
    </Box>
  )
}
