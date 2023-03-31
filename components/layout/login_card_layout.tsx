/**
 * Layout used in login.tsx and sign-up.tsx.
 */
import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import AppGridLayout from "@/components/layout/app_grid_layout";

type LayoutProps = {
  children: React.ReactNode;
};

export default function LoginCardLayout({ children }: LayoutProps) {
  return (
    <AppGridLayout bgColor="#F4B21E">
      <Grid item xs={6} position="relative">
        <Image
          src="/background.jpg"
          alt=""
          fill={true}
          style={{ objectFit: "contain", objectPosition: "bottom" }}
        />
      </Grid>
      <Grid item xs={1} className="blank" />
      <Grid item xs={5} display="flex" direction="column" justifyContent="center">
        <Paper style={{ borderRadius: "2rem" }}>
          <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
            {children}
          </Stack>
        </Paper>
      </Grid>
    </AppGridLayout>
  )
}
