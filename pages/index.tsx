import Head from "next/head"
import Image from "next/image"
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pet Clinic Online</title>
        <meta name="description" content="Pet clinic online learning platform."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Grid container spacing={4} >
        <Grid item xs={10}>
          <Typography variant='h1'>Pet Clinic Online</Typography>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Button>Login</Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <Typography variant='body1'>
              选择下方的三个职位之一或者选择右边的科室以开始导览。
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
    </>
  )
}
