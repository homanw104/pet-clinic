import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import AvatarButton from "@/components/avatar_button";
import TypographyButton from "@/components/typography_button";
import AppGridLayout from "@/components/layout/app_grid_layout";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import receptionistIcon from "@/public/receptionist.png";
import technicianIcon from "@/public/technician.png";
import veterinarianIcon from "@/public/veterinarian.png";

type PageProps = {
  overlay?: React.ReactNode;
};

export default function Home({ overlay }: PageProps) {
  const route = useRouter();

  const handleOnClick = (href: string) => {
    route.push(href).then();
  }

  return (
    <AppGridLayout overlay={overlay}>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" style={{
          marginTop: "4rem"
        }}>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="h1">Pet Clinic Online</Typography>
            <TypographyButton variant="h3" onClick={() => handleOnClick("/login")}>
              登录 <span className="material-symbols" style={{
                position: "relative",
                top: "0.15em"
              }}>{"\u{e5d9}"}</span>
            </TypographyButton>
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="h3">宠物医院在线导览</Typography>
            <Typography variant="h4">
              <span className="material-symbols" style={{
                position: "relative",
                top: "0.2em"
              }}>{"\u{f1e5}"}</span> 点击职位/科室开始导览
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" style={{
          marginTop: "4rem", marginBottom: "4rem"
        }}>
          <Paper>
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" margin="1rem">
              <InfoOutlinedIcon />
              <Typography variant="body1">
                在下方选择职位或在右侧选择科室以开始导览。
              </Typography>
            </Stack>
          </Paper>
          <AvatarButton src={receptionistIcon} alt="前台" name="receptionist" onClick={() => {
            handleOnClick("/receptionist")
          }}>
            前台
          </AvatarButton>
          <AvatarButton src={technicianIcon} alt="医助" name="technician" onClick={() => {
            handleOnClick("/technician")
          }}>
            医助
          </AvatarButton>
          <AvatarButton src={veterinarianIcon} alt="兽医" name="veterinarian" onClick={() => {
            handleOnClick("/veterinarian")
          }}>
            兽医
          </AvatarButton>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" size="large" onClick={() => handleOnClick("/learn")} style={{
              width: "100%"
            }}>病例库</Button>
            <Button variant="contained" size="large" onClick={() => handleOnClick("/quiz")} style={{
              width: "100%"
            }}>在线测试</Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={9} position="relative">
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" style={{
          marginTop: "4rem",
          position: "absolute",
          top: "0", bottom: "0",
          left: "2rem", right: "0"
        }}>
          <Image
            src="/floor-plan.png"
            alt="Pet clinic floor plan"
            fill={true}
            style={{ objectFit: "contain", objectPosition: "top" }}
          />
        </Stack>
      </Grid>
    </AppGridLayout>
  )
}
