import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import receptionistIcon from "@/public/avatar/receptionist.png";
import technicianIcon from "@/public/avatar/technician.png";
import veterinarianIcon from "@/public/avatar/veterinarian.png";
import InfoCard from "@/components/info_card";
import TypographyButton from "@/components/button/typography_button";
import AvatarButton from "@/components/button/avatar_button";
import NormalButton from "@/components/button/normal_button";
import AppGridLayout from "@/layouts/app_grid_layout";

// Leaflet MapContainer doesn't support Server Side Rendering
const MapViewer = dynamic(() => import("@/components/map_viewer"), {
  ssr: false,
});

interface PageProps {
  overlay?: React.ReactNode;
}

export default function Home({ overlay }: PageProps) {
  const route = useRouter();

  const handleOnClick = (href: string) => {
    route.push(href).then();
  };

  return (
    <AppGridLayout overlay={overlay}>

      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="h1" noWrap={true} className="unselectable">
              Pet Clinic Online
            </Typography>
            <TypographyButton variant="h3" noWrap={true} className="unselectable" onClick={
              () => handleOnClick("/login")
            }>
              登录 <span className="material-symbols" style={{
                position: "relative",
                top: "0.15em"
              }}>{"\u{e5d9}"}</span>
            </TypographyButton>
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="h3" noWrap={true}>宠物医院在线导览</Typography>
            <Typography variant="h4" noWrap={true}>
              <span className="material-symbols" style={{
                position: "relative",
                top: "0.2em"
              }}>{"\u{f1e5}"}</span> 点击职位/科室开始导览
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={3}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem", marginBottom: "4rem"
        }}>
          <InfoCard>在下方选择职位或在右侧选择科室以开始导览。</InfoCard>
          <AvatarButton src={receptionistIcon} alt="前台" name="receptionist" onClick={() => {
            handleOnClick("/receptionist/intro")
          }}>前台</AvatarButton>
          <AvatarButton src={technicianIcon} alt="医助" name="technician" onClick={() => {
            handleOnClick("/technician/intro")
          }}>医助</AvatarButton>
          <AvatarButton src={veterinarianIcon} alt="兽医" name="veterinarian" onClick={() => {
            handleOnClick("/veterinarian/intro")
          }}>兽医</AvatarButton>
          <Stack spacing={2} direction="row" justifyContent="center">
            <NormalButton name="database" onClick={() => handleOnClick("/learn")} style={{
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
          <Box sx={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            overflow: "hidden",
            height: "100%"
          }}>
            <MapViewer />
          </Box>
        </Paper>
      </Grid>

    </AppGridLayout>
  )
}
