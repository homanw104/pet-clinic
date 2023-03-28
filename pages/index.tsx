import Head from "next/head"
import Image from "next/image"
import { Button, Grid, Stack, Typography } from "@mui/material";
import GridLayout from "@/components/grid_layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pet Clinic Online</title>
        <meta name="description" content="Pet clinic online learning platform."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <GridLayout>
        <Grid container height="100%">
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" height="100%">
              <Typography variant='h1'>Pet Clinic Online</Typography>
              <Button>Login</Button>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2}>
              <Typography variant='body1'>
                在下方选择一个职位或者选择右边的科室以开始导览。
              </Typography>
              <Button>前台</Button>
              <Button>医助</Button>
              <Button>兽医</Button>
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button>病例库</Button>
                <Button>在线测试</Button>
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
        </Grid>
      </GridLayout>
    </>
  )
}
