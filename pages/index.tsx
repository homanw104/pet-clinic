import React, { ReactElement, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Box, Grid, Paper, Stack } from "@mui/material";

import receptionistIcon from "@/public/avatar/receptionist.png";
import technicianIcon from "@/public/avatar/technician.png";
import veterinarianIcon from "@/public/avatar/veterinarian.png";
import InfoCard from "@/components/atomic/InfoCard";
import AvatarButton from "@/components/button/AvatarButton";
import NormalButton from "@/components/button/NormalButton";
import AppGridLayout from "@/layouts/AppGridLayout";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import { mountOverlay } from "@/store/overlaySlice";
import { useAppDispatch } from "@/utils/hook_util";

// Leaflet MapContainer doesn't support Server Side Rendering
const MapViewer = dynamic(() => import("@/components/atomic/MapViewer"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const mapBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleOnClick = (href: string) => {
    router.push(href).then();
  };

  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header mapBoxRef={mapBoxRef} />
          <Subheader variant="home" />
        </Stack>
      </Grid>

      <Grid item xs={3}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem", marginBottom: "4rem"
        }}>
          <InfoCard>在下方选择职位或在右侧选择科室以开始导览。</InfoCard>
          <AvatarButton src={receptionistIcon} alt="前台" name="receptionist" onClick={() => {
            handleOnClick("/job/receptionist/intro");
            dispatch(mountOverlay());
          }}>前台</AvatarButton>
          <AvatarButton src={technicianIcon} alt="医助" name="technician" onClick={() => {
            handleOnClick("/job/technician/intro");
            dispatch(mountOverlay());
          }}>医助</AvatarButton>
          <AvatarButton src={veterinarianIcon} alt="兽医" name="veterinarian" onClick={() => {
            handleOnClick("/job/veterinarian/intro");
            dispatch(mountOverlay());
          }}>兽医</AvatarButton>
          <Stack spacing={2} direction="row" justifyContent="center">
            <NormalButton name="database" onClick={() => handleOnClick("/learn/case")} style={{
              width: "100%"
            }}>病例库</NormalButton>
            <NormalButton name="quiz" onClick={() => handleOnClick("/quiz")} style={{
              width: "100%"
            }}>在线测试</NormalButton>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={9} position="relative">
        <Paper elevation={0} sx={{
          backgroundColor: "theme.palette.surface.main",
          color: "theme.palette.surface.onMain",
          marginTop: "4rem",
          marginBottom: "4rem",
          position: "absolute",
          top: "0", bottom: "0",
          left: "2rem", right: "0",
          overflow: "hidden",
          height: "600px",
        }}>
          <Box ref={mapBoxRef} sx={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            overflow: "hidden",
            height: "100%"
          }}>
            <MapViewer />
          </Box>
        </Paper>
      </Grid>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout>
      {page}
    </AppGridLayout>
  )
}
