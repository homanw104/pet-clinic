/**
 * 试卷测试页面，根据试卷 [id] 获取试卷信息。
 */

import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid, Stack } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import QuizList from "@/components/atomic/QuizList";
import AppGridLayout from "@/layouts/AppGridLayout";
import PageNotFound from "@/components/app/PageNotFound";

export default function Quiz() {
  const router = useRouter();
  const [isQueryReady, setIsQueryReady] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);

  const { id } = router.query;

  // Update isQueryReady state when router is ready
  useEffect(() => {
    if (router.isReady) {
      setIsQueryReady(true);
    }
  }, [router.isReady]);

  // Update pageNoteFound state depending on the value of `id`
  useEffect(() => {
    if (!isQueryReady) return;
    if (typeof id !== "string") {
      // `id` should be a string, if not, set page as not found
      setPageNotFound(true);
    } else {
      // Post request to backend with `id` and check the result
    }
  }, [id, isQueryReady]);

  if (pageNotFound) return <PageNotFound />;

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
        <QuizList />
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
