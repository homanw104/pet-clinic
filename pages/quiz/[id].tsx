/**
 * 试卷测试页面，根据试卷 [id] 获取试卷信息。
 */

import React, { ReactElement } from "react";
import { Grid, Stack } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import AppGridLayout from "@/layouts/AppGridLayout";

export default function Quiz() {
  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header />
          <Subheader variant="quiz" />
        </Stack>
      </Grid>

      <Grid item xs={3}>
        {/* list */}
      </Grid>

      <Grid item xs={9}>
        {/* content */}
      </Grid>
    </>
  )
}

Quiz.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout>
      {page}
    </AppGridLayout>
  )
}
