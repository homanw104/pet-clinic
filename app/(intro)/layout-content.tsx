'use client';

import React, { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Box, Grid, Stack, useTheme } from "@mui/material";
import receptionistIcon from "@/public/avatar/receptionist.png";
import technicianIcon from "@/public/avatar/technician.png";
import veterinarianIcon from "@/public/avatar/veterinarian.png";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import Footer from "@/components/footer/Footer";
import InfoCard from "@/components/atomic/InfoCard";
import AvatarButton from "@/components/button/AvatarButton";
import NavButton from "@/components/button/NavButton";
import ErrorDialog from "@/components/atomic/ErrorDialog";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { mountOverlay } from "@/lib/store/overlaySlice";
import { resetError } from "@/lib/store/errorSlice";

// Leaflet MapContainer doesn't support Server Side Rendering
const MapViewer = dynamic(() => import("@/components/atomic/MapViewer"), {
  ssr: false,
});

export default function LayoutContent() {
  const theme = useTheme();
  const router = useRouter();
  const mapBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const isError = useAppSelector(state => state.error.isError);
  const errorMsg = useAppSelector(state => state.error.errorMsg);

  const handleOnClick = (href: string) => {
    // Toggle overlay visibility when navigating to job pages
    if (href.startsWith("/job")) dispatch(mountOverlay());

    // Go to the target page afterward
    router.push(href);
  };

  return (
    <Grid container spacing="2rem">
      <ErrorDialog open={isError} onClose={() => dispatch(resetError())} message={errorMsg} />
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem",
          marginBottom: "2rem"
        }}>
          <Header mapBoxRef={mapBoxRef} />
          <Suspense fallback={null}>
            <Subheader variant="home" />
          </Suspense>
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
