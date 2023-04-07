import React from "react";
import { CardProps, Paper, Stack, Typography, useTheme } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function InfoCard({ children, ...props }: CardProps) {
  const theme = useTheme();

  return (
    <Paper {...props} elevation={0} sx={{
      backgroundColor: theme.palette.secondary.container,
      color: theme.palette.secondary.onContainer,
      overflow: "hidden",
      padding: 0,
      height: "108px",
    }}>
      <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" padding="1rem" height="100%">
        <InfoOutlinedIcon />
        <Typography variant="body1">
          {children}
        </Typography>
      </Stack>
    </Paper>
  )
}
