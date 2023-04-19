import React, { ReactElement, useEffect, useState } from "react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { Grid, Stack } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import AppGridLayout from "@/layouts/AppGridLayout";
import databases from "@/contents/databases";

export default function Learn() {
  const router = useRouter();
  const [isQueryReady, setIsQueryReady] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);

  const { db, id } = router.query;

  // Update isQueryReady state when router is ready
  useEffect(() => {
    if (router.isReady) {
      setIsQueryReady(true);
    }
  }, [router.isReady]);

  // Update pageNoteFound state depending on the value of `db` and `id`
  useEffect(() => {
    if (!isQueryReady) return;
    if (typeof db !== "string" || typeof id !== "string") {
      // `db` and `id` should be a string, if not, set page as not found
      setPageNotFound(true);
    } else {
      // Check whether the value of `db` is valid, if not, set page not found
      let hasMatch = false;
      for (const database of databases) {
        if (database.slug === db) {
          hasMatch = true;
        }
      }
      if (!hasMatch) setPageNotFound(true);
    }
  }, [db, id, isQueryReady]);

  if (!isQueryReady) {
    // Setup loading state
  }

  if (pageNotFound) {
    return <ErrorPage statusCode={404} />
  }

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
