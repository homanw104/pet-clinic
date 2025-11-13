/**
 * Layout used in login.tsx and sign-up.tsx.
 */

import React from "react";
import { Grid, Paper, Stack } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LoginPageLayout({ children }: LayoutProps) {
  return (
    <>
      <Grid item xs={7} className="blank" />
      <Grid item xs={5} height="100vh">
        <Stack display="flex" direction="column" justifyContent="center" height="100%">
          <Paper style={{ borderRadius: "12px" }}>
            <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
              {children}
            </Stack>
          </Paper>
        </Stack>
      </Grid>
    </>
  )
}
