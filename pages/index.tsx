import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import AppGridLayout from "@/components/layout/app_grid_layout";

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
        <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" height="100%">
          <Typography variant="h2">宠物医院在线导览</Typography>
          <Button href="/login">登录</Button>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
          <Paper>
            <Typography variant="body1">
              在下方选择一个职位或者选择右边的科室以开始导览。
            </Typography>
          </Paper>
          <Button variant="contained" onClick={() => handleOnClick("/receptionist")}>前台</Button>
          <Button variant="contained" onClick={() => handleOnClick("/technician")}>医助</Button>
          <Button variant="contained" onClick={() => handleOnClick("/veterinarian")}>兽医</Button>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" size="large" onClick={() => handleOnClick("/learn")}>病例库</Button>
            <Button variant="contained" size="large" onClick={() => handleOnClick("/quiz")}>在线测试</Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Image
          src="https://www.midmark.com/images/default-source/animal-health/angled-floor-plan0ca4a2f0f96142d9b07be7fe8c560850.png"
          alt="Pet Clinic Online"
          width={640}
          height={386}
        />
      </Grid>
    </AppGridLayout>
  )
}
