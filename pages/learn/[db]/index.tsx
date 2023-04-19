/**
 * 数据库主页，根据数据库种类 [db] 从后端拉取不同的内容。
 */

import React, { ReactElement } from "react";
import { Grid, Stack } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import AppGridLayout from "@/layouts/AppGridLayout";
import databases from "@/contents/databases";

export default function Learn() {
  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header />
          <Subheader variant="learn" />
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

Learn.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout>
      {page}
    </AppGridLayout>
  )
}

interface Params {
  params: {
    db: string;
  }
}

export async function getStaticProps({ params }: Params) {
  return {
    props: {
      db: params.db,
    }
  }
}

export async function getStaticPaths() {
  let paths = [];

  for (const db of databases) {
    paths.push({
      params: {
        db: db.slug,
      },
    })
  }

  return {
    paths: paths,
    fallback: false,
  };
}
