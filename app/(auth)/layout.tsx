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
      backgroundPosition: "center"
    }}>
      <Container sx={{ flexGrow: 1 }}>
        <Grid container spacing="2rem">
          <Grid item xs={7} />
          <Grid item xs={4}>
            <Stack display="flex" direction="column" justifyContent="center" height="100vh">
              <Paper>
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
