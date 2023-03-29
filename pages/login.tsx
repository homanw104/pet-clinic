import Head from "next/head";
import { Grid } from "@mui/material";
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
      <GridLayout>
        <Grid item></Grid>
      </GridLayout>
    </>
  )
}
