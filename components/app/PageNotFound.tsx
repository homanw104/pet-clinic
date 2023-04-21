import React from "react";
import { useRouter } from "next/router";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import TypographyButton from "@/components/button/TypographyButton";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

export default function PageNotFound() {
  const theme = useTheme();
  const router = useRouter();

  const handleOnClick = (href: string) => {
    router.push(href).then();
  };

  return (
    <Grid item xs={12} height="100vh">
      <Stack direction="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4">页面未找到</Typography>
        <Typography variant="h6">404 - Page Not found</Typography>
        <Box sx={{ marginTop: "10rem" }}>
          <TypographyButton variant="h5" onClick={() => handleOnClick("/")}>
            <WestOutlinedIcon sx={{
              fontSize: theme.typography.h5.fontSize,
              position: "relative",
              top: "0.2em",
            }} /> 返回主页
          </TypographyButton>
        </Box>
      </Stack>
    </Grid>
  )
}
