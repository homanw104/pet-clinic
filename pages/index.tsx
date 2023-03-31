import Image from "next/image"
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import AppGridLayout from "@/components/layout/app_grid_layout";

export default function Home() {
  return (
    <AppGridLayout>
      <Grid item xs={12}>
        <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" height="100%">
          <Typography variant="h1">宠物医院在线导览</Typography>
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
          <Button variant="contained" href="/receptionist">前台</Button>
          <Button variant="contained" href="/technician">医助</Button>
          <Button variant="contained" href="/veterinarian">兽医</Button>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" size="large" href="/learn">病例库</Button>
            <Button variant="contained" size="large" href="/quiz">在线测试</Button>
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
