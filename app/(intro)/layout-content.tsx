'use client';

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import receptionistIcon from "@/public/avatar/receptionist.png";
import technicianIcon from "@/public/avatar/technician.png";
import veterinarianIcon from "@/public/avatar/veterinarian.png";
import LoginButton from "@/components/header/LoginButton";
import Footer from "@/components/footer/Footer";
import InfoCard from "@/components/atomic/InfoCard";
import AvatarButton from "@/components/button/AvatarButton";
import NavButton from "@/components/button/NavButton";
import ErrorDialog from "@/components/atomic/ErrorDialog";
import { darkTheme, lightTheme } from "@/lib/styles/globals-mui";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { mountOverlay } from "@/lib/store/overlaySlice";
import { resetError } from "@/lib/store/errorSlice";
import { toggleTheme } from "@/lib/store/themeSlice";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import { useAccessibleButton } from "@/lib/utils/accessibility";

// Leaflet MapContainer doesn't support Server Side Rendering
const MapViewer = dynamic(() => import("@/components/atomic/MapViewer"), {
  ssr: false,
});

export default function LayoutContent() {
  const theme = useTheme();
  const router = useRouter();
  const mapBoxRef = useRef<HTMLDivElement>(null);
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.theme.theme);
  const isError = useAppSelector(state => state.error.isError);
  const errorMsg = useAppSelector(state => state.error.errorMsg);

  const handleToggleTheme = () => {
    // Manually toggle theme for <MapViewer />
    if (mapBoxRef &&
      mapBoxRef.current &&
      mapBoxRef.current.children[0] &&
      mapBoxRef.current.children[0] instanceof HTMLDivElement &&
      mapBoxRef.current.children[0].className.includes("leaflet-container")
    ) {
      const mapViewerRef = mapBoxRef.current.children[0];
      if (themeState === "lightTheme") {
        mapViewerRef.style.backgroundColor = darkTheme.palette.surface[1];
      } else {
        mapViewerRef.style.backgroundColor = lightTheme.palette.surface[1];
      }
    }

    // Toggle global theme
    dispatch(toggleTheme());
  };

  const handleOnClick = (href: string) => {
    // Toggle overlay visibility when navigating to job pages
    if (href.startsWith("/job")) dispatch(mountOverlay());

    // Go to the target page afterward
    router.push(href);
  };

  const { isButtonActive, ...a11yProps } = useAccessibleButton(handleToggleTheme);

  return (
    <Grid container spacing="2rem">
      <ErrorDialog open={isError} onClose={() => dispatch(resetError())} message={errorMsg} />
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem",
          marginBottom: "2rem"
        }}>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography
              className="unselectable" variant={isXsScreen ? "h3" : isSmScreen ? "h2" : "h1"} {...a11yProps}
              onClick={handleToggleTheme} sx={{ cursor: "pointer" }}
            >
              Pet Clinic Online
            </Typography>
            <LoginButton variant={isSmScreen ? "h4" : "h3"} sx={{ display: { xs: "none", sm: "block" }}} />
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography className="unselectable" variant={isXsScreen ? "h5" : isSmScreen ? "h4" : "h3"}>
              宠物医院在线导览
            </Typography>
            <Typography
              variant={isSmScreen ? "h5" : "h4"}
              noWrap={true} className="unselectable"
              sx={{display: { xs: "none", sm: "block" }}}
            >
              <SouthWestIcon sx={{
                fontSize: {
                  sm: theme.typography.h5.fontSize,
                  md: theme.typography.h4.fontSize
                },
                position: "relative",
                top: "0.2em",
              }} /> 点击职位/科室以开始
            </Typography>
            <LoginButton variant="h5" sx={{ display: { xs: "block", sm: "none" }}} />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={5} md={4} lg={3}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
          <InfoCard>在下方选择职位或科室以开始导览。</InfoCard>
          <AvatarButton src={receptionistIcon} alt="前台" name="receptionist" onClick={() => {
            handleOnClick("/job/receptionist/intro");
          }}>前台</AvatarButton>
          <AvatarButton src={technicianIcon} alt="医助" name="technician" onClick={() => {
            handleOnClick("/job/technician/intro");
          }}>医助</AvatarButton>
          <AvatarButton src={veterinarianIcon} alt="兽医" name="veterinarian" onClick={() => {
            handleOnClick("/job/veterinarian/intro");
          }}>兽医</AvatarButton>
          <Stack spacing={2} direction="row" justifyContent="center">
            <NavButton name="database" onClick={() => handleOnClick("/learn/case")} style={{
              width: "100%"
            }}>病例库</NavButton>
            <NavButton name="quiz" onClick={() => handleOnClick("/quiz")} style={{
              width: "100%"
            }}>在线测试</NavButton>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={7} md={8} lg={9}>
        <Box sx={{
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.onMain,
          borderRadius: "1rem",
          height: "36rem",
        }}>
          <Box ref={mapBoxRef} sx={{
            padding: "0.5rem",
            height: "100%"
          }}>
            <MapViewer />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}
