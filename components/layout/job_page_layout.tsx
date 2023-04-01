import React from "react";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import Home from "@/pages";

type LayoutProps = {
  children: React.ReactNode;
  jobName: string;
  jobList: string[];
};

function Overlay({ children, jobName, jobList }: LayoutProps) {
  return (
    <>
      <Grid item sm={3} position="relative" display="flex" direction="column" justifyContent="center">
        <Paper style={{
          position: "absolute",
          top: "2rem", bottom: "2rem",
          left: "0", right: "0",
          borderRadius: "2rem"
        }}>
          <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
            <Typography variant="h3" justifyContent="center">{jobName}</Typography>
            <Stack spacing={2} direction="column" justifyContent="center" alignItems="stretch">
              {Array.from(jobList).map((value, index) => (
                <Button variant="contained" key={index}>{value}</Button>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item sm={9} position="relative" display="flex" direction="column" justifyContent="center">
        <Paper style={{
          position: "absolute",
          top: "2rem", bottom: "2rem",
          left: "2rem", right: "0",
          borderRadius: "2rem"
        }}>
          <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem" style={{
            overflowY: "scroll"
          }}>
            {children}
          </Stack>
        </Paper>
      </Grid>
    </>
  )
}

export default function JobPageLayout({ children, jobName, jobList }: LayoutProps) {
  return (
    <Home overlay={
      <Overlay jobName={jobName} jobList={jobList}>{children}</Overlay>
    } />
  )
}
