import Head from "next/head";
import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import GridLayout from "@/components/grid_layout";

export default function SignUp() {
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
          <Paper sx={{ padding: '2.5rem' }}>
            <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch">
              <Typography variant="h3">注册</Typography>
              <TextField id="outlined-basic" label="用户名" variant="outlined" />
              <TextField id="outlined-basic" label="创建密码" variant="outlined" />
              <TextField id="outlined-basic" label="重复密码" variant="outlined" />
              <Stack spacing={4} direction="row" justifyContent="space-between" style={{ paddingTop: "5rem" }}>
                <Button variant="outlined" href="/login">返回</Button>
                <Button variant="contained" href="/">注册</Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </GridLayout>
    </>
  )
}
