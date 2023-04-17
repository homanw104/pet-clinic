/**
 * 测试主页，主页上有随机测试题生成。
 */

import React, { ReactElement } from "react";
import { Grid, Stack } from "@mui/material";
import Header from "@/components/header/header";
import Subheader from "@/components/header/subheader";
import AppGridLayout from "@/layouts/app_grid_layout";

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
