/**
 * Layout used in login.tsx and sign-up.tsx.
 */

import React from "react";
import { Grid, Paper, Stack } from "@mui/material";
import AppGridLayout from "@/components/layout/app_grid_layout";

type LayoutProps = {
  children: React.ReactNode;
};

export default function LoginPageLayout({ children }: LayoutProps) {
  return (
    <AppGridLayout bgImage="background-full.jpg">
      <Grid item xs={7} className="blank" />
      <Grid item xs={5} display="flex" direction="column" justifyContent="center" height="100vh">
        <Paper style={{ borderRadius: "12px" }}>
          <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
            {children}
          </Stack>
        </Paper>
      </Grid>
    </AppGridLayout>
  )
}
