"use client";

import React from "react";
import { Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ErrorDialog from "@/lib/components/atomic/ErrorDialog";
import { resetError } from "@/lib/store/errorSlice";
import TitleButton from "@/lib/components/home/TitleButton";
import LoginButton from "@/lib/components/home/LoginButton";
import TypographyButton from "@/lib/components/button/TypographyButton";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import Footer from "@/lib/components/home/Footer";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { useRouter } from "next/navigation";
import CaseList from "@/lib/components/case/CaseList";

export default function LayoutContent({ children }: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const router = useRouter();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const isError = useAppSelector(state => state.error.isError);
  const errorMsg = useAppSelector(state => state.error.errorMsg);

  return (
    <Grid container spacing="2rem">
      <ErrorDialog open={isError} onClose={() => dispatch(resetError())} message={errorMsg} />
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem",
          marginBottom: { xs: "0rem", sm: "2rem" }
        }}>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <TitleButton />
            <LoginButton variant={isSmScreen ? "h4" : "h3"} sx={{ display: { xs: "none", sm: "block" }}} />
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography className="unselectable" variant={isXsScreen ? "h5" : isSmScreen ? "h4" : "h3"}>
              病例数据库
            </Typography>
            <Stack spacing={isSmScreen ? 2 : 4} direction="row" justifyContent="flex-end" alignItems="baseline">
              <TypographyButton variant={isSmScreen ? "h5" : "h4"}
                                onClick={() => router.push("/")} sx={{display: { xs: "none", sm: "block" }}}>
                <WestOutlinedIcon sx={{
                  fontSize: {
                    sm: theme.typography.h5.fontSize,
                    md: theme.typography.h4.fontSize
                  },
                  position: "relative",
                  top: "0.2em",
                }} /> 返回导览
              </TypographyButton>
            </Stack>
            <LoginButton variant="h5" sx={{ display: { xs: "block", sm: "none" }}} />
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="baseline"
                 sx={{ display: { xs: "inline-flex", sm: "none" }}}>
            <TypographyButton variant="h5" noWrap={true} onClick={ () => router.push("/") }>
              <WestOutlinedIcon sx={{ fontSize: theme.typography.h5.fontSize, position: "relative", top: "0.2em" }} /> 返回导览
            </TypographyButton>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={5} md={4} lg={3}>
        <CaseList />
      </Grid>

      <Grid item xs={12} sm={7} md={8} lg={9}>
        {children}
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
