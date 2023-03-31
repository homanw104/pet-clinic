/**
 * 前台职位介绍页面。
 */

import Image from "next/image";
import AppGridLayout from "@/components/layout/app_grid_layout";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";

export default function Receptionist() {
  let job_name = "前台";
  let process_list = ["流程一", "流程二"];

  return (
    <AppGridLayout bgColor="#F4B21E">
      <Grid item sm={3} position="relative" display="flex" direction="column" justifyContent="center">
        <Paper style={{
          position: "absolute",
          top: "2rem", bottom: "2rem",
          left: "0", right: "0",
          borderRadius: "2rem"
        }}>
          <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
            <Typography variant="h3" justifyContent="center">{job_name}</Typography>
            <Stack spacing={2} direction="column" justifyContent="center" alignItems="stretch">
              {Array.from(process_list).map((value, index) => (
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
            <Typography variant="h3">职位学习 - 医助</Typography>
            <Image
              src="/background.jpg"
              alt="dog"
              width={500}
              height={500}
            />
          </Stack>
        </Paper>
      </Grid>
    </AppGridLayout>
  )
}
