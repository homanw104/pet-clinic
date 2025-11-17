import React from "react";
import { Box, Container, Grid, Paper, Stack } from "@mui/material";

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <Box sx={{
      backgroundColor: "#F4B21D",
      backgroundImage: "url('background-full.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "bottom left"
    }}>
      <Container sx={{ flexGrow: 1 }}>
        <Grid container spacing="2rem">
          <Grid item xs={0} sm={1} md={6} lg={6} />
          <Grid item xs={12} sm={10} md={5} lg={5}>
            <Stack display="flex" direction="column" justifyContent="center" height="100vh">
              <Paper sx={{ borderRadius: "1rem" }}>
                {children}
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Container>
    </Box>
  )
}
