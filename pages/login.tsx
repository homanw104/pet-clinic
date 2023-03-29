import Head from "next/head";
import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import GridLayout from "@/components/grid_layout";

export default function Login() {

  return (
    <>
      <Head>
        <title>Pet Clinic Online</title>
        <meta name="description" content="Pet clinic online learning platform."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <GridLayout bgImage="">
        <Grid item xs={7} className="blank"></Grid>
        <Grid item xs={5} display="flex" direction="column" justifyContent="center">
          <Paper style={{ padding: "2.5rem" }}>
            <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch">
              <Typography variant="h3">登录</Typography>
              <TextField id="outlined-basic" label="用户名" variant="outlined" />
              <TextField id="outlined-basic" label="密码" variant="outlined" />
              <Stack spacing={4} direction="row" justifyContent="space-between" style={{ paddingTop: "5rem" }}>
                <Button>忘记密码？</Button>
                <Stack spacing={2} direction="row" justifyContent="space-between">
                  <Button variant="outlined" href="/sign-up">注册</Button>
                  <Button variant="contained" href="/" disableElevation>登录</Button>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </GridLayout>
    </>
  )
}
